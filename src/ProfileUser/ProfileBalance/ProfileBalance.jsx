import React from "react";
import s from "./../ProfileUser.module.css";
import { Link } from "react-router-dom";

export default function ProfileBalance(props) {
  return (
    <div className={s.profileBlockBalance}>
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
          Всего пополнений за всю историю:{" "}
          <span className={s.numberBalance}>{props.moneyHistory} руб</span>
        </span>
      </div>
      <div className={s.linkBtnProfileBalance}>
        <Link to="/balance/">Пополнить баланс</Link>
      </div>
    </div>
  );
}
