import React from "react";
import s from "./../../Header.module.css";

export default function Money(props) {
  const gridBlock = {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: "3px",
    justifyItems: "center",
    alignItems: "center",
    cursor: "pointer",
    minWidth: "65px",
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
      <div style={gridBlock}>
        <span>{props.money}</span> <span className={s.iconMenuLvt}>Р</span>
      </div>
    </div>
  );
}
