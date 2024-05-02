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
      firstName={props.firstName}
      lastName={props.lastName}
      avatar={props.avatar}
      totalLvt={props.totalLvt}
      referal={props.referal}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
    userId: state.user.dataUser.userId,
    email: state.user.dataUser.email,
    isAuthenticated: state.user.isAuthenticated,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
    avatar: state.user.dataUser.avatar,
    totalLvt: state.user.dataUser.totalLvt,
    referal: state.user.dataUser.referal,
  };
};

const mapDispatchToProps = {
  addLvtUserBalance,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BalancePageContainer);
