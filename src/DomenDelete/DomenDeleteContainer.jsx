import React, { useState } from "react";
import { connect } from "react-redux";
import DomenDelete from "./DomenDelete";
import { getDomenDelete } from "../Api/api-tools-domen";
import { TitleComponent } from "../Function/TitleComponent";
import { getDomenChekRegRu } from "../Api/api-reg-ru";

function DomenDeleteContainer(props) {
  const { getDomenChekRegRu } = props;

  const [domenResult, setDomenResult] = useState([]);
  const [domenResultData, setDomenResultData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClickChekDomen = async () => {
    setIsLoading(true);
    try {
      const results = await props.getDomenChekRegRu();
      console.log(results);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const results = await props.getDomenDelete();
      setDomenResult(results.domains);
      setDomenResultData(results.message);
      console.log(results);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <TitleComponent
        description="Списки освобождающиехся доменов с данным по возможности регистрации, внешним ссылкам, ИКС сайта и другим основным данным траста сайта."
        title="Регистрация и продление доменов, поиск свободных и освобождающихся доменов бесплатно в дроп-списке"
      />
      <DomenDelete
        domenResultData={domenResultData}
        domenResult={domenResult}
        handleClick={handleClick}
        handleClickChekDomen={handleClickChekDomen}
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  getDomenDelete,
  getDomenChekRegRu,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomenDeleteContainer);
