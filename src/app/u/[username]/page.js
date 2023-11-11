import UserPage from "@/components/Pages/User";
import React from "react";

function page({ params }) {
  return <UserPage username={params.username} />;
}

export default page;
