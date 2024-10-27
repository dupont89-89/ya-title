import React from "react";
import Home from "./Home";
import { connect } from "react-redux";
import { TitleComponent } from "../../Function/TitleComponent";

function HomeContainer(props) {
  const { isAuthenticated } = props;
  return (
    <>
      <TitleComponent
        description="Уникальные инструменты Ptahini для продвижения сайтов, работы с аналитикой и увеличения продаж онлайн. Помогает найти клиентов и повысить продажи"
        title="Инструменты Ptahini для SEO специалистов, маркетологов и бизнеса"
      />
      <Home isAuthenticated={isAuthenticated} />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
