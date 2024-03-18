import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";

import "bootstrap/dist/css/bootstrap.css";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="position-relative">
      <HeaderAdmin />
      <div className="container-xl">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
