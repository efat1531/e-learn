import mongoose from "mongoose";

const connectDB = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_DEV);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  } else {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_PROD);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;
