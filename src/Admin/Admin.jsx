import React from "react";
import s from "./Admin.module.css";
import { Link } from "react-router-dom";

export default function Admin(props) {
  return (
    <div className={s.adminPage}>
      <div className={s.blockAdminPage}>
        <h2>Управление пользователями</h2>
        <Link to="user/">Все пользователи</Link>
      </div>
      <div className={s.blockAdminPage}>
        <h2>Статистика</h2>
        <div className={s.countUser}>
          <span>Пользователи всего: </span> {props.countUser}
        </div>
      </div>
      <div className={s.blockAdminPage}>
        <h2>Проверка Тест</h2>
      </div>
    </div>
  );
}
