import React from "react";
import loading from "./../img/icon/icons-loading.gif";

let iconStyle = {
  width: "80px",
};

let iconBlcokStyle = {
  textAlign: "center",
};

export default function Loading() {
  return (
    <div style={iconBlcokStyle}>
      <img style={iconStyle} src={loading} alt="" />
    </div>
  );
}
