import React from "react";
import s from "./../../Header.module.css";
import { Link } from "react-router-dom";

export default function Money(props) {
  const gridBlock = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: "3px",
    justifyItems: "center",
    alignItems: "center",
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
      <Link style={gridBlock} to="/balance/">
        <span>{props.money}</span> <span className={s.iconMenuLvt}>Р</span>
      </Link>
    </div>
  );
}
