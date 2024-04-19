import React from "react";
import s from "./../../Header.module.css";
import { Link } from "react-router-dom";

export default function Lvt(props) {
  const gridBlock = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: "3px",
    justifyItems: "center",
    alignItems: "center",
    cursor: "pointer",
    minWidth: "65px",
    color: "#fff",
    textDecoration: "none",
  };
  const block = {
    padding: "3px",
    fontSize: "14px",
    display: "inline-block",
    backgroundColor: "#ab723f",
    color: "#fff",
    borderRadius: "4px",
  };

  return (
    <div style={block}>
      <Link style={gridBlock}>
        <span>{props.totalLvt}</span> <span className={s.iconMenuLvt}>Lvt</span>
      </Link>
    </div>
  );
}
