import React, { useState } from "react";
import styles from "./styles.module.css";
import { signUpUser } from "../../Api/api-user-login";
import { loginUser } from "../../Api/api-user-login"; // Импорт функции для входа пользователя
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";

const Signup = (props) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
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
    setLoading(true); // Устанавливаем loading в true сразу после нажатия кнопки

    const trimmedFirstName = data.firstName.trim();
    const trimmedLastName = data.lastName.trim();

    if (trimmedFirstName === "" || trimmedLastName === "") {
      setError(
        "First Name and Last Name cannot be empty or contain leading/trailing spaces."
      );
      setLoading(false); // Устанавливаем loading в false в случае ошибки
      return;
    }

    try {
      await signUpUser({
        ...data,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      });

      const dataAuth = { email: data.email, password: data.password };
      const res = await loginUser(dataAuth);
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
      // setError(error.message);
    } finally {
      setLoading(false); // Устанавливаем loading в false после завершения асинхронных операций
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
                  type="text"
                  placeholder="Имя"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="Фамилия"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                  required
                  className={styles.input}
                />
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
