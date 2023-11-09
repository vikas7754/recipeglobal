import User from "@/server/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.json({});
  const user = await User.findOne({ token });
  if (!user) return NextResponse.json({});
  await user.updateOne({ $unset: { token: 1 } });
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    maxAge: 0,
  });
  return response;
}
