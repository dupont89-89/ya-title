import React from "react";
import t from "../css/Tools.module.css";

export default function TextBottom(props) {
  return (
    <div>
      <div className={t.textBottomTools}>{props.text}</div>
    </div>
  );
}
