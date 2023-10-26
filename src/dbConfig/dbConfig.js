import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB Connected successfully");
    });

    connection.on("error", (err) => {
      console.log(`Error: ${err.message}`);
      process.exit();
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
