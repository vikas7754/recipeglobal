"use server";
import { cookies } from "next/headers";
const url = process.env.NEXT_PUBLIC_API_URL + "/recipe";

export const getAllRecipes = async () => {
  try {
    const res = await fetch(`${url}/all`, {
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

export const getRecipeBySlug = async (slug) => {
  try {
    const res = await fetch(`${url}/get/${slug}`, {
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
