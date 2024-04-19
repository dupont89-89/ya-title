import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const md5 = require("md5");

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

const RobokassaPaymentForm = (props) => {
  const [paymentAmount, setPaymentAmount] = useState("5000"); // начальная сумма платежа
  const [invoiceId, setInvoiceId] = useState(0); // ID счета
  const [description, setDescription] = useState("Пополнение баланса");

  useEffect(() => {
    const randomInvoiceId = Math.floor(Math.random() * 1000000);
    setInvoiceId(randomInvoiceId);
    setDescription(
      `Пополнение баланса пользователя ${props.email}, по счёту ${randomInvoiceId}`
    );
  }, [props.email]); // добавлен props.userId в массив зависимостей// Пустой массив зависимостей означает, что эффект будет запускаться только один раз при монтировании компоненты

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
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
        name="money-input"
        id="money-input"
        placeholder="5000"
        style={inputSum}
        type="number"
      />
      <span style={textInput}>РУБ</span>
      <Link
        style={btnPay}
        to={`https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${merchant_login}&OutSum=${paymentAmount}&InvoiceID=${invoiceId}&Description=${description}&SignatureValue=${signatureValue}&IsTest=${IsTest}`}
      >
        Пополнить
      </Link>
    </>
  );
};

export default RobokassaPaymentForm;
