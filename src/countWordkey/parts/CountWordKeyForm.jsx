import React, { useEffect } from "react";
import s from "./../../css/Tools.module.css";
import iconLoadFile from "../../img/icon/txt-file_9680522.png";
import iconVopros from "../../img/icon/mark_13709623.png";
import MessageNoAuth from "../../Auth/MessageNoAuth/MessageNoAuth";

export default function CountWordKeyForm(props) {
  const {
    queryArray,
    handleChangeQuery,
    result,
    fileInputRef,
    handleFileChange,
    handleFetchKey,
    handleClear,
    isAuthenticated,
    noLvtUser,
    exceedsBallDirect,
  } = props;

  useEffect(() => {
    // Проверяем, если queryArray определен и не пустой
    if (queryArray && queryArray.length > 0 && queryArray[0].trim() === "") {
      handleClear(); // Вызываем очистку, если textarea была очищена
    }
  }, [queryArray, handleClear]);

  return (
    <>
      {!result && (
        <>
          <div className={s.inputBlockForm}>
            <label className={s.labelTextArea}>
              Каждый запрос с новой строки
            </label>
            <textarea
              className={s.textareaCustom}
              placeholder={`журавль\nворобей\nаист`}
              name="key-get"
              id="key-get"
              value={queryArray.join("\n")}
              rows="20"
              onChange={handleChangeQuery}
              ref={fileInputRef}
            />
          </div>
          <div className={s.btnTextAreaMass}>
            {queryArray.length > 0 &&
              queryArray.some((item) => item.trim() !== "") && (
                <>
                  {noLvtUser || exceedsBallDirect ? (
                    <span className={s.noLvtText}>
                      {noLvtUser && "Не хватает баланса Lvt"}
                      {exceedsBallDirect && " Не хватает лимита на день"}
                    </span>
                  ) : (
                    <button className={s.massStartBtn} onClick={handleFetchKey}>
                      Запустить проверку
                    </button>
                  )}
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
                  accept=".txt"
                  onChange={handleFileChange}
                  className={`${s.input} ${s.input__file}`}
                  ref={fileInputRef}
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
                      : "Загрузка файлом"}
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
      {!isAuthenticated ? <MessageNoAuth /> : null}
    </>
  );
}
