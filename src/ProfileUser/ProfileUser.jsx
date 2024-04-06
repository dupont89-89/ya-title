import React from "react";
import s from "./ProfileUser.module.css";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const urlFront = config.REACT_APP_FRONT_URL;

export default function ProfileUser(props) {
  return (
    <div className={s.blockProfilePage}>
      <h1>Профиль</h1>
      <div>
        <img src={props.avatar} alt="" />
      </div>
      <p>Партнерская ссылка: {`${urlFront}/?ref=${props.email}`}</p>
    </div>
  );
}
