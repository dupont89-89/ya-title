import React from "react";
import mir from "./../img/logo/pay-mir.png";
import visa from "./../img/logo/pay-visa.png";
import sbp from "./../img/logo/pay-sbp.png";
import master from "./../img/logo/pay-master.png";
import ya from "./../img/logo/pay-ya.png";
import s from "././BalancePage.module.css";

const iconPay = [mir, visa, sbp, master, ya];

export default function BalancePay(props) {
  return (
    <div>
      <div>
        <p>Платёжные системы для пополнения аккаунта Ptahini</p>
      </div>
      <div className={s.iconPayGrid}>
        {iconPay.map((icon, index) => (
          <div key={index}>
            <img src={icon} alt={`payment-${index}`} />
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
    </div>
  );
}
