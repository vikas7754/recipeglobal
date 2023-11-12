"use server";
import { cookies } from "next/headers";
const url = process.env.NEXT_PUBLIC_API_URL + "/recipe";

export const getAllRecipes = async (page) => {
  try {
    const res = await fetch(`${url}/all?page=${page}`, {
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

export const getFilteredRecipes = async (page, filterBy, filterValue) => {
  try {
    const res = await fetch(
      `${url}/filtered?page=${page}&filterBy=${filterBy}&filterValue=${filterValue}`,
      {
        headers: { Cookie: cookies().toString() },
        withCredentials: true,
        credentials: "include",
        cache: "no-store",
      }
    );
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

export const getUserData = async (username) => {
  try {
    const res = await fetch(`${url}/user/${username}`, {
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

export const searchRecipes = async (query, page) => {
  try {
    const res = await fetch(`${url}/search/${query}/?page=${page}`, {
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
