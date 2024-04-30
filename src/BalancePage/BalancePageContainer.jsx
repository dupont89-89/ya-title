import React from "react";
import BalancePage from "./BalancePage";
import { connect } from "react-redux";
import { addLvtUserBalance } from "../Api/api-lvt";

function BalancePageContainer(props) {
  return (
    <BalancePage
      email={props.email}
      userId={props.userId}
      money={props.money}
      addLvtUserBalance={props.addLvtUserBalance}
      isAuthenticated={props.isAuthenticated}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
    userId: state.user.dataUser.userId,
    email: state.user.dataUser.email,
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  addLvtUserBalance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalancePageContainer);
