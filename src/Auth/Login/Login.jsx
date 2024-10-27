import React, { useState } from "react";
import styles from "./styles.module.css";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";
import SendResetPassword from "../ResetPassword/SendResetPassword";
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
import SignInVk from "../ServiseAuth/SignInVk";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const blockForm = {
    height: props.blockFormHeight,
    padding: props.blockFormPadding,
  };

  const resetLink = {
    fontSize: "16px",
    textAlign: "center",
    display: "block",
    margin: "20px 0",
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await props.loginUser(data);
      const token = res.data.token;
      const userData = res.data.user;
      const userId = res.data.user.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userId", JSON.stringify(userId));
      props.getUser(userId);
      props.setAuthSuccess();
      props.close();
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
      {props.closeButton}
      <div className={styles.login_form_container}>
        <div style={blockForm}>
          <div className={styles.ptahiniLogo}>
            <Link to="/">
              <img src={ptahiniLogo} alt="ptahini" />
            </Link>
          </div>
          {loading ? (
            <Loading />
          ) : resetPassword ? (
            <>
              <SendResetPassword inputWidth={props.inputWidth} />
              <Link style={resetLink} onClick={(e) => setResetPassword(false)}>
                Вспомнил пароль
              </Link>
            </>
          ) : (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <Box display="flex" gap={3} flexDirection="column">
                <Typography textAlign="center" component="h1" variant="h4">
                  Войдите в свой аккаунт
                </Typography>
                <TextField
                  type="email"
                  label="Электронная почта"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  variant="outlined"
                />
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Пароль
                  </InputLabel>
                  <OutlinedInput
                    value={data.password}
                    required
                    onChange={handleChange}
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Переключение видимости пароля"
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
                {error && <div className={styles.error_msg}>{error}</div>}
                <Button
                  sx={{ height: "43px" }}
                  type="submit"
                  variant="contained"
                >
                  Войти
                </Button>
                <SignInVk />
                {props.presentInfo}
                <Button onClick={(e) => setResetPassword(true)}>
                  Забыли пароль?
                </Button>
                <Box
                  display="flex"
                  gap={1}
                  alignItems="center"
                  justifyContent="center"
                  fontSize={16}
                >
                  <Typography fontSize="16px" component="span">
                    Нет аккаунта?
                  </Typography>
                  <Link underline="none" href="/signup/">
                    Регистрация
                  </Link>
                </Box>
              </Box>
            </form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;
