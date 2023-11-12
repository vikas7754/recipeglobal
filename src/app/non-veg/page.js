import AllRecipes from "@/components/UI/AllRecipes";

export const metadata = {
  title: "RecipeGlobal - Non-Veg Recipes",
  description: "Non-Veg Recipes from RecipeGlobal",
};

function page() {
  return <AllRecipes filterBy="category" filterValue="non-veg" />;
}

export default page;
