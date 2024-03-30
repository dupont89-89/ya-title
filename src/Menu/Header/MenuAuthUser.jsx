import React from "react";
import { Link } from "react-router-dom";
import s from "./../Menu.module.css";

export default function MenuAuthUser(props) {
  return (
    <div className={s.menuAuthBlock}>
      <nav>
        <h3>Управление аккаунтом</h3>
        <ul>
          <li>
            <span className={`${s.emailLogin} ${s.padding}`}>
              {props.email}
            </span>
          </li>
          <hr className={s.menuAuthDivider} />
          <li>
            <Link className={`${s.linkProfileHeader} ${s.padding}`}>
              <span>Профиль/Управление</span>
            </Link>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>Лимиты</span>
              <span className={s.menuLvtBalans}>
                {props.lvt + props.bonusDayLvt} Lvt
              </span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>Баланс</span>
              <span className={s.menuLvtBalans}>{props.money} Р</span>
            </div>
          </li>

          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>Подарки/История</span>
              <span className={s.menuLvtBalans}>{props.lvtPresent} Lvt</span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>Рефералы</span>
              <span className={s.menuLvtBalans}>{props.referalQuantity}</span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>Уведомления</span>
              <span className={s.menuLvtBalans}>{props.notifications}</span>
            </div>
          </li>
          <li>
            <button className={s.btnMenuClose} onClick={props.onLogout}>
              Выйти
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
