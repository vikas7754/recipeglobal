import connectDB from "@/server/db/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/server/models/user";
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

export async function POST(req) {
  const { userId, password } = await req.json();
  if (!userId.trim() || !password.trim())
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });

  const user = await User.findOne({
    $or: [{ email: userId }, { username: userId }],
  });
  if (!user)
    return NextResponse.json(
      { message: "Invalid username/email" },
      { status: 400 }
    );
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return NextResponse.json({ message: "Invalid password" }, { status: 400 });
  const token = jwt.sign(user._id.toHexString(), SECRET);
  await user.updateOne({ $set: { token: token } });
  const response = NextResponse.json({
    message: "Login successful",
    id: user._id,
    role: user.role,
    email: user.email,
    name: user.name,
    username: user.username,
    image: user.image,
    isLogin: true,
  });

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
  });

  return response;
}
