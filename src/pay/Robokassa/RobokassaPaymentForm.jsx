import React, { useState } from "react";
import axios from "axios";

const RobokassaPaymentForm = () => {
  const [paymentAmount, setPaymentAmount] = useState("10"); // начальная сумма платежа
  const [invoiceId, setInvoiceId] = useState(0); // ID счета
  const [description, setDescription] = useState(
    "Техническая документация по ROBOKASSA"
  );

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/pay/user-sum",
        {
          paymentAmount: paymentAmount,
          invoiceId: invoiceId,
          description: description,
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
