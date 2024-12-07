import React, { useState } from "react";
import styles from "./styles.module.css";
import { signUpUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";
import { sendMail } from "../../Api/api-admin";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = (props) => {
  const generateConfirmationCode = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmationCode: generateConfirmationCode().toString(),
  });

  const [enteredConfirmationCode, setEnteredConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "confirmationCode") {
      setEnteredConfirmationCode(input.value);
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const confirmationCode = generateConfirmationCode().toString();
      const mail = {
        textMail: confirmationCode,
        subjectMail: "Код подтверждения PTAHINI",
        userMail: data.email,
      };
      await sendMail(mail);
      setEmailSent(true);
      setShowConfirmation(true);
      setConfirmationCodeSent(true);
      setData({ ...data, confirmationCode: confirmationCode });
    } catch (error) {
      setError("Ошибка при отправке письма");
      console.error("Ошибка при отправке письма:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (enteredConfirmationCode === data.confirmationCode) {
        await signUpUser({
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        const dataAuth = { email: data.email, password: data.password };
        const res = await props.loginUser(dataAuth);
        const token = res.data.token;
        const userData = res.data.user;
        const userId = res.data.user.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userId", JSON.stringify(userId));

        const refUserID = localStorage.getItem("ref");
        if (refUserID) {
          props.addRefUser(refUserID, userId);
        }
        props.close();
      } else {
        setError("Введенный код подтверждения неверный");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          minHeight: "60vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        <Box width={200} alt="ptahini" src={ptahiniLogo} component="img"></Box>
        {loading ? (
          <Loading />
        ) : (
          <form>
            <Box display="flex" gap={3} flexDirection="column" minWidth={350}>
              <Typography
                align="center"
                variant="h4"
                gutterBottom
                component="h1"
              >
                Регистрация
              </Typography>
              {!confirmationCodeSent && (
                <TextField
                  type="email"
                  label="Эл. почта"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  variant="outlined"
                  autoComplete="new-password"
                />
              )}
              {showConfirmation && (
                <>
                  <TextField
                    onChange={handleChange}
                    name="firstName"
                    value={data.firstName}
                    label="Имя"
                    type="text"
                    autoComplete="new-password"
                  />
                  <TextField
                    onChange={handleChange}
                    name="lastName"
                    value={data.lastName}
                    label="Фамилия"
                    type="text"
                    autoComplete="new-password"
                  />
                  <TextField
                    type="password"
                    label="Код подтверждения на эл. почте"
                    name="confirmationCode"
                    onChange={handleChange}
                    value={enteredConfirmationCode}
                    required
                    autoComplete="new-password"
                  />
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Пароль
                    </InputLabel>
                    <OutlinedInput
                      value={data.password}
                      onChange={handleChange}
                      name="password"
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Button variant="contained" onClick={handleSubmit}>
                    Создать пользователя
                  </Button>
                </>
              )}
              {!emailSent && data.email && (
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSendCode();
                  }}
                >
                  Подтвердить адрес
                </Button>
              )}
              {error && <div className={styles.error_msg}>{error}</div>}
              <Box
                display="flex"
                gap={1}
                alignItems="center"
                justifyContent="center"
                fontSize={16}
              >
                <Typography fontSize="16px" component="span">
                  Уже есть аккаунт?
                </Typography>
                <Link underline="none" href="/login/">
                  Войти
                </Link>
              </Box>
            </Box>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default Signup;
