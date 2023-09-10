import mongoose from "mongoose";

async function connectToMongoDB() {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URL}`, {})
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err: any) => {
        console.error("MongoDB connection error:", err);
      });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectToMongoDB;