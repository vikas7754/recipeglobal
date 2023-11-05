import React from "react";

function page({ params }) {
  return <div>page {params.query}</div>;
}

export default page;
