import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

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
    <Container maxWidth>
      {status ? (
        <Box
          display="flex"
          gap={3}
          p={3}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#fbfbfb"
          borderRadius="10px"
          minWidth="400px"
          minHeight="400px"
          position="absolute"
          top="50%"
          left="50%"
          margin="-282px 0 0 -200px"
        >
          <Typography gutterBottom component="p" color="success" variant="h6">
            {successMessage}
          </Typography>
          <Button
            component="a"
            href="/login/"
            variant="outlined"
            color="success"
          >
            Войти в аккаунт
          </Button>
        </Box>
      ) : (
        <Box
          display="flex"
          gap={3}
          p={3}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#fbfbfb"
          borderRadius="10px"
          minWidth="400px"
          minHeight="400px"
          position="absolute"
          top="50%"
          left="50%"
          margin="-282px 0 0 -200px"
        >
          {errorMessage && (
            <Typography
              textAlign="center"
              component="p"
              color="error"
              variant="h6"
            >
              {errorMessage}
            </Typography>
          )}
          <Typography textAlign="center" component="h1" variant="h4">
            Сброс пароля
          </Typography>
          <TextField
            sx={{ width: "300px;" }}
            variant="filled"
            label="Новый пароль"
            id="password_1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            focused
            color="success"
            autoComplete="new-password"
          />
          <TextField
            sx={{ width: "300px" }}
            label={
              password === ""
                ? "Повторить пароль"
                : password === confirmPassword
                  ? "Успешное совпадение"
                  : "Пароли не совпадают"
            }
            id="password_2"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="filled"
            color={password === confirmPassword ? "success" : "error"}
            focused
            autoComplete="new-password"
          />
          <Button
            disabled={password !== confirmPassword || password === ""}
            width={250}
            color="warning"
            variant="contained"
            onClick={handleResetPassword}
          >
            Сбросить пароль
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ResetPasswordForm;
