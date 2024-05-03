import React from "react";
import { Link } from "react-router-dom";
import s from "./../Menu.module.css";

export default function MenuAuthUser(props) {
  const notificationCount = props.notifications.length;
  const referalQuantity = props.referal.length;

  const numberNotifications = {
    background: notificationCount === 0 ? "#4CAF50" : "rgb(204 28 28)",
    borderRadius: "50%",
    color: "#fff",
    width: "18px",
    height: "18px",
    textAlign: "center",
    lineHeight: "17px",
    fontSize: "14px",
  };

  return (
    <div className={s.menuAuthBlock}>
      <nav>
        <h3>Управление аккаунтом</h3>
        <ul>
          <li>
            <div className={`${s.emailLogin} ${s.padding}`}>
              <span>{`${props.firstName} ${props.lastName}`}</span>
              <span>{props.email}</span>
            </div>
          </li>
          <hr className={s.menuAuthDivider} />
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>
                Профиль {" / "}
                <span className={s.linkMenuToBalance}>
                  <Link to="/profile/">Управление</Link>
                </span>
              </span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>
                Лимиты{" / "}
                <span className={s.linkMenuToBalance}>
                  <Link to="/balance/">Обменять</Link>
                </span>
              </span>
              <span className={s.menuLvtBalans}>
                {props.lvt + props.bonusDayLvt} Lvt
              </span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>
                Баланс{" / "}
                <span className={s.linkMenuToBalance}>
                  <Link to="/balance/">Пополнить</Link>
                </span>
              </span>
              <span className={s.menuLvtBalans}>{props.money} Р</span>
            </div>
          </li>

          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>Подарки</span>
              <span className={s.menuLvtBalans}>{props.lvtPresent} Lvt</span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>
                Рефералы {" / "}
                <span className={s.linkMenuToBalance}>
                  <Link to="/referal/">Подробности</Link>
                </span>
              </span>
              <span className={s.menuLvtBalans}>{referalQuantity}</span>
            </div>
          </li>
          <li>
            <div className={`${s.gridMenuText} ${s.padding}`}>
              <span>
                Уведомления {" / "}
                <span className={s.linkMenuToBalance}>
                  <Link to="/history-message/">История</Link>
                </span>
              </span>
              <span style={numberNotifications}>{notificationCount}</span>
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
