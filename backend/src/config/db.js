import mongoose from "mongoose";
import env from "./env.js";
import logger from "../utils/logger.js";

export async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info("MongoDB connected successfully.");
  } catch (error) {
    logger.error("MongoDB connection failed.", { error: error.message });
    throw error;
  }
}
