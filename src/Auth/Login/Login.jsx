import React, { useState } from "react";
import styles from "./styles.module.css";
import { loginUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      props.close();
    }
  };

  return (
    <div className={styles.login_container}>
      {props.closeButton}
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <div className={styles.ptahiniLogo}>
            <img src={ptahiniLogo} alt="ptahini" />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Войдите в свой аккаунт</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Войти
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
