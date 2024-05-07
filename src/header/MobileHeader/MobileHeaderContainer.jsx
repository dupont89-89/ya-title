import React from "react";
import { connect } from "react-redux";
import MobileHeader from "./MobileHeader";

function MobileHeaderContainer(props) {
  return (
    <MobileHeader
      notifications={props.notifications}
      isAuthenticated={props.isAuthenticated}
      money={props.money}
      totalLvt={props.totalLvt}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
    lvt: state.user.dataUser.lvt,
    notifications: state.user.dataUser.notifications,
    isAuthenticated: state.user.isAuthenticated,
    totalLvt: state.user.dataUser.totalLvt,
  };
};

export default connect(mapStateToProps, null)(MobileHeaderContainer);
