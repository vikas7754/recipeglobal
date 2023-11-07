import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="container">
      <Navbar />
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default Layout;
