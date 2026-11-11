import mongoose from "mongoose";
import "dotenv/config";
import dns from "node:dns";

dns.setServers(["8.8.8.8"]);

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(uri, {
    minPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 40,
    maxIdleTimeMS: 10000,
  });

  console.log("MongoDB connected successfully");
};

export default connectDB;