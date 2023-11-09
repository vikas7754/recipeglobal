import User from "@/server/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ isLogin: false });
    const user = await User.findOne({ token });
    if (!user) return NextResponse.json({ isLogin: false });
    return NextResponse.json({
      id: user._id,
      role: user.role,
      email: user.email,
      name: user.name,
      username: user.username,
      image: user.image,
      isLogin: true,
    });
  } catch (e) {
    return NextResponse.json({ isLogin: false });
  }
}
