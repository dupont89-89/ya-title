import React from "react";
import s from "./Notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function NotificationPage(props) {
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

  // Переворачиваем массив notificationsHistory
  const reversedNotifications = props.notificationsHistory.slice().reverse();

  return (
    <div className={s.NotificationPageBlock}>
      <h1>История оповещений</h1>
      <ol>
        {reversedNotifications.map((notification) => (
          <li key={notification._id}>
            <p className={s.blockMessageNotifPage}>
              <FontAwesomeIcon
                size="2x"
                color="green"
                icon={faCircleExclamation}
              />{" "}
              <span className={s.textMessage}>
                <span className={s.dateNotifications}>
                  {formatDate(notification.dateAdded)}
                </span>{" "}
                <span className={s.textNotificationsMessage}>
                  {notification.message}
                </span>
              </span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
