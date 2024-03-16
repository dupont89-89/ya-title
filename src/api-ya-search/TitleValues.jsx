import { Link } from "react-router-dom";
import t from "./../css/Tools.module.css";

export default function TitleValues({ titleValues, urlPage }) {
  const urlPageArray = urlPage
    ? Array.from(urlPage, (url) => url.textContent)
    : [];

  // Функция для формирования содержимого файла для скачивания
  const generateDownloadFile = () => {
    const textToDownload = urlPageArray.join("\n");
    const blob = new Blob([textToDownload], { type: "text/plain" });
    return URL.createObjectURL(blob);
  };

  const downloadUrl = generateDownloadFile(); // Генерируем URL для скачивания файла

  return (
    <div>
      {titleValues ? (
        <div className={t.resultSearhTitle}>
          <div className={t.urlBlock}>
            <h2>Собранные Title из ТОП выдачи</h2>
            <ul>
              {titleValues.map((title, index) => (
                <li key={index}>{title}</li>
              ))}
            </ul>
          </div>
          <div className={t.urlBlock}>
            <h2>Адреса страниц</h2>
            <div>
              <ul>
                {urlPageArray.map((url, index) => (
                  <li key={index}>
                    <Link target="_blank" rel="noopener noreferrer" to={url}>
                      {url}
                    </Link>
                  </li>
                ))}
              </ul>
              {/* Ссылка для скачивания файла */}
              <a href={downloadUrl} download="urls.txt">
                Скачать
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
