import React, { useState } from "react";
import styles from "./styles.module.css";
import { signUpUser } from "../../Api/api-user-login";
import { loginUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";

const Signup = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Получаем значение из локального хранилища
      const refUserID = localStorage.getItem("ref");

      await signUpUser({
        ...data,
      });
      const dataAuth = { email: data.email, password: data.password };
      const res = await loginUser(dataAuth);
      const token = res.data.token;
      const userData = res.data.user;
      const userId = res.data.user.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userId", JSON.stringify(userId));
      if (refUserID) {
        props.addRefUser(refUserID, userId);
      }
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
    <div>
      <div className={styles.signup_container}>
        {props.closeButton}
        <div className={styles.signup_form_container}>
          <div className={styles.right}>
            <div className={styles.ptahiniLogo}>
              <img src={ptahiniLogo} alt="ptahini" />
            </div>
            {loading ? (
              <Loading />
            ) : (
              <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Регистрация аккаунта</h1>
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
                  placeholder="Пароль"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  required
                  className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                  Создать пользователя
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
