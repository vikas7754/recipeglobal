import mongoose from "mongoose";
const db = { SECRET: process.env.SECRET, DATABASE: process.env.DB_URL };

mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;
const connection = mongoose.createConnection(db.DATABASE);

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

export default connection;
