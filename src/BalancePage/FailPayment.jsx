import React from "react";
import { Link } from "react-router-dom";
import nopay from "./../img/img-page/fail-pay.png";
import s from "./BalancePage.module.css";

export default function FailPayment() {
  return (
    <div className={s.failPay}>
      <div>
        <img src={nopay} alt="" />
      </div>
      <div className={s.rightFail}>
        <div>
          <h2 className={s.textFail}>Ошибка платежа</h2>
          <p>
            Произошла какая-то ошибка. Возможно не хватает средств, неверные
            данные или произошла ошибка на сервисе. Попробуйте позже.
          </p>
        </div>
        <Link to="/balance">Вернуться</Link>
      </div>
    </div>
  );
}
