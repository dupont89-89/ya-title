import React from "react";
import s from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

export default function NotificationMessage(props) {
  return (
    <div className={s.notificationMessage}>
      <h3>Оповещения пользователя</h3>
      <ul>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 20 Lvt бонусом за регистрацию</p>
          </div>
        </li>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 3 Lvt ежедневный</p>
          </div>
        </li>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 3 Lvt ежедневный</p>
          </div>
        </li>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 3 Lvt ежедневный</p>
          </div>
        </li>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 3 Lvt ежедневный</p>
          </div>
        </li>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 3 Lvt ежедневный</p>
          </div>
        </li>
        <li>
          <div className={s.messageGridNotification}>
            <FontAwesomeIcon color="#1e811d" icon={faBell} />
            <p>Вам начисленно 3 Lvt ежедневный</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
