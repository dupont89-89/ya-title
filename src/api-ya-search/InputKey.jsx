import React from "react";
import s from "./Form.module.css";

export default function InputKey({ handleChange, query, handleClick }) {
  return (
    <div>
      <div className={s.blockForm}>
        <label htmlFor="key-get">Введите ключевой запрос</label>
        <div className={s.inputBlockForm}>
          <input
            placeholder="купить птичье молоко оптом"
            type="text"
            name="key-get"
            id="key-get"
            value={query}
            onChange={handleChange}
          />
          {query ? <button onClick={handleClick}>Создать тайтл</button> : null}
        </div>
      </div>
    </div>
  );
}
