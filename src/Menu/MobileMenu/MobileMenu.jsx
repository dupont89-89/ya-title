import React, { useState } from "react";
import styles from "./styles.module.css"; // Импорт CSS модуля
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const menuElement = document.getElementById("menu");
    if (menuElement) {
      menuElement.classList.toggle(styles.menu_activated);
    }
  };
  return (
    <div className={styles.page}>
      <div id="menu" className={styles.menu}>
        <nav id={styles["main-menu"]} className={styles.menu__nav}>
          <ul className={`${styles.menu__list} ${styles["ra-list"]}`}>
            <li>
              <h2>Навигация пользователя</h2>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                Главная
              </Link>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/balance"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                Пополнение баланса / Тарифы
              </Link>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/profile"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                Профиль
              </Link>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/cabinet"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                Кабинет пользователя
              </Link>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/referal"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                Реферальная программа
              </Link>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/history-message"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                История оповещений
              </Link>
            </li>
          </ul>
          <ul className={`${styles.menu__list} ${styles["ra-list"]}`}>
            <li>
              <h2>Инструменты</h2>
            </li>
            <li className={styles.menu__group}>
              <Link
                onClick={toggleMenu}
                to="/"
                className={`${styles.menu__link} ${styles["ra-link"]}`}
              >
                Создание тайтла
              </Link>
            </li>
            <li className={styles.menu__group}>
              <Link
                className={`${styles.menu__link} ${styles["ra-link"]}`}
                onClick={toggleMenu}
                to="/commerce-key"
              >
                Определение типа ключевого запроса
              </Link>
            </li>
          </ul>
        </nav>
        <button
          className={`${styles.menu__toggle} ${styles["ra-button"]}`}
          type="button"
          aria-controls="main-menu"
          onClick={toggleMenu} // Добавьте эту строку
        >
          <span
            className={`${styles.menu__hamburger} ${styles["uia-hamburger"]}`}
          ></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;
