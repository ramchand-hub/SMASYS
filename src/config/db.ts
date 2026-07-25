import mongoose from "mongoose";
import webconfig from "../../webconfig.json";

const connectDB = async () => {
  const uri = webconfig?.mongoUri ;
  
  await mongoose.connect(uri, {
    minPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    maxPoolSize: 40,
    maxIdleTimeMS: 10,
  });
  console.log(uri,"MongoDB connected");
};

export default connectDB;
