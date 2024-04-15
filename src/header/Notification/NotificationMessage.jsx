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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className={s.notificationMessage}>
      <h3>Оповещения пользователя</h3>
      {notifications.length > 0 ? (
        <div>
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id}>
                <div className={s.messageGridNotification}>
                  <p>
                    <span className={s.dateNotifications}>
                      <FontAwesomeIcon color="#1e811d" icon={faBell} />
                      {formatDate(notification.dateAdded)}
                    </span>{" "}
                    {notification.message}
                  </p>
                </div>
              </li>
            ))}
          </ul>
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
