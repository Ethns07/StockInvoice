
import mongoose from 'mongoose';

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set!");
  console.error("Please set DATABASE_URL to your MongoDB connection string.");
  console.error("Example: mongodb://localhost:27017/myapp or mongodb+srv://...");
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Connect to MongoDB
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export { mongoose };
