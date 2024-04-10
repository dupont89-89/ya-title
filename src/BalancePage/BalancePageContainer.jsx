import React from "react";
import BalancePage from "./BalancePage";
import { connect } from "react-redux";

function BalancePageContainer(props) {
  return <BalancePage money={props.money} />;
}

const mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalancePageContainer);
