"use server";
import { cookies } from "next/headers";
const url = process.env.NEXT_PUBLIC_API_URL + "/user";

export const getUser = async (username) => {
  try {
    const res = await fetch(`${url}/get/${username}`, {
      headers: { Cookie: cookies().toString() },
      withCredentials: true,
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    throw err;
  }
};

export const getLoggedInUser = async () => {
  try {
    const res = await fetch(`${url}/loggedin-user`, {
      headers: { Cookie: cookies().toString() },
      withCredentials: true,
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    throw err;
  }
};
