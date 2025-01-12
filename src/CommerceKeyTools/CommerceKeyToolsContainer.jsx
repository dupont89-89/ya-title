import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CommerceKeyTools from "./CommerceKeyTools";
import { getFetchkey } from "../Api/api-tools-search";
import * as XLSX from "xlsx";
import { spendLvt } from "../Api/api-lvt";
import { loadFileUserTools } from "../Api/api-tools";
import { TitleComponent } from "../Function/TitleComponent";

function CommerceKeyToolsContainer(props) {
  const [query, setQuery] = useState([]);
  const [queryArray, setQueryArray] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [sumKeyLvt, setSumKeyLvt] = useState(0);
  const [sumLvt, setSumLvt] = useState(0);
  const [csvDownloadLink, setCsvDownloadLink] = useState("");
  const [massKey, setMass] = useState(false);
  const [lvtUserSpend, setLvtUserSpend] = useState(0);

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

  const handleChange = (event) => {
    setQuery(event.target.value); // Обновляем значение состояния при изменении ввода
  };

  const handleChangeMass = (event) => {
    const text = event.target.value;
    const words = text.split("\n"); // Разбиваем текст на строки
    setQueryArray(words); // Обновляем состояние с массивом строк
    console.log("handleChangeMass:", words);
  };

  const handleClickMass = () => {
    setMass((prevMass) => !prevMass);
    setResult(null);
    setQuery("");
    setQueryArray([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFetchKey();
    }
  };

  const handleClickMassClear = () => {
    setQueryArray([]);
    setResult(null);
  };

  const handleFetchKey = async () => {
    try {
      setIsLoading(true); // Устанавливаем состояние загрузки в true при отправке запроса

      if (props.totalLvt < sumKeyLvt) {
        console.log("Баланс равен 0");
        setIsLoading(false); // Если баланс равен 0, не отправляем запрос и завершаем выполнение функции
        setShowModal(true); // Устанавливаем showModal в true, чтобы показать модальное окно
        return; // Возвращаемся из функции
      }

      const response = query
        ? await getFetchkey(query)
        : await getFetchkey(queryArray);
      setResult(response);
      debugger;
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      props.spendLvt(props.userId, lvtUserSpend);
      setQueryArray([]);
      setIsLoading(false); // Устанавливаем состояние загрузки в false после получения ответа
    }
  };

  const handleFileChange = (event) => {
    setQueryArray([]);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const words = text.split("\n").filter((word) => word.trim() !== "");
      setQueryArray(words);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (result) {
      if (Array.isArray(result)) {
        // Если result — массив с одним объектом
        if (result.length === 1) {
          const singleResult = result[0].result; // Извлекаем result из объекта
          if (singleResult.includes("Коммерческий запрос")) {
            setText(texts.textCommerce);
          } else if (singleResult.includes("Мультимедиа запрос")) {
            setText(texts.textMedia);
          } else if (singleResult.includes("Навигационный запрос")) {
            setText(texts.textNavi);
          } else if (singleResult.includes("Информационный запрос")) {
            setText(texts.textInfo);
          } else if (singleResult.includes("Смешанная выдача")) {
            setText(texts.textInfoCommerc);
          } else if (singleResult === "Общий запрос") {
            setText(texts.textNoKey);
          }
        } else if (result.length > 1) {
          // Если result — массив с несколькими объектами
          if (result.length > 2) {
            // Создаем файл, если в массиве больше 2 строк
            const data = result.map((item) => [item.query, item.result]);
            data.unshift(["Ключевой запрос", "Тип запроса"]);

            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Результаты");

            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const blob = new Blob([wbout], {
              type: "application/octet-stream",
            });
            const url = URL.createObjectURL(blob);
            setCsvDownloadLink(url);

            const formData = new FormData();
            formData.append("toolFile", blob, "result.xlsx");
            props.loadFileUserTools(formData, props.userId, "tip-key");

            setText(
              "Результаты обработки доступны для скачивания в Excel файле."
            );
          } else {
            // Если в массиве 2 или меньше строк, отображаем результаты в текстовом виде
            setText(
              result.map((item) => `${item.query}: ${item.result}`).join("\n")
            );
          }
        }
      } else if (typeof result === "string") {
        // Обработка результата как строки (для обратной совместимости)
        if (result.includes("Коммерческий запрос")) {
          setText(texts.textCommerce);
        } else if (result.includes("Мультимедиа запрос")) {
          setText(texts.textMedia);
        } else if (result.includes("Навигационный запрос")) {
          setText(texts.textNavi);
        } else if (result.includes("Информационный запрос")) {
          setText(texts.textInfo);
        } else if (result.includes("Смешанная выдача")) {
          setText(texts.textInfoCommerc);
        } else if (result === "Общий запрос") {
          setText(texts.textNoKey);
        }
      } else {
        setText(
          "Какая-то ошибка при определении запроса. Попробуйте другой ключевой запрос. Если ошибка повторяется, напишите нам, пожалуйста."
        );
      }
    }
  }, [result]);

  useEffect(() => {
    const filteredQueryArray = queryArray.filter((word) => word.trim() !== ""); // Фильтруем пустые строки перед вычислением
    if (filteredQueryArray.length > 0) {
      const sumLvtToolsKey = tarifKey * filteredQueryArray.length;
      setLvtUserSpend(sumLvtToolsKey.toFixed(1));
      if (props.totalLvt < sumLvtToolsKey) {
        setShowModal(true);
        const sumLvt = Math.abs(props.totalLvt - sumLvtToolsKey); // Применяем Math.abs для получения положительного значения
        setSumLvt(sumLvt.toFixed(1));
      } else {
        setShowModal(false); // Закрываем модальное окно, если больше нет необходимости
        setSumLvt(0);
      }
      setSumKeyLvt(sumLvtToolsKey.toFixed(1));
      console.log("sumKeyLvt:", sumLvtToolsKey.toFixed(1)); // Применяем toFixed для округления и обрезки десятичных разрядов
    } else {
      // Обнуляем состояния, когда массив пуст
      setLvtUserSpend(0);
      setSumLvt(0);
      setSumKeyLvt(0);
      setShowModal(false);
    }
  }, [queryArray, props.totalLvt]);

  return (
    <>
      <TitleComponent
        description="Определяйте бесплатно тип поискового запроса. Сервис для SEO продвижения сайта. Определяет запросы как: коммерческий, информационный, навигационный, мультимедиа и общий."
        title="Проверка запросов, определение коммерческий или информационный — seo сервис продвижения сайта"
      />
      <CommerceKeyTools
        userId={props.userId}
        totalLvt={props.totalLvt}
        isAuthenticated={props.isAuthenticated}
        tarifKey={tarifKey}
        toolsSidebar={props.toolsSidebar}
        handleChange={handleChange}
        handleChangeMass={handleChangeMass}
        handleClickMass={handleClickMass}
        handleKeyDown={handleKeyDown}
        handleClickMassClear={handleClickMassClear}
        handleFetchKey={handleFetchKey}
        setShowModal={setShowModal}
        query={query}
        queryArray={queryArray}
        result={result}
        isLoading={isLoading}
        showModal={showModal}
        text={text}
        sumKeyLvt={sumKeyLvt}
        handleFileChange={handleFileChange}
        sumLvt={sumLvt}
        csvDownloadLink={csvDownloadLink}
        massKey={massKey}
        lvtUserSpend={lvtUserSpend}
        tools={props.tools}
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
    tools: state.user.dataUser.tools,
  };
};

const mapDispatchToProps = {
  spendLvt,
  loadFileUserTools,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommerceKeyToolsContainer);
