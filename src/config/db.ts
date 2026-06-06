import mongoose from 'mongoose';
import webconfig from '../../webconfig.json';

mongoose.set('bufferCommands', false);

const connectDB = async () => {
  const uri = process.env.MONGO_URI || (webconfig && (webconfig.mongoUri || webconfig?.mongoUri));
  console.log('Connecting to MongoDB...', uri);
  if (!uri) throw new Error('MONGO_URI not set in env or webconfig.json');
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
  console.log('MongoDB connected');
};

export default connectDB;
