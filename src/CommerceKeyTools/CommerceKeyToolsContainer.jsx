import React from "react";
import { connect } from "react-redux";
import CommerceKeyTools from "./CommerceKeyTools";

function CommerceKeyToolsContainer(props) {
  return <CommerceKeyTools toolsSidebar={props.toolsSidebar} />;
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
