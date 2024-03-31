import React from "react";
import ApiSendYaSearch from "./ApiSendYaSearch";
import { connect } from "react-redux";
import { spendLvtOneTitle } from "../Api/api-lvt";

function ApiSendYaSearchContainer(props) {
  return (
    <ApiSendYaSearch
      userId={props.userId}
      spendLvtOneTitle={props.spendLvtOneTitle}
      isAuthenticated={props.isAuthenticated}
      lvt={props.lvt}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    lvt: state.user.dataUser.lvt,
  };
};

const mapDispatchToProps = {
  spendLvtOneTitle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiSendYaSearchContainer);
