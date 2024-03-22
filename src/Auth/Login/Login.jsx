import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { loginUser } from "../../Api/api-user-login";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(data);
      const token = res.data.token; // Получите токен из ответа
      const userData = res.data.user; // Получите данные пользователя из ответа
      const userId = res.data.user.userId; // Получите данные пользователя из ответа
      // Сохраните токен и данные пользователя в локальном хранилище
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("userId", JSON.stringify(userId));
      //   props.setDataUser(userData)
      props.getUser(userId);
      props.setAuthSuccess();
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
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
        </div>
        <div className={styles.right}>
          <h1>Нет аккаунта?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Регистрация
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
