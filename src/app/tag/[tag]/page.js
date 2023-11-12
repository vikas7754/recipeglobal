import AllRecipes from "@/components/UI/AllRecipes";

export async function generateMetadata({ params }) {
  const { tag } = params;
  return {
    title: `Recipes for ${tag} | RecipeGlobal`,
    description:
      "Search for your favorite recipes on RecipeGlobal. Find recipes by ingredients, tags, and more. " +
      tag,
  };
}

function page({ params }) {
  return <AllRecipes filterBy="tag" filterValue={params.tag} />;
}

export default page;
