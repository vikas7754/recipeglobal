import connectDB from "@/server/db/connectDB";
import User from "@/server/models/user";
import Otp from "@/server/models/otp";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import sendThankYouMail from "@/server/utils/thankYouMail";
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

export async function POST(req) {
  const { name, email, username, password, otp } = await req.json();
  if (!otp)
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  if (!email || !name || !username || !password)
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  if (!email.includes("@"))
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist)
    return NextResponse.json(
      { message: "Email already exist" },
      { status: 400 }
    );
  const isUsernameExist = await User.findOne({ username });
  if (isUsernameExist)
    return NextResponse.json(
      { message: "Username already exist" },
      { status: 400 }
    );

  const isOtpValid = await Otp.findOne({ email, otp });
  if (!isOtpValid)
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    username,
    password: hashedPassword,
  });
  const user = await newUser.save();
  await Otp.deleteMany({ email });

  var token = jwt.sign(user._id.toHexString(), SECRET);
  await user.updateOne({ $set: { token: token } });
  sendThankYouMail(user.email, user.name);
  const response = NextResponse.json({
    message: "Signup successful",
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
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return response;
}
