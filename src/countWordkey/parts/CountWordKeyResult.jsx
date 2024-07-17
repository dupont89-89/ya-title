import React from "react";
import s from "./../../css/Tools.module.css";

export default function CountWordKeyResult(props) {
  const { result, csvDownloadLink, handleClear } = props;
  return (
    <>
      {Array.isArray(result) && (
        <div className={s.resultKeyBlock}>
          <div className={s.blockPad}>
            <h2>Результат проверки:</h2>
            <table className={s.resultKeyCount}>
              <thead>
                <tr>
                  <th>Ключевой запрос</th>
                  <th>Частотность</th>
                </tr>
              </thead>
              <tbody>
                {result.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <td>{item.phrase}</td>
                    <td>{item.shows}</td>
                  </tr>
                ))}
                <tr>
                  <td>...</td>
                  <td>...</td>
                </tr>
              </tbody>
            </table>
            <p>Полный результат проверки в файле. Скачайте результат.</p>
            {csvDownloadLink && (
              <>
                <div>
                  <a
                    className={s.resultMassFile}
                    href={csvDownloadLink}
                    download="results.csv"
                  >
                    Скачать файл
                  </a>
                </div>
                <div>
                  <button
                    className={s.btnNewSendMassKey}
                    onClick={() => handleClear()}
                  >
                    Новая проверка
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
