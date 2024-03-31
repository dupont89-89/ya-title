import React from "react";
import Header from "./Header";
import { connect } from "react-redux";

function HeaderContainer(props) {
  return (
    <Header
      money={props.money}
      lvt={props.lvt}
      bonusDayLvt={props.bonusDayLvt}
      lvtPresent={props.lvtPresentRegistration + props.lvtPresentReferal}
      notifications={props.notifications}
      isAuthenticated={props.isAuthenticated}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
    lvt: state.user.dataUser.lvt,
    bonusDayLvt: state.user.dataUser.bonusDayLvt,
    lvtPresentReferal: state.user.dataUser.lvtPresent.lvtPresentReferal,
    lvtPresentRegistration:
      state.user.dataUser.lvtPresent.lvtPresentRegistration,
    notifications: state.user.dataUser.notifications,
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(HeaderContainer);
