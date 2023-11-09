import connectDB from "@/server/db/connectDB";
import Otp from "@/server/models/otp";
import User from "@/server/models/user";
import { NextResponse } from "next/server";
import sendOtpForSignup from "@/server/utils/otpMail";

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    if (!email || !name)
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    if (!email.includes("@"))
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    const isExist = await User.findOne({ email });
    if (isExist)
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );

    const otp = await sendOtpForSignup(email, name);
    const newOtp = new Otp({
      email,
      otp,
    });
    await newOtp.save();
    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
