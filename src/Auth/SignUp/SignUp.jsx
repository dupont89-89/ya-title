import React, { useState } from "react";
import styles from "./styles.module.css";
import { signUpUser, loginUser } from "../../Api/api-user-login";
import ptahiniLogo from "./../../img/logo/PTAHINI-nav.png";
import Loading from "../../app-function/Loading";
import { sendMail } from "../../Api/api-admin";

const Signup = (props) => {
  const generateConfirmationCode = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmationCode: generateConfirmationCode().toString(),
  });

  const [enteredConfirmationCode, setEnteredConfirmationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCodeSent, setConfirmationCodeSent] = useState(false);

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
        await signUpUser({ email: data.email, password: data.password });
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
                {!emailSent && data.email && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSendCode();
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
