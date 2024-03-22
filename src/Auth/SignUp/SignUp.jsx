import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { signUpUser } from "../../Api/api-user-login";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button type="button" className={styles.white_btn}>
                Sing in
              </button>
            </Link>
          </div>
          <div className={styles.right}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                value={data.firstName}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Last Name"
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
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sing Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
