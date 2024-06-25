import React from "react";
import ApiSendYaSearch from "./ApiSendYaSearch";
import { connect } from "react-redux";
import { spendLvt } from "../Api/api-lvt";

function ApiSendYaSearchContainer(props) {
  const sumLvt = 1;
  return (
    <ApiSendYaSearch
      userId={props.userId}
      spendLvt={props.spendLvt}
      isAuthenticated={props.isAuthenticated}
      lvt={props.lvt}
      totalLvt={props.totalLvt}
      toolsSidebar={props.toolsSidebar}
      sumLvt={sumLvt}
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

const mapDispatchToProps = {
  spendLvt,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiSendYaSearchContainer);
