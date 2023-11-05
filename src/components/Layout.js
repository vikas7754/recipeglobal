import React from "react";

function Layout({ children }) {
  return (
    <div className="container">
      <div className="wrapper">{children}</div>
    </div>
  );
}

export default Layout;
