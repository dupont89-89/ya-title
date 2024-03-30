import React from "react";
import iconNotifications from "./../../img/icon/icon-envelope.png";

const notificationsHeader = {
  backgroundImage: `url(${iconNotifications})`,
  backgroundSize: "45px",
  backgroundRepeat: "no-repeat",
  width: "45px",
  height: "45px",
  display: "block",
  position: "relative",
};

const numberNotifications = {
  display: "inline-block",
  background: "rgb(204 28 28)",
  borderRadius: "50%",
  color: "#fff",
  position: "absolute",
  width: "20px",
  height: "20px",
  top: "-3px",
  textAlign: "center",
  left: "-5px",
};

export default function Notification(props) {
  return (
    <div style={notificationsHeader}>
      <span style={numberNotifications}>{props.notifications}</span>
    </div>
  );
}
