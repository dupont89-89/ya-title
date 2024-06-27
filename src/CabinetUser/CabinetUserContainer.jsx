import React from "react";
import { connect } from "react-redux";
import CabinetUser from "./CabinetUser";

function CabinetUserContainer(props) {
  return <CabinetUser tools={props.tools} />;
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    tools: state.user.dataUser.tools,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinetUserContainer);
