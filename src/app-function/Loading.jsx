import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

let iconBlcokStyle = {
  textAlign: "center",
};

let text = {
  fontSize: "18px",
  display: "block",
};

export default function Loading() {
  return (
    <div style={iconBlcokStyle}>
      <span style={text}>Отправка данных..</span>
      <FontAwesomeIcon icon={faGear} spin size="5x" />
    </div>
  );
}
