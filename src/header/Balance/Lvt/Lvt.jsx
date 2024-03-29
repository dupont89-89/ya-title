import React from "react";
import s from "./../../Header.module.css";

export default function Lvt() {
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
        <span>0</span> <span className={s.iconMenuLvt}>Lvt</span>
      </div>
    </div>
  );
}
