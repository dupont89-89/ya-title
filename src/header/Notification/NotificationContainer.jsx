import React, { useEffect } from "react";
import Notification from "./Notification";
import {
  clearNotificationMessage,
  getNotificationMessage,
} from "../../Api/api-support";
import { connect } from "react-redux";

function NotificationContainer(props) {
  useEffect(() => {
    if (props.userId) {
      props.getNotificationMessage(props.userId);
    }
  }, [props.notifications, props.userId]);

  const notificationCount = props.notifications.length;

  return (
    <div>
      <Notification
        notificationCount={notificationCount}
        notifications={props.notifications}
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
