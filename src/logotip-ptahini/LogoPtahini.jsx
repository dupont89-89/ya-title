import React from "react";
import logoPtahini from "./../img/img-page/PTAHINI.png";
import { Link } from "react-router-dom";

export default function LogoPtahini() {
  const img = {
    width: "250px",
  };

  const blockImg = {
    display: "block",
  };

  return (
    <div style={blockImg}>
      <Link>
        <img style={img} src={logoPtahini} alt="Ptahini" />
      </Link>
    </div>
  );
}
