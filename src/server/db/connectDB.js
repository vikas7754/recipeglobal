import connection from "./db";

async function connectDB(req, res, next) {
  await connection();
  next();
}

export default connectDB;
