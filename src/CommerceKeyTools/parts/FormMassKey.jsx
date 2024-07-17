import React, { useEffect, useRef } from "react";
import s from "../../css/Tools.module.css";
import iconLoadFile from "../../img/icon/txt-file_9680522.png";
import iconVopros from "../../img/icon/mark_13709623.png";
import HistoryToolsUser from "../../ToolsComponent/PartsComponentTools/HistoryToolsUser";

export default function FormMassKey(props) {
  const {
    queryArray,
    handleChangeMass,
    result,
    csvDownloadLink,
    handleFetchKey,
    handleClickMassClear,
    handleFileChange,
    tools, // Новый пропс для обработки изменения файла
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
          <div className={s.inputBlockForm}>
            <div className={s.blockTeaxtArea}>
              <label className={s.labelTextArea} htmlFor="key-get">
                Каждый запрос с новой строки
              </label>
              <textarea
                className={s.textareaCustom}
                placeholder={`ласточки\nвороны\nколибри`}
                name="key-get"
                id="key-get"
                value={queryArray.join("\n")}
                rows="20"
                onChange={handleChangeMass}
              />
            </div>
          </div>
        </>
      )}
      <div className={s.btnTextAreaMass}>
        {queryArray.length > 0 &&
          queryArray.some((item) => item.trim() !== "") && (
            <>
              <button className={s.massStartBtn} onClick={handleFetchKey}>
                Запустить проверку
              </button>
              <button className={s.massClearBtn} onClick={handleClear}>
                Очистить
              </button>
            </>
          )}
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
                  : "Загрузить файл"}
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

      {Array.isArray(result) && (
        <div className={s.resultKeyBlock}>
          <div className={s.blockPad}>
            <h2>Результат проверки:</h2>
            <table>
              <tbody>
                {result.slice(0, 5).map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span className={s.resultTextKey}>
                        Запрос: {item.query}
                      </span>
                    </td>
                    <td>
                      <span
                        className={s.resultKeyTextMass}
                        dangerouslySetInnerHTML={{ __html: item.result }}
                      />
                    </td>
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
      <HistoryToolsUser
        tools={tools}
        nameTools="tip-key"
        titleTools="История результатов проверки коммерциализации запроса"
      />
    </>
  );
}
