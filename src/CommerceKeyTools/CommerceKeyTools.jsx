import React, { useEffect, useState } from "react";
import s from "./../css/Tools.module.css";
import { getFetchkey } from "../Api/api-tools-search";

export default function CommerceKeyTools(props) {
  const [query, setQuery] = useState(""); // Состояние для хранения значения ввода
  const [result, setResult] = useState(null);
  const [textKey, setText] = useState(null);
  const handleChange = (event) => {
    setQuery(event.target.value); // Обновляем значение состояния при изменении ввода
  };
  const textCommerce =
    "Этот ключевой запрос коммерческий (транзакционный). Вам следует продвигать его на страницах категорий товаров, предложения услуг итд.";
  const textMedia =
    "Этот ключевой запрос для мультимедиа контента. Продвигать видео, фото, аудио контент на своей странице или на страницах популярных ресурсов размещая там материалы.";
  const textNavi =
    "Это навигационный ключевой запрос. Пользователь ищет конкретный популярный ресурс. Наврятли у вас получится эффективно ипользовать его на своей странице";
  const textInfo =
    "Этот ключевой запрос информационный. Пользователь ищет ответы на свои вопросы. Под него нужно писать текстовый контент (статью).";
  const textInfoCommerc =
    "По этому ключевому запросу в выдаче находятся страницы информационные и коммерческие. Я бы все таки уточнил ключ (добавить слова: купить, смотреть, как сделать или связанные с запросом), чтобы точно понимать, какая у вас цель при продвижение данного запроса в выдаче.";
  const textNoKey =
    "Похоже что это слишком общий запрос и не удалось определить точно, к какому типу он относится. Попробуйте его уточнить, добавить слова. Возможен вариант, что мы просто не смогли определить его по нашей базе.";
  const handleFetchKey = async () => {
    try {
      const response = await getFetchkey(query);
      setResult(response.result);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };
  useEffect(() => {
    if (result) {
      if (result.includes("Коммерческий запрос")) {
        setText(textCommerce);
      } else if (result.includes("Мультимедиа запрос")) {
        setText(textMedia);
      } else if (result.includes("Навигационный запрос")) {
        setText(textNavi);
      } else if (result.includes("Информационный запрос")) {
        setText(textInfo);
      } else if (result.includes("Смешанная выдача")) {
        setText(textInfoCommerc);
      } else if (result === "Общий запрос") {
        setText(textNoKey);
      }
    } else {
      // Обработка случая, когда result является null
      setText(
        "Какая то ошибка при определение запроса. Попробуйте другой ключевой запрос. Если ошибка повторяется, напишите нам пожалуйста."
      ); // Или любое другое значение по умолчанию
    }
  }, [result]);

  return (
    <div className={s.sectionGridSK}>
      <aside>{props.toolsSidebar}</aside>
      <section className={s.commerceKey}>
        <div className={s.sectionBlockTools}>
          <div className={s.title}>
            <h1>Определение типа ключевого запроса</h1>
            <span className={s.tarifLvt}>Бесплатно</span>
          </div>
          <div className={s.blockForm}>
            <label htmlFor="key-get">Введите ключевой запрос</label>
            <div className={s.inputBlockForm}>
              <input
                placeholder="ласточки"
                type="text"
                name="key-get"
                id="key-get"
                value={query}
                onChange={handleChange}
              />
              {query ? (
                <button onClick={handleFetchKey}>Проверить запрос</button>
              ) : null}
              {result && (
                <div className={s.resultKeyBlock}>
                  <h2>Результат:</h2>
                  <div className={s.resultKeyText}>{result}</div>
                  <p>{textKey}</p>
                </div>
              )}
            </div>
          </div>
          <div className={s.keySum}>
            <p>
              Если вам требуется проверить много ключей, вы можете
              воспользоваться массовой проверкой.
            </p>
            <button>Массовая проверка</button>
          </div>
        </div>
      </section>
    </div>
  );
}
