import React, { useState } from "react";
import styles from "./styles.module.css";
import { loginUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    // height: 350px,
    // padding: 70px,
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
    // background-color: #03A9F4;
    // color: white;
    // margin: 10px 9px;
    // width: 232px;
    // border: none;
    // outline: none;
    // padding: 10px 0;
    // border-radius: 8px;
    // width: 200px;
    // font-weight: 500;
    // font-size: 20px;
    // cursor: pointer;
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(data);
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
            <img src={ptahiniLogo} alt="ptahini" />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1 style={titleForm}>Войдите в свой аккаунт</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                style={styleInput}
              />
              <input
                type="password"
                placeholder="Password"
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
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
