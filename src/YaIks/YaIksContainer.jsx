import React, { useState } from "react";
import { connect } from "react-redux";
import YaIks from "./YaIks";
import { TitleComponent } from "../Function/TitleComponent";
import { getIksSite } from "../Api/api-tools-domen";

function YaIksContainer(props) {
  const { getIksSite } = props;
  const [siteArray, setSiteArray] = useState([]);
  const [siteResult, setSiteResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value;
    const newArray = newValue.split("\n");
    setSiteArray(newArray);
  };

  const handleClick = async () => {
    try {
      const results = await getIksSite(siteArray);
      setSiteResult(results);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  const handleClickMassClear = () => {
    setSiteArray([]);
  };

  const handleClear = () => {
    handleClickMassClear();
  };

  return (
    <>
      <TitleComponent
        description="Проверь Яндекс ИКС сайта до 1000 сайтов за один проход. История изменений индекса качества сайта. Полностью бесплатный сервис проверки ИКС."
        title="Проверка Яндекс ИКС онлайн: массовый анализ индекса качества Яндекса бесплатно"
      />
      <YaIks
        handleClear={handleClear}
        getIksSite={getIksSite}
        handleChange={handleChange}
        siteArray={siteArray}
        handleClick={handleClick}
        siteResult={siteResult}
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  getIksSite,
};

export default connect(mapStateToProps, mapDispatchToProps)(YaIksContainer);
