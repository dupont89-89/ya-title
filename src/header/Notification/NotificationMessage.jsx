import React, { useEffect, useState } from "react";
import s from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";

export default function NotificationMessage(props) {
  const [notifications, setNotifications] = useState(props.notifications);

  useEffect(() => {
    setNotifications(props.notifications);
  }, [props.notifications]);

  const handleClearNotifications = () => {
    props.clearNotificationMessage(props.userId);
  };

  return (
    <div className={s.notificationMessage}>
      <h3>Оповещения пользователя</h3>
      {notifications.length > 0 ? (
        <div>
          {notifications.map((message, index) => (
            <ul key={index}>
              <li>
                <div className={s.messageGridNotification}>
                  <FontAwesomeIcon color="#1e811d" icon={faBell} />
                  <p>{message}</p>
                </div>
              </li>
            </ul>
          ))}
          <button
            onClick={handleClearNotifications}
            className={s.btnClearMessage}
          >
            Очистить
          </button>
        </div>
      ) : (
        <div className={s.noMessageNotification}>
          <FontAwesomeIcon size="5x" color="#a52a2a" icon={faBellSlash} />
          <p>Оповещений нет</p>
        </div>
      )}
    </div>
  );
}
