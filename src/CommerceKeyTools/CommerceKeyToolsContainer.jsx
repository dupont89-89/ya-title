import React from "react";
import { connect } from "react-redux";
import CommerceKeyTools from "./CommerceKeyTools";

function CommerceKeyToolsContainer(props) {
  const tarifKey = 0.1;

  const texts = {
    textCommerce:
      "Этот ключевой запрос коммерческий (транзакционный). Вам следует продвигать его на страницах категорий товаров, предложения услуг итд.",
    textMedia:
      "Этот ключевой запрос для мультимедиа контента. Продвигать видео, фото, аудио контент на своей странице или на страницах популярных ресурсов размещая там материалы.",
    textNavi:
      "Это навигационный ключевой запрос. Пользователь ищет конкретный популярный ресурс. Наврятли у вас получится эффективно ипользовать его на своей странице",
    textInfo:
      "Этот ключевой запрос информационный. Пользователь ищет ответы на свои вопросы. Под него нужно писать текстовый контент (статью).",
    textInfoCommerc:
      "По этому ключевому запросу в выдаче находятся страницы информационные и коммерческие. Я бы все таки уточнил ключ (добавить слова: купить, смотреть, как сделать или связанные с запросом), чтобы точно понимать, какая у вас цель при продвижение данного запроса в выдаче.",
    textNoKey:
      "Похоже что это слишком общий запрос и не удалось определить точно, к какому типу он относится. Попробуйте его уточнить, добавить слова. Возможен вариант, что мы просто не смогли определить его по нашей базе.",
  };

  return (
    <CommerceKeyTools
      userId={props.userId}
      totalLvt={props.totalLvt}
      isAuthenticated={props.isAuthenticated}
      tarifKey={tarifKey}
      toolsSidebar={props.toolsSidebar}
      texts={texts}
    />
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

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommerceKeyToolsContainer);
