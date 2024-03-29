import { useState } from "react";
import styles from "./styles.module.css";
import { signUpUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";

const Signup = (props) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Удаляем пробелы в начале и конце из firstName и lastName
    const trimmedFirstName = data.firstName.trim();
    const trimmedLastName = data.lastName.trim();

    // Проверяем, что после удаления пробелов поле не является пустым
    if (trimmedFirstName === "" || trimmedLastName === "") {
      setError(
        "First Name and Last Name cannot be empty or contain leading/trailing spaces."
      );
      return;
    }

    // Если проверки прошли успешно, отправляем данные
    try {
      const res = await signUpUser({
        ...data,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
      });
      console.log(res.message);
    } catch (error) {
      setError(error.message);
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
