import mongoose from "mongoose";

export function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URL!); 

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connection Successfull");
    });

    connection.on("error", (error) => {
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}