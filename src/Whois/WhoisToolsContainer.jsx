import React from "react";
import WhoisTools from "./WhoisTools";
import { fetchApiWhois } from "../Api/api-whois";
import { connect } from "react-redux";

function WhoisToolsContainer(props) {
  return (
    <WhoisTools
      isAuthenticated={props.isAuthenticated}
      fetchApiWhois={props.fetchApiWhois}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
const mapDispatchToProps = {
  fetchApiWhois,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhoisToolsContainer);
