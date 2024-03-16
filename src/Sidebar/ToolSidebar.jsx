import React from "react";
import { Link } from "react-router-dom";
import logo from "./../img/logo/PTAHINI-nav.png";
import MenuTools from "./MenuTools";
import s from "./Sidebar.module.css";

export default function ToolsSidebar() {
  const logoStyle = {
    width: "230px",
  };
  return (
    <div className={s.asideSidebar}>
      <div>
        <Link to="/">
          <img style={logoStyle} src={logo} alt="ptahini" />
        </Link>
      </div>
      <MenuTools />
    </div>
  );
}
