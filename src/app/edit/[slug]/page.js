import EditRecipe from "@/components/Pages/Edit";

export const metadata = {
  title: "Edit Recipe - Recipe Global",
  description: "Edit Recipe - Recipe Global",
};

function page({ params }) {
  return <EditRecipe slug={params.slug} />;
}

export default page;
