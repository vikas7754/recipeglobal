const { NextResponse, NextRequest } = require("next/server");
const { default: User } = require("../models/user");

const auth = async (req) => {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Please login or signup" },
      { status: 401 }
    );
  }
  const user = await User.findOne({ token });
  if (!user) {
    return NextResponse.json(
      { message: "Please login or signup" },
      { status: 401 }
    );
  }
  return user;
};

export default auth;
