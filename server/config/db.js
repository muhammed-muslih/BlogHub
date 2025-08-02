import mongoose from "mongoose";
import { config } from "./config.js";

const mongo_uri = config.MONGO_URI;

const connectDB = async () => {
  if (!mongo_uri) {
    console.error("MONGO_URI not defined in .env".bgRed.white);
    process.exit(1);
  }
  try {
    await mongoose.connect(mongo_uri);
    console.log("Database connection established".bgCyan.black);
  } catch (error) {
    console.error("Database connection failed".bgRed.white, error);
    process.exit(1);
  }
};
export default connectDB;
