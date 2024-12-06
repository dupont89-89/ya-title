import React from "react";
import DashboardPanel from "./DashboardPanel";
import { connect } from "react-redux";

function DashboardPanelContainer(props) {
  const { userId, tools, isAuthenticated, money, lvt } = props;

  return (
    <DashboardPanel
      lvt={lvt}
      money={money}
      isAuthenticated={isAuthenticated}
      tools={tools}
      userId={userId}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    tools: state.user.dataUser.tools,
    money: state.user.dataUser.money,
    lvt: state.user.dataUser.lvt,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPanelContainer);
