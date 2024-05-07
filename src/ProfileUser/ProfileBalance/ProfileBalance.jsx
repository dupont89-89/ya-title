import React from "react";
import s from "./../ProfileUser.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";

export default function ProfileBalance(props) {
  return (
    <div className={s.profileBlockBalance}>
      <h2>Доступные средства</h2>
      <div>
        <span className={s.textNumberBalance}>
          Баланс денег:{" "}
          <span className={s.numberBalance}>{props.money} руб</span>
        </span>
      </div>
      <div>
        <span className={s.textNumberBalance}>
          Баланс lvt <span className={s.numberBalance}>{props.lvt} Lvt</span>
        </span>
      </div>
      <div>
        <span className={s.textNumberBalance}>
          Всего пополнений:{" "}
          <span className={s.numberBalance}>{props.moneyHistory} руб</span>
        </span>
      </div>
      <div className={s.linkBtnProfileBalance}>
        <Link to="/balance/">
          <span className={s.linkAddBalanse}>
            <FontAwesomeIcon color="#fff" size="1x" icon={faCreditCard} />
          </span>{" "}
          Пополнить баланс
        </Link>
      </div>
    </div>
  );
}
