import React from "react";
import LogoAdmin from "../components/LogoAdmin";
import Ab from "../components/Ab.jsx";
import "../components/style1.css";
import Nav from "../components/Nav";

import "bootstrap/dist/css/bootstrap.css";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="wrapper">
      <aside id="sidebar">
        <LogoAdmin />
        <Ab />
      </aside>
      <div className="main">
        <Nav />
        <main className="content px-3 py-4">{children}</main>
      </div>
    </div>
  );
};

export default LayoutAdmin;

{
  /* <HeaderAdmin /> */
}
{
  /* <div>{children}</div> */
}
