import React, { useState } from "react";
import { sendEmailReset } from "../../Api/api-user-login";
import Loading from "../../app-function/Loading";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

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

  return (
    <Container maxWidth>
      <form onSubmit={handleSubmit}>
        <Box
          alignContent="center"
          flexWrap="wrap"
          display="flex"
          gap={3}
          flexDirection="column"
        >
          <Typography
            maxWidth={450}
            textAlign="center"
            component="h1"
            variant="h4"
          >
            Требуется подтверждение вашего логина
          </Typography>
          <TextField
            type="email"
            label="Ваш электронный адрес"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            variant="outlined"
          />
          {!status ? (
            <Button variant="contained" color="error" type="submit">
              Отправить код востановления
            </Button>
          ) : (
            message && (
              <Typography color="success" variant="h6" component="p">
                {message}
              </Typography>
            )
          )}
        </Box>
      </form>
      {loading && <Loading />}
    </Container>
  );
};

export default SendResetPassword;
