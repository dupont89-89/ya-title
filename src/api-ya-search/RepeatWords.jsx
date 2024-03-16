import React from "react";
import t from "../css/Tools.module.css";

export default function RepeatWords({ repeatWords }) {
  return (
    <div>
      {/* Вывод повторяющихся слов */}
      {repeatWords ? (
        <div className={t.wordSerhBlock}>
          <div className={t.resultSearhWord}>
            <h2>Повторяющиеся слова:</h2>
            <ul>
              {repeatWords.map(([word, count], index) => (
                <li key={index}>{`${word}: ${count}`}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
