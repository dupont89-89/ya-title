import React from "react";
import WhoisTools from "./WhoisTools";
import {
  fetchApiWhois,
  getSubscriptionDomenUser,
  subscriptionDomenWhois,
} from "../Api/api-whois";
import { connect } from "react-redux";

function WhoisToolsContainer(props) {
  return (
    <WhoisTools
      isAuthenticated={props.isAuthenticated}
      fetchApiWhois={props.fetchApiWhois}
      subscriptionDomenWhois={props.subscriptionDomenWhois}
      userId={props.userId}
      email={props.email}
      getSubscriptionDomenUser={props.getSubscriptionDomenUser}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    userId: state.user.dataUser.userId,
    email: state.user.dataUser.email,
  };
};
const mapDispatchToProps = {
  fetchApiWhois,
  subscriptionDomenWhois,
  getSubscriptionDomenUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhoisToolsContainer);
