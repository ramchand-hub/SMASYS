import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import mainRouter from "./routes/mainRote";
import connectDB from "./config/db";
import redis_connect from "./config/redis";
// import "./streams/Readble_stream"
const app = express();
const PORT = process.env.PORT || 3002;
const client = require("prom-client")
client.collectDefaultMetrics();
const httpRequestsTotal = new client.Counter({
  name: "student_service_http_requests_total",
  help: "Total HTTP requests received by student service",
  labelNames: ["method", "route", "status_code"],
});

app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestsTotal.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });

  next();
});
app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/", mainRouter);
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

app.use(errorHandler);
app.listen(PORT, async () => {
  await connectDB();
  // const redisclient =  redis_connect();
  console.log(`Auth service running on port ${PORT}`);
});
export default app;
