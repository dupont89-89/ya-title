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
import { Link } from "react-router-dom";
import RobokassaPaymentForm from "../pay/Robokassa/RobokassaPaymentForm";
import UniversalModal from "../Modal/UniversalModal";
import Oferta from "../parts/Oferta";
import Politika from "../parts/Politika";

const iconPay = [mir, visa, sbp, master, ya];

export default function BalancePay(props) {
  return (
    <div className={s.blockPayGridHeight}>
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
      <span className={s.textSumProDekstop}>
        Пополняйте баланс на произвольную сумму. Обратите внимание на выгодные
        тарифы.
      </span>
      <RobokassaPaymentForm
        addBalance={props.addBalance}
        email={props.email}
        userId={props.userId}
        isAuthenticated={props.isAuthenticated}
      />
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
        <div>
          <div className={`${s.textPayUserInfo} ${s.textPayUserInfoOne}`}>
            <p>
              1) Пополняйте личный кабинет на нужную сумму удобным способом.
            </p>
          </div>
          <div className={`${s.textPayUserInfo} ${s.textPayUserInfoTwo}`}>
            <p>2) Выбирайте нужное кол-во Lvt на доступную сумму.</p>
          </div>
          <div className={s.linkPayKonf}>
            <span className={s.linkModal}>
              <UniversalModal
                nameBtnPopup="*Политика конфиденциальности"
                content={<Politika />}
                height="90vh"
                backgroundBtn="#f5b24d00"
                colorBtn="#fff"
                borderBottom="1px solid"
                paddingBtn="0"
                fontSizeBtn="13px"
                width="80%"
              />
            </span>
            <span className={s.linkModal}>
              <UniversalModal
                nameBtnPopup="*Договор офёрты"
                content={<Oferta />}
                height="90vh"
                backgroundBtn="#f5b24d00"
                colorBtn="#fff"
                borderBottom="1px solid"
                paddingBtn="0"
                fontSizeBtn="13px"
                width="80%"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
