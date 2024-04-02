import React from "react";
import BalancePage from "./BalancePage";
import { connect } from "react-redux";

function BalancePageContainer(props) {
  return <BalancePage />;
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalancePageContainer);
