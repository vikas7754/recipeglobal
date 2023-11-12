import { getRecipeBySlug } from "@/actions/recipe";
import RecipePage from "@/components/Pages/Recipe";

export async function generateMetadata({ params }) {
  const { url } = params;
  const slug = url.split("-").pop();
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) {
    return {
      title: "Error 404 | Freecodez",
    };
  }

  return {
    title: recipe.title + " | Author : " + recipe?.author.username,
    description: recipe.description,
    image: recipe?.image,
    keywords: recipe?.tags?.join(" ") || "",
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: recipe.images.map((image) => ({
        url: image,
        width: 200,
        height: 200,
        alt: recipe.title,
      })),
      site_name: "Freecodez",
    },
  };
}

function page({ params }) {
  return <RecipePage url={params.url} />;
}

export default page;
