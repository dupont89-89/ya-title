import React from "react";
import t from "../css/Tools.module.css";

export default function TitleValues({ titleValues }) {
  return (
    <div>
      {titleValues ? (
        <div className={t.resultSearhTitle}>
          <h2>Собранные Title из ТОП выдачи</h2>
          <ul>
            {titleValues.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
