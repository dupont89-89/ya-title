import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import {
  clearNotificationMessage,
  getNotificationMessage,
} from "../../Api/api-support";
import { connect } from "react-redux";

function NotificationContainer(props) {
  const [notifications, setNotifications] = useState(props.notifications);

  useEffect(() => {
    // Обновляем локальное состояние уведомлений при каждом изменении в props.notifications
    setNotifications(props.notifications);
    console.log(props.notifications);
  }, [props.notifications]);

  useEffect(() => {
    if (props.userId) {
      props.getNotificationMessage(props.userId);
      console.log(props.userId);
    }
  }, [props.userId]);

  const notificationCount = notifications.length;

  return (
    <div>
      <Notification
        notificationCount={notificationCount}
        notifications={notifications}
        clearNotificationMessage={props.clearNotificationMessage}
        userId={props.userId}
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
