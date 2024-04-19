import React from "react";
import BalancePage from "./BalancePage";
import { connect } from "react-redux";

function BalancePageContainer(props) {
  return (
    <BalancePage
      email={props.email}
      userId={props.userId}
      money={props.money}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
    userId: state.user.dataUser.userId,
    email: state.user.dataUser.email,
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalancePageContainer);
