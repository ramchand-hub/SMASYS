import mongoose from "mongoose";
import "dotenv/config";
import dns from "node:dns"
const connectDB = async () => {
  const uri = process?.env?.MONGO_URI as string;
  dns.setServers(["8.8.8.8"]);
  await mongoose.connect(uri, {
    minPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 40,
    maxIdleTimeMS: 10,
  });
};

export default connectDB;
