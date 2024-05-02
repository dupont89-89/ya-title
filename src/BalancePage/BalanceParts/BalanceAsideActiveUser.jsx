import React, { useState } from "react";
import s from "./../BalancePage.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { sendMail } from "../../Api/api-admin";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

export default function BalanceAsideActiveUser(props) {
  const [emailText, setEmailText] = useState("");
  const countReferal = props.referal.length;
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const mail = {
      textMail: emailText,
      subjectMail: props.email,
    };

    try {
      await sendMail(mail);
      alert("Письмо успешно отправлено!");
      setEmailText(""); // Очистить поле после отправки
    } catch (error) {
      console.error("Ошибка отправки письма:", error);
      alert("Ошибка отправки письма!");
    }
  };
  return (
    <div className={s.blockAside}>
      <div className={s.gridTopTitle}>
        <div className={s.avatar}>
          <img
            src={`${config.REACT_APP_SERVER_URL}${props.avatar}`}
            alt={`${props.firstName} ${props.lastName}`}
          />
        </div>
        <div className={s.topRightUser}>
          <div
            title={`${props.firstName}${" "}${props.lastName}`}
            className={s.userName}
          >
            <span className={s.name}>{props.firstName}</span>{" "}
            <span className={s.family}>{props.lastName}</span>
          </div>
          <div title={props.email} className={s.mail}>
            {props.email}
          </div>
        </div>
      </div>
      <hr />
      <div className={s.money}>
        Баланс денег <span>{props.money} руб</span>
      </div>
      <div className={s.money}>
        Баланс Lvt <span>{props.totalLvt} баллов</span>
      </div>
      <div>
        <hr />
        <div className={s.referalBlock}>
          <h3>Реферальная система</h3>
          <span className={s.referal}>Кол-во рефералов {countReferal}</span>
          <Link to="#">Подробности программы</Link>
          <FontAwesomeIcon icon={faCircleQuestion} />
        </div>
      </div>
      <div>
        <form onSubmit={handleEmailSubmit}>
          <textarea
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            name="emailText"
            id="emailText"
            cols="30"
            rows="10"
            placeholder="Введите текст письма"
          ></textarea>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
}
