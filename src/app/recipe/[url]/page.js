import RecipePage from "@/components/Pages/Recipe";

function page({ params }) {
  return <RecipePage url={params.url} />;
}

export default page;
