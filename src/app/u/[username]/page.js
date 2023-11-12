import UserPage from "@/components/Pages/User";
import React from "react";

export async function generateMetadata({ params }) {
  const { username } = params;
  return {
    title: `${username} | RecipeGlobal`,
    description: `Recipes by ${username} on RecipeGlobal. Find recipes by ingredients, tags, and more.`,
  };
}

function page({ params }) {
  return <UserPage username={params.username} />;
}

export default page;
