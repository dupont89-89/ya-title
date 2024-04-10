import React, { useState } from "react";
import mir from "./../img/logo/pay-mir.png";
import visa from "./../img/logo/pay-visa.png";
import sbp from "./../img/logo/pay-sbp.png";
import sbpLogo from "./../img/logo/pay-sbp-logo.png";
import master from "./../img/logo/pay-master.png";
import ya from "./../img/logo/pay-ya.png";
import s from "././BalancePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";

const iconPay = [mir, visa, sbp, master, ya];

export default function BalancePay(props) {
  const [sumMoney, setSumMoney] = useState(""); // Состояние для хранения значения ввода
  const [errorMessage, setErrorMessage] = useState(""); // Состояние для хранения сообщения об ошибке

  const handleClick = async () => {
    if (sumMoney === "") {
      setErrorMessage("Вы не ввели сумму пополнения");
      return; // Завершаем функцию, чтобы не отправлять запрос
    }
    console.log(`Отправил ${sumMoney}`);
  };

  const handleChange = (event) => {
    setSumMoney(event.target.value); // Обновляем значение состояния при изменении ввода
    setErrorMessage(""); // Очищаем сообщение об ошибке при вводе
  };

  return (
    <div>
      <div>
        <p>Платёжные системы для пополнения аккаунта Ptahini</p>
      </div>
      <div className={s.iconPayGrid}>
        {iconPay.map((icon, index) => (
          <div key={index}>
            <img src={icon} alt={`оплата-${index}`} />
          </div>
        ))}
      </div>
      <div className={s.titlePayInfo}>
        <p>Оплата банковской картой</p>
      </div>
      <div className={s.payInfo}>
        <p className={s.itemPayInfo}>Оплата зачисляется в режиме online</p>
        <p className={s.itemPayInfo}>
          Комиссия зависит от ставки за перевод - Вашего банка
        </p>
      </div>
      {errorMessage && <p className={s.errorNullSum}>{errorMessage}</p>}
      <div className={s.blockPayUserSum}>
        <span className={s.textInputPayUserSum}>Произвольная сумма</span>
        <input
          name="money-input"
          id="money-input"
          placeholder="5000"
          value={sumMoney}
          onChange={handleChange}
          className={s.inputPayUserSum}
          type="number"
        />{" "}
        <span className={s.textInputPayUserSum}>РУБ</span>
        <button onClick={handleClick} className={s.btnPay}>
          Пополнить
        </button>
      </div>
      <div className={s.bottomPayUserSum}>
        <div className={s.minSumBlock}>
          <FontAwesomeIcon size="3x" color="#000" icon={faThumbsUp} />
          <div className={s.blockTextMinSumBlock}>
            <span className={s.textMinSumBlock}>Минимальный платёж</span>
            <span className={s.textMinSumBlock}>10 ₽</span>
          </div>
          <div className={s.iconMinSbp}>
            <img src={sbpLogo} alt="Оплата СПБ минимально 10 руб" />
          </div>
        </div>
        <div>2 блок</div>
      </div>
    </div>
  );
}
