import React from "react";
import BalancePage from "./BalancePage";
import { connect } from "react-redux";
import { addLvtUserBalance } from "../Api/api-lvt";
import { TitleComponent } from "../Function/TitleComponent";

function BalancePageContainer(props) {
  return (
    <>
      <TitleComponent
        description="Пополняйте баланс и обменивайте на Lvt (внутреннею валюту сервиса). Выгодные тарифы с бонусами."
        title="Пополнение баланса пользователя, выбор тарифов, обмен Lvt"
      />
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
    </>
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
