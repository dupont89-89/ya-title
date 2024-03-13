import React from "react";
import { Link } from "react-router-dom";
import logo from "./../img/logo/PTAHINI-nav.png";

export default function ToolSidebar() {
  const logoStyle = {
    width: "230px",
  };
  return (
    <div>
      <div>
        <Link to="/">
          <img style={logoStyle} src={logo} alt="ptahini" />
        </Link>
      </div>
      <nav>
        <h2>SEO-инструменты</h2>
        <ul>
          <li>
            <Link to="/">Создание Title</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
