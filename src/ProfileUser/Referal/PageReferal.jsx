import React from "react";
import Referal from "./Referal";

export default function PageReferal(props) {
  return (
    <div>
      <h1>Реферальная программа</h1>
      <Referal userId={props.userId} referal={props.referal} />
    </div>
  );
}
