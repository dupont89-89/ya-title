import React, { useState } from "react";
import { connect } from "react-redux";
import DomenDelete from "./DomenDelete";
import { getDomenDelete } from "../Api/api-tools-domen";
import { TitleComponent } from "../Function/TitleComponent";

function DomenDeleteContainer(props) {
  const [domenResult, setDomenResult] = useState([]);
  const [domenResultData, setDomenResultData] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  getDomenDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomenDeleteContainer);
