import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function dbConnect() {
  try {
    const conn = await mongoose.connect(`${MONGODB_URI}`);
    console.log('MongoDB connected successfully');
    return conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('MongoDB connection failed');
  }
}

export default dbConnect;
