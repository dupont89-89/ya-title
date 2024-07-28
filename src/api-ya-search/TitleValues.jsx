import React from "react";
import t from "./../css/Tools.module.css";

export default function TitleValues({ titleValues = [], urlPage = [] }) {
  const titleValuesDownloads = Array.isArray(titleValues) ? titleValues : [];
  const urlPageArray = Array.isArray(urlPage) ? urlPage : [];

  const generateDownloadFile = () => {
    const textToDownload = urlPageArray.join("\n");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    return URL.createObjectURL(blob);
  };

  const generateDownloadFileTitle = () => {
    const textToDownload = titleValuesDownloads.join("\n");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    return URL.createObjectURL(blob);
  };

  const downloadUrl = generateDownloadFile();
  const downloadTitle = generateDownloadFileTitle();

  return (
    <>
      {titleValuesDownloads.length > 0 && (
        <div className={t.resultSearhTitle}>
          <div className={t.urlBlock}>
            <h2>Собранные Title из ТОП выдачи</h2>
            <ul className={t.titleBorderBottom}>
              {titleValuesDownloads.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
            <a
              className={t.downloadLink}
              href={downloadTitle}
              download="title.txt"
            >
              Скачать
            </a>
          </div>
          {urlPageArray.length > 0 && (
            <div className={t.urlBlock}>
              <h2>Адреса страниц</h2>
              <div>
                <ul className={t.titleBorderBottom}>
                  {urlPageArray.map((url, index) => (
                    <li key={index}>
                      <a target="_blank" rel="noopener noreferrer" href={url}>
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  className={t.downloadLink}
                  href={downloadUrl}
                  download="urls.txt"
                >
                  Скачать
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
