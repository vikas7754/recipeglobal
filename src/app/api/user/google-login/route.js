import connectDB from "@/server/db/connectDB";
import { NextResponse } from "next/server";
import User from "@/server/models/user";
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
import axios from "axios";
import sendThankYouMail from "@/server/utils/thankYouMail";

export async function POST(req) {
  const { accessToken, credential } = await req.json();
  try {
    if (!credential && !accessToken) {
      return NextResponse.json({ message: "Login failed!" }, { status: 400 });
    }
    const result = accessToken
      ? await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      : jwt.decode(credential);
    if (!result)
      return NextResponse.json({ message: "Login failed!" }, { status: 400 });
    const id = result?.data?.id || result?.sub;
    const email = result?.data?.email || result?.email;
    const name = result?.data?.name || result?.name;
    const picture = result?.data?.picture || result?.picture;
    if (!id || !email || !name || !picture)
      return NextResponse.json({ message: "Login failed!" }, { status: 400 });

    const isExist = await User.findOne({
      isActive: true,
      email,
    });

    if (!isExist) {
      const password = Math.random().toString(36).slice(-10);
      let username = email.split("@")[0];
      const isExist = await User.findOne({ username });
      if (isExist) {
        username = username + Math.random().toString(36).slice(-3);
      }
      const newUser = new User({
        email,
        name,
        password,
        username,
        googleId: id,
        image: picture,
      });
      const user = await newUser.save();
      sendThankYouMail(email, name);
      const token = jwt.sign(user._id.toHexString(), SECRET);
      await user.updateOne({ $set: { token: token } });
      const response = NextResponse.json({
        message: "Registration success!",
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

    const token = jwt.sign(isExist._id.toHexString(), SECRET);
    await isExist.updateOne({ $set: { token: token } });
    const response = NextResponse.json({
      message: "Login success!",
      id: isExist._id,
      role: isExist.role,
      email: isExist.email,
      name: isExist.name,
      username: isExist.username,
      image: isExist.image,
      isLogin: true,
    });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
    });
    return response;
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
