import AllRecipes from "@/components/UI/AllRecipes";

export const metadata = {
  title: "RecipeGlobal - Veg Recipes",
  description:
    "Veg Recipes from RecipeGlobal. Find recipes by ingredients, tags, and more.",
};

function page() {
  return <AllRecipes filterBy="category" filterValue="veg" />;
}

export default page;
