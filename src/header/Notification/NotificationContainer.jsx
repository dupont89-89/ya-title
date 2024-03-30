import React from "react";
import Notification from "./Notification";
import { getNotificationMessage } from "../../Api/api-support";
import { connect } from "react-redux";

function NotificationContainer(props) {
  props.getNotificationMessage(props.userId);

  return <Notification notifications={props.notifications} />;
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    userId: state.user.dataUser.userId,
    notifications: state.user.dataUser.notifications,
  };
};
const mapDispatchToProps = {
  getNotificationMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);
