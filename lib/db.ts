import mongoose, { Connection } from 'mongoose';

// Extend global namespace to avoid TypeScript errors
declare global {
  var mongooseConnection: Connection | null;
}

let cached = global.mongooseConnection;

export async function connectDB(): Promise<Connection> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  // Return cached connection if it exists and is connected
  if (cached && mongoose.connection.readyState === 1) {
    console.log('Using cached MongoDB connection');
    return cached;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
    });

    cached = conn.connection;
    console.log('MongoDB connected successfully');
    return cached;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB;
