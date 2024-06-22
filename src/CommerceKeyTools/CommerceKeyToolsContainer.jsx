import React from "react";
import { connect } from "react-redux";
import CommerceKeyTools from "./CommerceKeyTools";

function CommerceKeyToolsContainer(props) {
  const tarifKey = 0.1;
  return (
    <CommerceKeyTools
      userId={props.userId}
      totalLvt={props.totalLvt}
      isAuthenticated={props.isAuthenticated}
      tarifKey={tarifKey}
      toolsSidebar={props.toolsSidebar}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    lvt: state.user.dataUser.lvt,
    totalLvt: state.user.dataUser.totalLvt,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommerceKeyToolsContainer);
