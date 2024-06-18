import React, { useEffect } from "react";
import s from "./Admin.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Admin(props) {
  useEffect(() => {
    props.getAdminUserData();
  }, []);
  return (
    <div className={s.adminPage}>
      <div className={s.blockAdminPage}>
        <h2>Управление пользователями</h2>
        <div>
          <FontAwesomeIcon icon={faUsers} />
          <Link className={s.linkAdmin} to="user/">
            Все пользователи
          </Link>
        </div>
      </div>
      <div className={s.blockAdminPage}>
        <h2>Статистика</h2>
        <div className={s.countUser}>
          <span>Пользователи всего: </span> {props.countUser}
        </div>
      </div>
      <div className={s.blockAdminPage}>
        <h2>Тестирование</h2>
        <Link to="test/">Перейти</Link>
      </div>
      <div className={s.blockAdminPage}>
        <h2>Счета</h2>
        <div>
          <FontAwesomeIcon icon={faLandmark} />
          <Link className={s.linkAdmin} to="score/">
            Перейти
          </Link>
        </div>
      </div>
    </div>
  );
}
