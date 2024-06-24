import React, { useEffect, useState } from "react";
import s from "./../css/Tools.module.css";
import { getFetchkey } from "../Api/api-tools-search";
import iconLoadFile from "./../img/icon/txt-file_9680522.png";
import iconVopros from "./../img/icon/mark_13709623.png";
import Loading from "../app-function/Loading";
import ModalNoLvtContainer from "../Modal/ModalNoLvtContainer";
import Papa from "papaparse";

export default function CommerceKeyTools(props) {
  const [query, setQuery] = useState(""); // Состояние для хранения значения ввода
  const [result, setResult] = useState(null);
  const [textKey, setText] = useState(null);
  const [massKey, setMass] = useState(false);
  const [queryArray, setQueryArray] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Состояние для указания на процесс загрузки
  const [sumKeyLvt, setSumKeyLvt] = useState();
  const [sumLvt, setSumLvt] = useState();
  const [csvDownloadLink, setCsvDownloadLink] = useState("");

  const { texts } = props;

  const handleChange = (event) => {
    setQuery(event.target.value); // Обновляем значение состояния при изменении ввода
  };

  const handleChangeMass = (event) => {
    const text = event.target.value;
    const words = text.split("\n"); // Разбиваем текст на слова, используя новую строку
    setQueryArray(words); // Обновляем состояние с массивом слов
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
      setResult(response.result);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    } finally {
      setIsLoading(false); // Устанавливаем состояние загрузки в false после получения ответа
    }
  };

  useEffect(() => {
    if (result) {
      if (Array.isArray(result)) {
        // Генерация CSV файла из массива объектов
        const csv = Papa.unparse(result);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        setCsvDownloadLink(url);

        setText("Результаты обработки доступны для скачивания в CSV файле.");
      } else {
        // Обработка результата как строки
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
      }
    } else {
      // Обработка случая, когда result является null
      setText(
        "Какая-то ошибка при определении запроса. Попробуйте другой ключевой запрос. Если ошибка повторяется, напишите нам, пожалуйста."
      );
    }
  }, [result]);

  useEffect(() => {
    const filteredQueryArray = queryArray.filter((word) => word.trim() !== ""); // Фильтруем пустые строки перед вычислением
    if (filteredQueryArray.length > 0) {
      const sumLvtToolsKey = props.tarifKey * filteredQueryArray.length;
      if (props.totalLvt < sumLvtToolsKey) {
        setShowModal(true);
        const sumLvt = Math.abs(props.totalLvt - sumLvtToolsKey); // Применяем Math.abs для получения положительного значения
        setSumLvt(sumLvt.toFixed(1));
      } else {
        // Если нет необходимости показывать модальное окно, можно сбросить sumLvt
        setSumLvt(0);
      }
      setSumKeyLvt(sumLvtToolsKey.toFixed(1));
      console.log("sumKeyLvt:", sumLvtToolsKey.toFixed(1)); // Применяем toFixed для округления и обрезки десятичных разрядов
    }
  }, [queryArray, props.tarifKey, props.totalLvt]);

  return (
    <div className={s.sectionGridSK}>
      <aside>{props.toolsSidebar}</aside>
      <section className={s.commerceKey}>
        <div className={s.sectionBlockTools}>
          <div>
            {/* Ваш JSX код здесь */}
            {showModal && (
              <ModalNoLvtContainer
                isAuthenticated={props.isAuthenticated}
                onClose={() => setShowModal(false)}
                sumLvt={sumLvt}
              />
            )}
          </div>
          <div className={s.title}>
            <h1>Определение типа ключевого запроса</h1>
            <span className={s.tarifLvt}>
              {massKey ? "10 lvt / 100 запросов" : "Бесплатно"}
            </span>
          </div>
          {isLoading ? ( // Показываем "ЗАГРУЗКА" во время загрузки
            <Loading />
          ) : (
            <div className={s.blockForm}>
              {!massKey ? (
                <>
                  <label htmlFor="key-get">Введите ключевой запрос</label>
                  <div className={s.inputBlockForm}>
                    <input
                      placeholder="ласточки"
                      type="text"
                      name="key-get"
                      id="key-get"
                      value={query}
                      onChange={handleChange}
                      onKeyDown={handleKeyDown}
                    />
                    {result && !Array.isArray(result) && (
                      <div className={s.resultKeyBlock}>
                        <h2>Результат:</h2>
                        <div className={s.resultKeyText}>{result}</div>
                        <p>{textKey}</p>
                      </div>
                    )}
                  </div>
                  {query ? (
                    <button className={s.massStartBtn} onClick={handleFetchKey}>
                      Запустить проверку
                    </button>
                  ) : null}
                </>
              ) : (
                <>
                  <label htmlFor="key-get">Каждый запрос с новой строки</label>
                  <div className={s.inputBlockForm}>
                    <textarea
                      className={s.textareaCustom}
                      placeholder={`ласточки\nвороны\nколибри`}
                      name="key-get"
                      id="key-get"
                      value={queryArray.join("\n")}
                      rows="20"
                      onChange={handleChangeMass}
                    />
                    <span className={s.textAfterArea}>ИЛИ</span>
                    <div className={s.fileKey}>
                      <div className={s.input__wrapper}>
                        <input
                          type="file"
                          name="keyFile"
                          id="input__file"
                          // onChange={handleFileChange}
                          className={`${s.input} ${s.input__file}`}
                        />
                        <label
                          htmlFor="input__file"
                          className={s.input__fileButton}
                        >
                          <span className={s.input__fileIconWrapper}>
                            <img
                              className={s.input__fileIcon}
                              src={iconLoadFile}
                              alt="Выбрать файл"
                              width="25"
                            />
                          </span>
                          <span className={s.input__fileButtonText}>
                            Файл TXT
                          </span>
                        </label>
                      </div>
                      <span className={s.btnIconVopros}>
                        <img src={iconVopros} alt="" />
                        <div className={s.tooltip}>
                          Формат файла TXT (блокнот).
                          <br /> Каждый ключевой запрос с новой строки.
                        </div>
                      </span>
                    </div>
                    {Array.isArray(result) && (
                      <div className={s.resultKeyBlock}>
                        <h2>Результаты:</h2>
                        <ul>
                          {result.map((item, index) => (
                            <li key={index}>
                              Запрос: {item.query} - Результат: {item.result}
                            </li>
                          ))}
                        </ul>
                        {csvDownloadLink && (
                          <a href={csvDownloadLink} download="results.csv">
                            Скачайте результаты в формате CSV
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  {queryArray &&
                  queryArray.length > 0 &&
                  queryArray[0].trim() !== "" ? (
                    <div className={s.btnTextAreaMass}>
                      <button
                        className={s.massStartBtn}
                        onClick={handleFetchKey}
                      >
                        Запустить проверку
                      </button>
                      <button
                        className={s.massClearBtn}
                        onClick={handleClickMassClear}
                      >
                        Очистить
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          )}
          <div className={s.keySum}>
            <p>
              {massKey
                ? "Можете воспользоваться бесплатным инструментом. Он работает одинаково качественно, но не доступна массовая проверка ключевых запросов."
                : "Если вам требуется проверить много ключей, вы можете воспользоваться массовой проверкой."}
            </p>
            <button onClick={handleClickMass}>
              {massKey ? "Вернуться" : "Массовая проверка"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
