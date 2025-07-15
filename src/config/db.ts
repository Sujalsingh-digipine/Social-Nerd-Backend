import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const DBconnection = async (): Promise<void> => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongo db connected");
  } catch (error: any) {
    console.log("Mongo Db connection error", error);
    throw error;
  }
};
