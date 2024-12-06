import React from "react";
import { connect } from "react-redux";
import CabinetUser from "./CabinetUser";
import { TitleComponent } from "../Function/TitleComponent";

function CabinetUserContainer(props) {
  const { lvt, money, tools, currentTariff } = props;
  return (
    <>
      <TitleComponent
        description="В кабинете пользователя вы можете управлять своими проектами и смотреть результаты запущенных ранее проверок."
        title="Кабинет пользователя сервисов Ptahini, управление проектами, история результатов проверки"
      />
      <CabinetUser
        currentTariff={currentTariff}
        lvt={lvt}
        money={money}
        tools={tools}
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    tools: state.user.dataUser.tools,
    money: state.user.dataUser.money,
    lvt: state.user.dataUser.lvt,
    currentTariff: state.user.dataUser.currentTariff,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CabinetUserContainer);
