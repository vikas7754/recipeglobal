"use client";
import Layout from "@/components/Layout";
import LoginSignup from "@/components/LoginSignup";
import React from "react";

function page() {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "86vh",
  };
  return (
    <Layout>
      <div style={style}>
        <LoginSignup isShowLogin={true} hideCloseBtn onClose={() => {}} />
      </div>
    </Layout>
  );
}

export default page;
