import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ScoreUser from "./ScoreUser";
import { getPayScore } from "../../Api/api-pay";
import CircularWithValueLabel from "../../app-function/Loading";

function ScoreUserContainer(props) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPayScore();
        setScore(response.score); // Устанавливаем полученный ответ в состояние
        debugger;
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };
    fetchData();
  }, []); // Пустой массив зависимостей означает, что эффект будет вызван только при монтировании компонента

  // Проверяем, есть ли уже загруженные данные
  if (!score) {
    return <CircularWithValueLabel />; // Можно добавить какой-нибудь индикатор загрузки
  }

  return <ScoreUser score={score} />; // Передаем полученный score в компонент ScoreUser
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.adminUser.dataUser,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreUserContainer);
