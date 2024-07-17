import React from "react";
import ApiSendYaSearch from "./ApiSendYaSearch";
import { connect } from "react-redux";
import { spendLvt } from "../Api/api-lvt";
import { TitleComponent } from "../Function/TitleComponent";

function ApiSendYaSearchContainer(props) {
  const sumLvt = 1;
  return (
    <>
      <TitleComponent
        description="Создавайте правильный Title за 2 сек и получай ТОП для своего сайта. Уникальный инструмент созданный профессиональным SEO специалстом."
        title="Создание тайтла автоматически на основе поисковой выдачи ТОП 10"
      />
      <ApiSendYaSearch
        userId={props.userId}
        spendLvt={props.spendLvt}
        isAuthenticated={props.isAuthenticated}
        lvt={props.lvt}
        totalLvt={props.totalLvt}
        toolsSidebar={props.toolsSidebar}
        sumLvt={sumLvt}
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    lvt: state.user.dataUser.lvt,
    totalLvt: state.user.dataUser.totalLvt,
  };
};

const mapDispatchToProps = {
  spendLvt,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiSendYaSearchContainer);
