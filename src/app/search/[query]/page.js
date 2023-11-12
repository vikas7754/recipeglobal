import React from "react";

export async function generateMetadata({ params }) {
  const { query } = params;
  return {
    title: `Search for ${query} | RecipeGlobal`,
    description:
      "Search for your favorite recipes on RecipeGlobal. Find recipes by ingredients, tags, and more.",
  };
}

function page({ params }) {
  return <div>page {params.query}</div>;
}

export default page;
