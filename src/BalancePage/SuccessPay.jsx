import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { successPay } from "../Api/api-pay";
import s from "./BalancePage.module.css";
import logo from "./../img/logo/PTAHINI-nav.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function SuccessPay() {
  // Получаем объект location, который содержит информацию о текущем URL
  const location = useLocation();

  // Извлекаем строку запроса (query string) из объекта location
  const queryString = location.search;

  // Создаем объект URLSearchParams, чтобы обработать строку запроса
  const params = new URLSearchParams(queryString);

  const logoStyle = {
    width: "300px",
  };

  // Извлекаем GET-параметры по их именам
  const OutSum = params.get("OutSum");
  const InvId = params.get("InvId");
  const Signature = params.get("SignatureValue");
  const IsTest = params.get("IsTest");

  const param = {
    OutSum: OutSum,
    InvId: InvId,
    SignatureValue: Signature,
    IsTest: IsTest,
  };

  useEffect(() => {
    successPay(param);
  }, [InvId]);

  return (
    <div className={s.contentModal}>
      <p>Успешная оплата</p>
      <FontAwesomeIcon size="5x" color="#4caf50" icon={faCircleCheck} />
      <p>Сумма пополнения: {OutSum}</p>
      <img style={logoStyle} src={logo} alt="" />
      <div className={s.btnLinkSuccess}>
        <Link to="/balance">В тарифы</Link>
      </div>
    </div>
  );
}
