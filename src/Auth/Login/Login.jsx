import React, { useState } from "react";
import styles from "./styles.module.css";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";
import { Link } from "react-router-dom";
import SendResetPassword from "../ResetPassword/SendResetPassword";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const styleInput = {
    outline: "none",
    border: "none",
    width: props.inputWidth,
    padding: props.inputPadding,
    borderRadius: props.inputRadius,
    backgroundColor: "#edf5f3",
    margin: "5px 0",
    fontSize: "14px",
  };

  const blockForm = {
    height: props.blockFormHeight,
    padding: props.blockFormPadding,
  };

  const titleForm = {
    fontSize: props.fontSizeTitle,
    marginTop: "0",
    textAlign: "center",
  };

  const btnForm = {
    backgroundColor: "#03A9F4",
    color: "white",
    margin: props.btnFormMargin,
    width: props.btnFormWidth,
    border: "none",
    outline: "none",
    padding: "10px 0",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "20px",
    cursor: "pointer",
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
    <div className={styles.login_container}>
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
              <h1 style={titleForm}>Войдите в свой аккаунт</h1>
              <input
                type="email"
                placeholder="Электронная почта"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                style={styleInput}
              />
              <input
                type="password"
                placeholder="Пароль"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                style={styleInput}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button style={btnForm} type="submit">
                Войти
              </button>
              {props.registration}
              {props.presentInfo}
              <Link style={resetLink} onClick={(e) => setResetPassword(true)}>
                Забыли пароль?
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
