import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("database connected");
  } catch (error) {
    console.log("database connection error:", error);
  }
};

export default connectDB;
