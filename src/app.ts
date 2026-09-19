import express from "express"
import config from '../webconfig.json'
import cors from "cors"
import { routes } from "./routes/routes"
import helmet from "helmet"
import logger from "./utils/messages/logger"
const app = express()
const port = 4000
const base_url = config?.base_url;
const client = require("prom-client")
client.collectDefaultMetrics();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(base_url, routes);
process.on("uncaughtException",(err)=>{
    logger.error("Uncaught Exception", {
        message: err.message,
        stack: err.stack
    });

    process.exit(1);
})

// Custom HTTP request counter
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
app.listen(port, async()=>{
    console.log(`gateway is running in ${port}`)
})  