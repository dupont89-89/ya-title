import React from "react";
import s from "../../css/Tools.module.css";

export default function FormOneKey(props) {
  const { handleChange, handleKeyDown, query, result, text, handleFetchKey } =
    props;
  return (
    <>
      <label htmlFor="key-get">Введите ключевой запрос</label>
      <div className={s.inputBlockForm}>
        <input
          placeholder="ласточки"
          type="text"
          name="key-get"
          id="key-get"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {result && !Array.isArray(result) && (
          <div className={s.resultKeyBlock}>
            <h2>Результат:</h2>
            <div className={s.resultKeyText}>{result}</div>
            <p>{text}</p>
          </div>
        )}
      </div>
      {query ? (
        <button className={s.massStartBtn} onClick={handleFetchKey}>
          Запустить проверку
        </button>
      ) : null}
    </>
  );
}
