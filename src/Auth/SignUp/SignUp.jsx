import React, { useState } from "react";
import styles from "./styles.module.css";
import { signUpUser } from "../../Api/api-user-login";
import { loginUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";
import { sendMail } from "../../Api/api-admin";

const Signup = (props) => {
  // Функция для генерации четырёхзначного кода
  const generateConfirmationCode = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmationCode: generateConfirmationCode().toString(), // Используем функцию для генерации кода
  });
  const [enteredConfirmationCode, setEnteredConfirmationCode] = useState(""); // Состояние для хранения введенного пользователем кода
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // Состояние для отслеживания отправки письма с кодом
  const [showConfirmation, setShowConfirmation] = useState(false); // Состояние для отображения поля ввода кода
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false); // Состояние для отслеживания отправки кода подтверждения

  const handleChange = ({ currentTarget: input }) => {
    if (input.name === "confirmationCode") {
      setEnteredConfirmationCode(input.value); // Обновляем состояние с введенным пользователем кодом
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };

  const handleSendCode = async () => {
    setLoading(true);
    try {
      // Генерируем код подтверждения и отправляем на почту
      const confirmationCode = generateConfirmationCode().toString();
      const mail = {
        textMail: confirmationCode,
        subjectMail: "Код подтверждения PTAHINI",
        userMail: data.email,
      };
      await sendMail(mail); // Отправляем письмо с кодом подтверждения
      setEmailSent(true); // Устанавливаем флаг, что письмо отправлено
      setShowConfirmation(true); // Показываем поле ввода кода
      setConfirmationCodeSent(true); // Устанавливаем флаг, что код подтверждения отправлен
      setData({ ...data, confirmationCode: confirmationCode }); // Сохраняем сгенерированный код в состоянии
    } catch (error) {
      setError("Ошибка при отправке письма");
      console.error("Ошибка при отправке письма:", error); // Выводим ошибку в консоль
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (enteredConfirmationCode === data.confirmationCode) {
        // Код подтверждения совпадает - создаем пользователя
        await signUpUser({
          email: data.email,
          password: data.password,
        });
        const dataAuth = { email: data.email, password: data.password };
        const res = await props.loginUser(dataAuth);
        const token = res.data.token;
        const userData = res.data.user;
        const userId = res.data.user.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("userId", JSON.stringify(userId));
        // Получаем значение из локального хранилища
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
              <form className={styles.form_container}>
                <h1>Регистрация аккаунта</h1>
                {!confirmationCodeSent && (
                  <input
                    type="email"
                    placeholder="Введите адрес электронной почты"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className={styles.input}
                  />
                )}
                {showConfirmation && (
                  <>
                    <input
                      type="password"
                      placeholder="Код подтверждения на эл. почте"
                      name="confirmationCode"
                      onChange={handleChange}
                      value={enteredConfirmationCode}
                      required
                      autoComplete="new-password"
                      className={styles.input}
                    />
                    <input
                      type="password"
                      placeholder="Введите пароль для аккаунта"
                      name="password"
                      onChange={handleChange}
                      value={data.password}
                      required
                      className={styles.input}
                    />
                    <button onClick={handleSubmit} className={styles.green_btn}>
                      Создать пользователя
                    </button>
                  </>
                )}
                {!emailSent && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // Предотвращаем отправку формы
                      handleSendCode(); // Вызываем функцию отправки кода
                    }}
                    className={styles.green_btn}
                  >
                    Отправить код подтверждения на почту
                  </button>
                )}
                {error && <div className={styles.error_msg}>{error}</div>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
