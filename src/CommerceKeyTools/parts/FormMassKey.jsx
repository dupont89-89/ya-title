import React, { useEffect, useRef } from "react";
import s from "../../css/Tools.module.css";
import iconLoadFile from "../../img/icon/txt-file_9680522.png";
import iconVopros from "../../img/icon/mark_13709623.png";

export default function FormMassKey(props) {
  const {
    queryArray,
    handleChangeMass,
    result,
    csvDownloadLink,
    handleFetchKey,
    handleClickMassClear,
    handleFileChange, // Новый пропс для обработки изменения файла
  } = props;

  const fileInputRef = useRef(null); // Создаем реф для input файла

  const handleClear = () => {
    handleClickMassClear(); // Вызываем функцию очистки
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Сбрасываем значение input файла
    }
  };

  useEffect(() => {
    // Проверяем, если queryArray определен и не пустой
    if (queryArray && queryArray.length > 0 && queryArray[0].trim() === "") {
      handleClear(); // Вызываем очистку, если textarea была очищена
    }
  }, [queryArray]);

  return (
    <>
      {!result && (
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
                  accept=".txt" // Указываем что принимаем только .txt файлы
                  onChange={handleFileChange} // Обработчик изменения файла
                  className={`${s.input} ${s.input__file}`}
                  ref={fileInputRef} // Присваиваем реф input файлу
                />
                <label htmlFor="input__file" className={s.input__fileButton}>
                  <span className={s.input__fileIconWrapper}>
                    <img
                      className={s.input__fileIcon}
                      src={iconLoadFile}
                      alt="Выбрать файл"
                      width="25"
                    />
                  </span>
                  <span className={s.input__fileButtonText}>
                    {fileInputRef.current && fileInputRef.current.value
                      ? "Файл загружен"
                      : "Файл TXT"}
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
          </div>
        </>
      )}

      {Array.isArray(result) && (
        <div className={s.resultKeyBlock}>
          <div className={s.blockPad}>
            <h2>Результат проверки:</h2>
            <ul>
              {result.slice(0, 5).map((item, index) => (
                <li key={index}>
                  Запрос: {item.query} - Результат: {item.result}
                </li>
              ))}
              <li>...</li>
              <li>...</li>
            </ul>
            <p>Полный результат проверки в файле. Скачайте результат.</p>
            {csvDownloadLink && (
              <>
                <div>
                  <a
                    className={s.resultMassFile}
                    href={csvDownloadLink}
                    download="results.csv"
                  >
                    Скачайте результат
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

      {queryArray.length > 0 &&
        queryArray.some((item) => item.trim() !== "") && (
          <div className={s.btnTextAreaMass}>
            <button className={s.massStartBtn} onClick={handleFetchKey}>
              Запустить проверку
            </button>
            <button className={s.massClearBtn} onClick={handleClear}>
              Очистить
            </button>
          </div>
        )}
    </>
  );
}
