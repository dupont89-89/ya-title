import React, { useState, useEffect } from "react";
import { addPayScore } from "../../Api/api-pay";
const md5 = require("md5");

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

const RobokassaPaymentForm = (props) => {
  const [errorMessage, setErrorMessage] = useState(""); // Состояние для хранения сообщения об ошибке
  const [paymentAmount, setPaymentAmount] = useState(5000); // начальная сумма платежа
  const [invoiceId, setInvoiceId] = useState(0); // ID счета
  const [description, setDescription] = useState("Пополнение баланса");
  const handleClick = async () => {
    if (paymentAmount === "") {
      setErrorMessage("Вы не ввели сумму пополнения");
      return; // Завершаем функцию, чтобы не отправлять запрос
    }
    const url = `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${merchant_login}&OutSum=${paymentAmount}&InvoiceID=${invoiceId}&Description=${description}&SignatureValue=${signatureValue}&IsTest=${IsTest}`;
    addPayScore(paymentAmount, invoiceId, props.userId);
    window.open(url, "_blank"); // Открывает ссылку в новой вкладке
    console.log(`Отправил ${paymentAmount}`);
  };

  const handleChange = (event) => {
    setPaymentAmount(event.target.value); // Обновляем значение состояния при изменении ввода
    setErrorMessage(""); // Очищаем сообщение об ошибке при вводе
  };

  useEffect(() => {
    const randomInvoiceId = Math.floor(Math.random() * 1000000);
    setInvoiceId(randomInvoiceId);
    setPaymentAmount(props.addBalance);
    setDescription(
      `Пополнение баланса пользователя ${props.email}, по счёту ${randomInvoiceId}`
    );
  }, [props.email, props.addBalance]); // добавлен props.userId в массив зависимостей// Пустой массив зависимостей означает, что эффект будет запускаться только один раз при монтировании компоненты

  const inputSum = {
    marginLeft: "10px",
    width: "85px",
    textAlign: "center",
    height: "25px",
    fontSize: "23px",
    paddingLeft: "5px",
    borderRadius: "5px",
  };

  const textInput = {
    fontSize: "15px",
  };

  const btnPay = {
    fontSize: "18px",
    backgroundColor: "#FFC107",
    color: "black",
    marginLeft: "10px",
    padding: "3px 10px",
    borderRadius: "5px",
    textDecoration: "none",
    textAlign: "center",
    maxWidth: "170px",
  };

  const errorNullSum = {
    color: "brown",
    padding: "5px 10px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    fontWeight: "500",
  };

  const merchant_login = config.ROBOKASSA_SHOP_NAME;
  const password_1 = config.ROBOKASSA_PASSWORD_1;
  const IsTest = config.ROBOKASSA_TEST;

  const signatureValue = md5(
    `${merchant_login}:${paymentAmount}:${invoiceId}:${password_1}`
  );

  return (
    <>
      <span style={textInput}>Произвольная сумма</span>
      <input
        value={paymentAmount < 0 ? 0 : paymentAmount}
        onChange={handleChange}
        name="money-input"
        id="money-input"
        placeholder="5000"
        style={inputSum}
        type="number"
      />
      <span style={textInput}>РУБ</span>
      {errorMessage && <p style={errorNullSum}>{errorMessage}</p>}
      <button onClick={handleClick} style={btnPay}>
        Пополнить
      </button>
    </>
  );
};

export default RobokassaPaymentForm;
