import React, { useState } from "react";
import t from "../css/Tools.module.css";

export default function RepeatWords({ repeatWords }) {
  const [textWords, setAddWordsState] = useState([]);
  if (!repeatWords) return null;

  const wordsWithCount = repeatWords.filter(
    ([word, count]) => count !== undefined
  );
  const wordsWithoutCount = repeatWords.map(([word, count]) => word);

  const generateDownloadFile = (wordsArray) => {
    const textToDownload = wordsArray
      .map(([word, count]) => (count !== undefined ? `${word},${count}` : word))
      .join("\n");
    const blob = new Blob([textToDownload], { type: "text/csv" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileWithoutCount = (wordsArray) => {
    const textToDownload = wordsArray.join("\n");
    const blob = new Blob([textToDownload], { type: "text/csv" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileWordSelected = (textWords) => {
    const textToDownload = textWords.join("\n");
    const blob = new Blob([textToDownload], { type: "text/txt" });
    return URL.createObjectURL(blob);
  };

  const downloadUrlSelectedWords = generateDownloadFileWordSelected(textWords);
  const downloadUrlWithCount = generateDownloadFile(wordsWithCount);
  const downloadUrlWithoutCount =
    generateDownloadFileWithoutCount(wordsWithoutCount);

  const handleClick = (textWord) => {
    setAddWordsState((prevState) => [...prevState, textWord]); // Добавление нового значения к предыдущему состоянию
    console.log(textWord);
  };

  const isWordSelected = (word) => {
    return textWords.includes(word);
  };

  return (
    <div className={t.sectionBlockWord}>
      <div className={t.wordSerhBlock}>
        <div className={t.resultSearhWord}>
          <h2>Повторяющиеся слова:</h2>
          <div className={t.wrapperWord}>
            <ul>
              {repeatWords.map(([word, count], index) => (
                <li key={index}>
                  <button
                    onClick={() => handleClick(word)}
                    className={
                      isWordSelected(word) ? t.selectedButton : t.normalButton
                    }
                  >
                    {count !== undefined ? `${word}: ${count}` : word}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <a
            className={t.downloadLink}
            href={downloadUrlWithCount}
            download="word_with_count.csv"
          >
            Скачать (с количеством)
          </a>
          <a
            className={t.downloadLink}
            href={downloadUrlWithoutCount}
            download="word_without_count.txt"
          >
            Скачать (без количества)
          </a>
          {textWords.length > 0 && (
            <a
              className={t.downloadLink}
              href={downloadUrlSelectedWords}
              download="selected-word.txt"
            >
              Скачать выбранные
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
