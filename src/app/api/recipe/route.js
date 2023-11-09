import auth from "@/server/middlewares/auth";
import { NextResponse } from "next/server";
export async function POST(req) {
  const user = await auth(req);
  return NextResponse.json({ message: "Hello World", user });
}
