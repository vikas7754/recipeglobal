"use client";
import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import RecipeDetails from "./RecipeDetails";
import RecipePageSkeleton from "@/components/Skeleton/RecipePage";
import { getRecipeBySlug } from "@/actions/recipe";

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
