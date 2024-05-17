import React, { useState } from "react";
import axios from "axios";
import ModalLogin from "../Login/ModalLogin";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [status, setStatus] = useState(false); // Состояние для отображения успеха

  const styles = {
    block: {
      minHeight: "77vh",
      backgroundColor: "rgb(255, 227, 142)",
      borderRadius: "10px",
      display: "flex",
    },
    blockTwo: {
      margin: "auto",
      width: "500px",
      backgroundColor: "rgb(242, 242, 242)",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      padding: "30px",
    },
    title: {
      textAlign: "center",
      fontSize: "2rem",
    },
    label: {
      display: "block",
      fontSize: "1.5rem",
      textAlign: "center",
    },
    input: {
      width: "200px",
      height: "40px",
      border: "2px solid",
      textAlign: "center",
    },
    blockTre: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignItems: "center",
      margin: "15px 0",
    },
    btn: {
      backgroundColor: "#FFC107",
      fontSize: "1.3rem",
      padding: "7px 20px",
    },
  };

  const handleResetPassword = async () => {
    try {
      // Проверяем, что пароль и подтверждение пароля совпадают
      if (password !== confirmPassword) {
        setErrorMessage("Пароли не совпадают");
        return;
      }

      // Получаем токен сброса пароля из URL
      const token = window.location.pathname.split("/").pop();

      // Отправляем запрос на сброс пароля
      const response = await axios.post(
        `${config.REACT_APP_SERVER_URL}/api/user/reset-password/${token}`,
        { password }
      );

      // Если запрос выполнен успешно, показываем сообщение об успешном сбросе пароля
      setSuccessMessage(response.data.message);
      if (response.status === 200) {
        setStatus(true);
      }
    } catch (error) {
      // Если произошла ошибка, показываем соответствующее сообщение
      const errorMsg = error.response
        ? error.response.data.message
        : "Произошла ошибка. Попробуйте снова.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div style={styles.block}>
      <div style={styles.blockTwo}>
        <h1 style={styles.title}>Сброс пароля</h1>
        {errorMessage && (
          <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
        )}
        {successMessage && (
          <>
            <p style={{ color: "green", fontSize: "20px" }}>{successMessage}</p>
            <ModalLogin
              btnWidth="186px"
              btnBackgroundColor="#FFC107"
              nameBtnPopupLogin="Войти в аккаунт"
              radiusBtn="5px"
              sizeFontBtn="18px"
            />
          </>
        )}
        {!status && (
          <>
            <div style={styles.blockTre}>
              <label style={styles.label} htmlFor="password_1">
                Новый пароль
              </label>
              <input
                style={styles.input}
                id="password_1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={styles.blockTre}>
              <label style={styles.label} htmlFor="password_2">
                Подтвердите пароль
              </label>
              <input
                style={styles.input}
                id="password_2"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button style={styles.btn} onClick={handleResetPassword}>
              Сбросить пароль
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
