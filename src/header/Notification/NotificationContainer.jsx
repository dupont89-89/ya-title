import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import s from "./Notification.module.css";
import {
  clearNotificationMessage,
  getNotificationMessage,
} from "../../Api/api-support";
import { connect } from "react-redux";

function NotificationContainer({
  notifications,
  userId,
  getNotificationMessage,
  clearNotificationMessage,
}) {
  const [localNotifications, setLocalNotifications] = useState(notifications);

  useEffect(() => {
    // Обновляем локальное состояние уведомлений при каждом изменении в notifications
    setLocalNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    if (userId) {
      getNotificationMessage(userId);
    }
  }, [userId, getNotificationMessage]);

  const notificationCount = localNotifications.length;

  return (
    <div className={s.notificationsContainer}>
      <Notification
        notificationCount={notificationCount}
        notifications={localNotifications}
        clearNotificationMessage={clearNotificationMessage}
        userId={userId}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    userId: state.user.dataUser.userId,
    notifications: state.user.dataUser.notifications,
  };
};

const mapDispatchToProps = {
  getNotificationMessage,
  clearNotificationMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
