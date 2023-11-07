"use client";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipePageSkeleton from "@/components/Skeleton/RecipePage";
import { getRecipeBySlug } from "@/actions/recipe";

// const recipe = {
//   _id: "2",
//   slug: "xyzyzy",
//   title: "Potato Roti Recipe Potato Roti Recipe Potato Roti Recipe",
//   description:
//     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. loremkfjbvhif jvb fbvf jvfd ubvf jvfdhjvhbfvf djvfduhbv",
//   category: "non-veg",
//   tags: ["potato", "roti"],
//   image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
//   rating: 3,
//   isRated: true,
//   isLiked: false,
//   author: {
//     username: "user1",
//     image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
//   },
//   createdAt: "2021-08-01T12:00:00.000Z",
//   video: "bUojb3P7kPQ",
//   images: [
//     "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
//     "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
//     "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
//   ],
//   ingredients: [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   ],
//   instructions: [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.",
//   ],
// };

function RecipePage({ url }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const slug = url.split("-").pop();
      const res = await getRecipeBySlug(slug);
      if (!res) {
        setError("Recipe not found");
        setLoading(false);
        return;
      }
      setRecipe(res);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      {loading ? (
        <RecipePageSkeleton />
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <RecipeDetails recipe={recipe} />
      )}
    </Layout>
  );
}

export default RecipePage;
