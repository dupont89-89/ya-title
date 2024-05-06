import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { successPay } from "../Api/api-pay";

export default function SuccessPay() {
  // Получаем объект location, который содержит информацию о текущем URL
  const location = useLocation();

  // Извлекаем строку запроса (query string) из объекта location
  const queryString = location.search;

  // Создаем объект URLSearchParams, чтобы обработать строку запроса
  const params = new URLSearchParams(queryString);

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
    <div>
      <h2>SuccessPay</h2>
      <p>Номер счёта: {InvId}</p>
      <p>Подпись: {Signature}</p>
      <p>Сумма: {OutSum}</p>
      <p>Тест: {IsTest}</p>
    </div>
  );
}
