import React, { useState } from "react";
import { sendEmailReset } from "../../Api/api-user-login";
import Loading from "../../app-function/Loading";

const SendResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Состояние для отображения загрузки
  const [status, setStatus] = useState(false); // Состояние для отображения успеха

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Установить состояние загрузки в true
    try {
      const response = await sendEmailReset(email); // Дождаться завершения вызова
      setMessage(response.data.message);
      if (response.status === 200) {
        setStatus(true);
      }
    } catch (error) {
      setMessage(error.response.data.message);
    }
    setLoading(false); // После завершения запроса установить состояние загрузки в false
  };

  const styles = {
    title: {
      textAlign: "center",
    },
    block: {
      textAlign: "center",
    },
    label: {
      display: "block",
      fontSize: "16px",
    },
    input: {
      width: props.inputWidth ? props.inputWidth : "250px",
      height: "30px",
      border: "2px solid",
      textAlign: "center",
      fontSize: "18px",
    },
    btn: {
      display: "block",
      backgroundColor: "#4CAF50",
      color: "#fff",
      fontSize: "18px",
      margin: "20px auto",
    },
    ermes: {
      fontSize: "18px",
      color: "#009c2d",
    },
  };

  return (
    <div style={styles.block}>
      <h2 style={styles.title}>Требуется подтверждение вашего логина</h2>
      <form onSubmit={handleSubmit}>
        <label style={styles.label} htmlFor="mail">
          Ваш электронный адрес
        </label>
        <input
          style={styles.input}
          id="mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {!status ? (
          <button style={styles.btn} type="submit">
            Отправить письмо
          </button>
        ) : (
          message && <p style={styles.ermes}>{message}</p>
        )}
      </form>
      {loading && <Loading />} {/* Показывать Loading, если loading === true */}
    </div>
  );
};

export default SendResetPassword;
