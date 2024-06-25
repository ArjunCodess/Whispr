import mongoose from "mongoose";

if (!process.env.MONGODB_URI) throw new Error("Please provide a MONGODB_URI environment variable");

export const connectToDatabase = async () => {
     if (mongoose.connection?.readyState >= 1) return;

     try {
          console.log("Connected to database");
          await mongoose.connect(process.env.MONGODB_URI!);
     } catch (error: any) {
          console.log("Failed to connect to database: ", error);
     }
}