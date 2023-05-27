import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bemfot:Oladele@cluster0.hjhetys.mongodb.net/node-auth"
    );
    console.log("database connected");
  } catch (error) {
    console.log("database connection error:", error);
  }
};

export default connectDB;
