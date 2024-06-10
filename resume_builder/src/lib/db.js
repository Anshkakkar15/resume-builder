import mongoose from "mongoose";

const mongoDbUri = process.env.MONGO_URL;

if (!mongoDbUri) {
  throw new Error("Please define the DATABASE_URL in environment variable");
}

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(mongoDbUri);
    connection.isConnected = db.connections[0].readyState;
    console.log("database connection successfully");
  } catch (error) {
    console.log("Errow while connecting to database", error);
    process.exit(1);
  }
}

export default dbConnect;
