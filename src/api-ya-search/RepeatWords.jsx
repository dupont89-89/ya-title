import React from "react";
import t from "../css/Tools.module.css";

export default function RepeatWords({ repeatWords }) {
  if (!repeatWords) return null; // Проверяем, не является ли repeatWords null

  const wordsWithCount = repeatWords.filter(
    ([word, count]) => count !== undefined
  );
  const wordsWithoutCount = repeatWords.map(([word, count]) => word);

  const generateDownloadFile = (wordsArray) => {
    const textToDownload = wordsArray
      .map(([word, count]) => {
        return count !== undefined ? `${word},${count}` : word;
      })
      .join("\n");
    const blob = new Blob([textToDownload], { type: "text/csv" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileWithoutCount = (wordsArray) => {
    const textToDownload = wordsArray.join("\n");
    const blob = new Blob([textToDownload], { type: "text/csv" });
    return URL.createObjectURL(blob);
  };

  const downloadUrlWithCount = generateDownloadFile(wordsWithCount);
  const downloadUrlWithoutCount =
    generateDownloadFileWithoutCount(wordsWithoutCount);

  return (
    <div className={t.sectionBlockWord}>
      <div className={t.wordSerhBlock}>
        <div className={t.resultSearhWord}>
          <h2>Повторяющиеся слова:</h2>
          <div className={t.wrapperWord}>
            <ul>
              {repeatWords.map(([word, count], index) => (
                <li key={index}>
                  {count !== undefined ? `${word}: ${count}` : word}
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
        </div>
      </div>
    </div>
  );
}
