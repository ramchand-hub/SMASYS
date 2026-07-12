import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import mainRouter from "./routes/mainRote";
import connectDB from "./config/db";
import redis_connect from "./config/redis";
// import "./streams/Readble_stream"
const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/", mainRouter);
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
