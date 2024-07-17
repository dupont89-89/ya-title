import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Loading(props) {
  let iconBlcokStyle = {
    textAlign: "center",
    height: props.height ? props.height : "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  let text = {
    fontSize: "18px",
    display: "block",
  };
  return (
    <div style={iconBlcokStyle}>
      <span style={text}>Отправка данных..</span>
      <FontAwesomeIcon icon={faGear} spin size="5x" />
    </div>
  );
}
