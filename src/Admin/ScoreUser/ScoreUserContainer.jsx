import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ScoreUser from "./ScoreUser";
import { getPayScore } from "../../Api/api-pay";

function ScoreUserContainer(props) {
  const [score, setScore] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPayScore();
        setScore(response.score); // Устанавливаем полученный ответ в состояние
      } catch (error) {
        console.error("Error fetching score:", error);
      }
    };

    fetchData(); // Вызываем асинхронную функцию fetchData
  }, []); // Пустой массив зависимостей означает, что эффект будет вызван только при монтировании компонента

  return <ScoreUser score={score} />; // Передаем полученный score в компонент ScoreUser
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.adminUser.dataUser,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ScoreUserContainer);
