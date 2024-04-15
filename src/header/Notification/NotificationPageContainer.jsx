import React from "react";
import NotificationPage from "./NotificationPage";
import { connect } from "react-redux";

function NotificationPageContainer(props) {
  return (
    <div>
      <NotificationPage notificationsHistory={props.notificationsHistory} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    notificationsHistory: state.user.dataUser.notificationsHistory,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationPageContainer);
