import React, { useState } from "react";
import md5 from "crypto-js/md5";
import axios from "axios";

const RobokassaPaymentForm = () => {
  const [paymentAmount, setPaymentAmount] = useState("10"); // начальная сумма платежа
  const [invoiceId, setInvoiceId] = useState(0); // ID счета
  const [description, setDescription] = useState(
    "Техническая документация по ROBOKASSA"
  );

  const handlePayment = async () => {
    const merchant_login = "demo";
    const password_1 = "password_1";

    // Выполняем запрос к API Robokassa
    try {
      const response = await axios.post(
        "https://auth.robokassa.ru/Merchant/Index.aspx",
        {
          MerchantLogin: merchant_login,
          DefaultSum: paymentAmount,
          InvoiceID: invoiceId,
          Description: description,
          SignatureValue: md5(`${merchant_login}::${invoiceId}:${password_1}`),
        }
      );

      // Обрабатываем ответ
      console.log(response.data);
    } catch (error) {
      // Обрабатываем ошибку
      console.error("Ошибка при выполнении платежа:", error);
    }
  };

  return (
    <div>
      <h2>Оплата через ROBOKASSA</h2>
      <label>
        Сумма платежа:
        <input
          type="text"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        ID счета:
        <input
          type="text"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handlePayment}>Оплатить</button>
    </div>
  );
};

export default RobokassaPaymentForm;
