import React, { useState } from "react";
import s from "./../ProfileUser.module.css";

export default function Referal(props) {
  const [copied, setCopied] = useState(false);

  const btnStyle = {
    backgroundColor: copied ? "#FFEB3B" : "#FFC107",
    color: "#000",
    border: "none",
    cursor: "pointer",
    padding: "3px 7px",
    fontSize: "14px",
  };

  const referalQuantity = props.referal.length;

  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("./../../config.dev");
  } else {
    config = require("./../../config.prod");
  }

  const urlFront = config.REACT_APP_FRONT_URL;
  const referralLink = `${urlFront}/?ref=${props.userId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <div className={s.blockLinkReferal}>
      <h2>Партнерская программа</h2>
      <div className={s.gridBlockReferal}>
        <div>
          <span className={s.textNumberReferal}>
            Кол-во рефералов{" "}
            <span className={s.numberReferal}>{referalQuantity}</span>
          </span>
        </div>
        <div>
          <span className={s.textNumberReferal}>
            Получено за рефералов{" "}
            <span className={s.numberReferal}>
              {props.lvtPresentReferal} руб
            </span>
          </span>
        </div>
        <div>
          <p>
            Партнерская ссылка:
            <br /> {referralLink}
          </p>
          <button style={btnStyle} onClick={copyToClipboard}>
            {copied ? "Скопировано!" : "Скопировать"}
          </button>
        </div>
      </div>
    </div>
  );
}
