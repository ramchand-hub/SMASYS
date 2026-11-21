import dotenv from "dotenv";
dotenv.config();

import express from "express";
import config from "../webconfig.json";
import cors from "cors";
import helmet from "helmet";
import logger from "./utils/messages/logger";
import { redis_connect, redisClient } from "./config/redis";

import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

import { routes } from "./routes/routes";

const app = express();
const port = 4000;

const base_url = config?.base_url;

const client = require("prom-client");
client.collectDefaultMetrics();

// Render runs behind a reverse proxy.
app.set("trust proxy", 1);

// Basic middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Prometheus metrics
const httpRequestsTotal = new client.Counter({
  name: "gateway_http_requests_total",
  help: "Total HTTP requests received by gateway",
  labelNames: ["method", "route", "status_code"],
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// HTTP request counter
app.use((req, res, next) => {
  if (req.path === "/metrics") {
    return next();
  }

  res.on("finish", () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });

  next();
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", {
    message: err.message,
    stack: err.stack,
  });

  process.exit(1);
});

const startServer = async () => {
  try {
    // First connect Redis
    await redis_connect();

    // Then initialize rate limiter
    const globalRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 5,
      standardHeaders: true,
      legacyHeaders: false,

      store: new RedisStore({
        sendCommand: (...args: string[]) =>
          redisClient.sendCommand(args),
        prefix: "gateway:global:",
      }),

      message: {
        success: false,
        message: "Too many requests. Please try again later.",
      },
    });

    // Apply rate limiter before routes
    app.use(globalRateLimiter);

    // Mount API routes after rate limiter
    app.use(base_url, routes);

    app.listen(port, () => {
      console.log("Server running on port", port);
    });

  } catch (error) {
    console.error("Failed to start API Gateway:", error);
    process.exit(1);
  }
};

startServer();