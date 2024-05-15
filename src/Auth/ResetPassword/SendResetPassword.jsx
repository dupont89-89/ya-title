import React, { useState } from "react";
import { sendEmailReset } from "../../Api/api-user-login";
import Loading from "../../app-function/Loading";

const SendResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Состояние для отображения загрузки

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Установить состояние загрузки в true
    try {
      const response = await sendEmailReset(email); // Дождаться завершения вызова
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
    setLoading(false); // После завершения запроса установить состояние загрузки в false
  };

  const title = {
    textAlign: "center",
  };

  const block = {
    textAlign: "center",
  };
  const label = {
    display: "block",
    fontSize: "16px",
  };
  const input = {
    width: props.inputWidth ? props.inputWidth : "250px",
    height: "30px",
    border: "2px solid",
    textAlign: "center",
    fontSize: "18px",
  };
  const btn = {
    display: "block",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "18px",
    margin: "20px auto",
  };

  const ermes = {
    fontSize: "18px",
    color: "#009c2d",
  };

  return (
    <div style={block}>
      <h2 style={title}>Требуется подтверждение вашего логина</h2>
      <form onSubmit={handleSubmit}>
        <label style={label} htmlFor="mail">
          Ваш электронный адрес
        </label>
        <input
          style={input}
          id="mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button style={btn} type="submit">
          Отправить письмо
        </button>
      </form>
      {loading && <Loading />} {/* Показывать Loading, если loading === true */}
      {message && <p style={ermes}>{message}</p>}
    </div>
  );
};

export default SendResetPassword;
