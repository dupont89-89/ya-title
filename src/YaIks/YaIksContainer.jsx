import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import YaIks from "./YaIks";
import { TitleComponent } from "../Function/TitleComponent";
import { getIksSite } from "../Api/api-tools-domen";
import { getDomenChekRegRu } from "../Api/api-reg-ru";
import decodePunycode from "../Whois/Parts/PunycodeConverter";

function YaIksContainer(props) {
  const { getIksSite, getDomenChekRegRu } = props;
  const [siteArray, setSiteArray] = useState([]);
  const [siteResult, setSiteResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [stateChek, setStateChek] = useState(false);
  const [stateNumberIks, setStateNumberIks] = useState("");

  useEffect(() => {
    setStateNumberIks(stateChek ? 0 : "");
  }, [stateChek]);

  const handleRegistrationDomen = async (domainsToCheck) => {
    try {
      setIsLoading(true);

      // Очищаем домены от лишних частей (http://, https://, www.)
      const cleanDomain = (domain) => {
        return domain
          .replace(/^(https?:\/\/)?(www\.)?/, "") // Удаляем протоколы и www.
          .split("/")[0]; // Убираем все, что после домена
      };

      // Преобразуем массив строк в массив объектов с ключом dname и очищаем домены
      const domainsForRegRu = domainsToCheck.map((domain) => ({
        dname: cleanDomain(domain),
      }));

      // Вызываем getDomenChekRegRu для получения данных о доступности доменов
      const resultsChek = await getDomenChekRegRu(domainsForRegRu);

      // Приводим данные к единому формату
      const formattedResultsChek = resultsChek.domains.map((item) => ({
        site: decodePunycode(item.dname), // Декодируем домен
        result: item.error_code ? item.error_code : item.result, // Если есть error_code, используем его сообщение
      }));

      // Обновляем siteResult с новыми данными
      const updatedResults = siteResult.map((item) => {
        const chekData = formattedResultsChek.find(
          (checkItem) => checkItem.site === decodePunycode(item.site)
        );
        return chekData ? { ...item, result: chekData.result } : item;
      });

      setSiteResult(updatedResults); // Обновляем состояние
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeChek = (event) => {
    setStateChek(event.target.checked);
  };

  const handleChangeNumber = (event) => {
    setStateNumberIks(event.target.value);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    const newArray = newValue.split("\n");
    setSiteArray(newArray);
  };

  const handleClickMassClear = () => {
    setSiteArray([]);
  };

  const handleClear = () => {
    handleClickMassClear();
  };

  const handleClick = async () => {
    try {
      setIsLoading(true);

      // Отправляем данные на сервер для получения ИКС
      const results = await getIksSite(siteArray); // Ответ в формате { site: 'ererrtrtr122.ru', sqi: 0 }

      console.log("Результаты ИКС:", results);

      setSiteResult(results); // Обновляем состояние для отображения результатов ИКС
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsLoading(false);
    }
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
        isLoading={isLoading}
        handleChangeChek={handleChangeChek}
        handleChangeNumber={handleChangeNumber}
        stateChek={stateChek}
        stateNumberIks={stateNumberIks}
        handleRegistrationDomen={handleRegistrationDomen}
      />
    </>
  );
}

let mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  getIksSite,
  getDomenChekRegRu,
};

export default connect(mapStateToProps, mapDispatchToProps)(YaIksContainer);

// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import YaIks from "./YaIks";
// import { TitleComponent } from "../Function/TitleComponent";
// import { getIksSite } from "../Api/api-tools-domen";
// import { getDomenChekRegRu } from "../Api/api-reg-ru";
// import decodePunycode from "../Whois/Parts/PunycodeConverter";

// function YaIksContainer(props) {
//   const { getIksSite, getDomenChekRegRu } = props;
//   const [siteArray, setSiteArray] = useState([]);
//   const [siteResult, setSiteResult] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [stateChek, setStateChek] = useState(false);
//   const [stateNumberIks, setStateNumberIks] = useState("");

//   useEffect(() => {
//     setStateNumberIks(stateChek ? 0 : "");
//   }, [stateChek]);

//   const handleRegistrationDomen = () => {
//     //Здесь вызвать const resultsChek = await getDomenChekRegRu(domainsForRegRu);
//   };

//   const handleChangeChek = (event) => {
//     setStateChek(event.target.checked);
//   };

//   const handleChangeNumber = (event) => {
//     setStateNumberIks(event.target.value);
//   };

//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     const newArray = newValue.split("\n");
//     setSiteArray(newArray);
//   };

//   const handleClickMassClear = () => {
//     setSiteArray([]);
//   };

//   const handleClear = () => {
//     handleClickMassClear();
//   };

//   const handleClick = async () => {
//     try {
//       setIsLoading(true);

//       // Очищаем домены от лишних частей (http://, https://, www.)
//       const cleanDomain = (domain) => {
//         return domain
//           .replace(/^(https?:\/\/)?(www\.)?/, "") // Удаляем протоколы и www.
//           .split("/")[0]; // Убираем все, что после домена
//       };

//       // Преобразуем массив строк в массив объектов с ключом dname и очищаем домены
//       const domainsForRegRu = siteArray.map((domain) => ({
//         dname: cleanDomain(domain),
//       }));

//       // Отправляем данные на сервер
//       const results = await getIksSite(siteArray); // Ответ в формате { site: 'ererrtrtr122.ru', sqi: 0 }
//       const resultsChek = await getDomenChekRegRu(domainsForRegRu); // Ответ в формате { domains: [{ dname: 'ererrtrtr122.ru', result: 'Available' }] }
//       // Приводим данные к единому формату
//       const formattedResultsChek = resultsChek.domains.map((item) => ({
//         site: decodePunycode(item.dname), // Декодируем домен
//         result: item.error_code ? item.error_code : item.result, // Если есть error_code, используем его сообщение
//       }));

//       // Объединяем данные по домену
//       const combinedResults = results.map((iksData) => {
//         const decodedSite = decodePunycode(iksData.site); // Декодируем домен
//         const chekData = formattedResultsChek.find(
//           (item) => item.site === decodedSite // Сравниваем декодированные домены
//         );
//         return {
//           site: iksData.site, // Оригинальный домен (Punycode)
//           sqi: iksData.sqi, // ИКС
//           result: chekData ? chekData.result : "N/A", // Доступность домена или сообщение об ошибке
//         };
//       });

//       console.log("Результаты ИКС:", results);
//       console.log("Результаты проверки доменов:", resultsChek);
//       console.log("Объединенные результаты:", combinedResults);

//       setSiteResult(combinedResults); // Обновляем состояние
//     } catch (error) {
//       console.error("Ошибка при получении данных:", error);
//     } finally {
//       handleClear();
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <TitleComponent
//         description="Проверь Яндекс ИКС сайта до 1000 сайтов за один проход. История изменений индекса качества сайта. Полностью бесплатный сервис проверки ИКС."
//         title="Проверка Яндекс ИКС онлайн: массовый анализ индекса качества Яндекса бесплатно"
//       />
//       <YaIks
//         handleClear={handleClear}
//         getIksSite={getIksSite}
//         handleChange={handleChange}
//         siteArray={siteArray}
//         handleClick={handleClick}
//         siteResult={siteResult}
//         isLoading={isLoading}
//         handleChangeChek={handleChangeChek}
//         handleChangeNumber={handleChangeNumber}
//         stateChek={stateChek}
//         stateNumberIks={stateNumberIks}
//         handleRegistrationDomen={handleRegistrationDomen}
//       />
//     </>
//   );
// }

// let mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = {
//   getIksSite,
//   getDomenChekRegRu,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(YaIksContainer);
