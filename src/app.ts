import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middleware/errorHandler";
import mainRouter from "./routes/mainRote";
import webconfig from "../webconfig.json";
import connectDB from "./config/db";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


const basePath = webconfig && webconfig.BASEKEY ? `/${webconfig.BASEKEY}` : '/api';
console.log('Using base path:', basePath);
app.use(basePath, mainRouter);
// ✅ ADD THIS
app.use((req, res) => {
  console.log("❌ Route not found:", req.method, req.url);

  res.status(404).json({
    status: 404,
    message: "Route not found",
  });
});

app.use(errorHandler);  
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Auth service running on port ${PORT}`);
});
export default app;
