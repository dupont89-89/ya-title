import React, { useState } from "react";
import axios from "axios";
import s from "./Form.module.css";
import t from "./../css/Tools.module.css";
import RegionSelectSearch from "../ToolsComponent/PartsComponentTools/RegionSelectSearch";
import Loading from "../app-function/Loading";
import TitleValues from "./TitleValues";
import RepeatWords from "./RepeatWords";
import InputKey from "./InputKey";
import MessageNoAuth from "../Auth/MessageNoAuth/MessageNoAuth";
import ModalNoLvt from "../Modal/ModalNoLvt";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const serverUrl = `${config.REACT_APP_SERVER_URL}`;

export default function ApiSendYaSearch(props) {
  const [query, setQuery] = useState("");
  const [titleValues, setTitleValues] = useState(null);
  const [repeatWords, setRepeatWords] = useState(null);
  const [resultString, setResultString] = useState("");
  const [selectedCity, setSelectedCity] = useState(213);
  const [isLoading, setIsLoading] = useState(false);
  const [topFriLink, setResultWordsLink] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlPage, setUrlPage] = useState(null);

  const sumLvt = 1;

  const handleClick = async () => {
    setIsLoading(true);

    if (props.totalLvt === 0) {
      console.log("Баланс равен 0");
      setIsLoading(false);
      setShowModal(true);
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/api/tools/get-title`, {
        query,
        selectedCity,
      });
      const { topWords, topWordsLink, titleValues, repeatWords, urlPage } =
        response.data;
      debugger;
      setResultString(topWords);
      setResultWordsLink(topWordsLink);
      setTitleValues(titleValues);
      setRepeatWords(repeatWords);
      setUrlPage(urlPage);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoading(false);
      props.spendLvt(props.userId, sumLvt);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const filterUniqueWords = (words) => {
    const seen = {};
    const uniqueWords = [];

    words.forEach((word) => {
      const firstFive = word.slice(0, 9).toLowerCase();
      if (!seen[firstFive]) {
        seen[firstFive] = true;
        uniqueWords.push(word);
      }
    });

    return uniqueWords;
  };

  const handleCitySelect = (selectedOption) => {
    setSelectedCity(selectedOption.value);
  };

  const copyTextOnClick = () => {
    const h2Text = filterUniqueWords(resultString)
      .map((word, index) =>
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
      )
      .join(" ");
    navigator.clipboard.writeText(h2Text);
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  return (
    <>
      <div className={t.sectionGridSK}>
        <aside>{props.toolsSidebar}</aside>
        <section className={t.sectionTools}>
          <div className={t.sectionBlockTools}>
            <div>
              {showModal && (
                <ModalNoLvt
                  isAuthenticated={props.isAuthenticated}
                  onClose={() => setShowModal(false)}
                  totalLvt={props.totalLvt}
                  sumLvt={props.sumLvt}
                />
              )}
            </div>
            <div className={t.title}>
              <div className={t.titleTools}>
                <h1>Создай правильный Title</h1>
              </div>
              {props.isAuthenticated && (
                <div className={t.tarifBlock}>
                  <span className={t.tarifLvt}>Будет списано: 1 lvt</span>
                </div>
              )}
            </div>
            <RegionSelectSearch
              defaultRegion={selectedCity}
              onSelect={handleCitySelect}
              nameLabel="Регион продвижения:"
            />
            <InputKey
              handleChange={handleChange}
              query={query}
              handleClick={handleClick}
            />
            {!props.isAuthenticated ? <MessageNoAuth /> : null}
            {isLoading ? (
              <Loading />
            ) : (
              resultString &&
              resultString.length > 0 && (
                <div className={s.wrapperBoxTitle}>
                  <span className={s.faviconTitle}></span>
                  <div className={s.boxTitle}>
                    <h2>
                      {filterUniqueWords(resultString)
                        .map((word, index) =>
                          index === 0
                            ? word.charAt(0).toUpperCase() + word.slice(1)
                            : word
                        )
                        .join(" ")}
                    </h2>
                    <span className={s.linkTopKey}>
                      ptahini.ru›search/
                      {filterUniqueWords(topFriLink)
                        .map((word, index) =>
                          index === 0
                            ? word.charAt(0).toUpperCase() + word.slice(1)
                            : word
                        )
                        .join(" ")}
                    </span>
                    <p>
                      Это лучший тайтл для твоего SEO продвижения сайта. Приведи
                      его к читаемому виду. Добавь его в соответствующий раздел
                      мета-тегов в своей CMS.
                    </p>
                    <button
                      className={s.btnCopyTitle}
                      onClick={copyTextOnClick}
                    >
                      Копировать Title
                    </button>
                    {copySuccess && (
                      <span className={s.copyMessage}>Title скопирован!</span>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
      <TitleValues urlPage={urlPage} titleValues={titleValues} />
      <RepeatWords repeatWords={repeatWords} />
    </>
  );
}
