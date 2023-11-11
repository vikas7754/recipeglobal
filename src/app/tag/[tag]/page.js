import AllRecipes from "@/components/UI/AllRecipes";

function page({ params }) {
  return <AllRecipes filterBy="tag" filterValue={params.tag} />;
}

export default page;
