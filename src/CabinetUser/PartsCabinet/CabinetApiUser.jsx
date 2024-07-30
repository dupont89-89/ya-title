import React from "react";
import s from "./../CabinetUser.module.css";

export default function CabinetApiUser(props) {
  const activePlaginWordPressTitle = true;
  return (
    <div className={s.blockApiUser}>
      <h2>Внешние подключения</h2>
      <div className={s.blockItemApiUser}>
        <h3>Подключение к плагину WordPress "Создание Title Ptahini"</h3>
        <div className={s.activePlagin}>
          {activePlaginWordPressTitle ? (
            <span className={` ${s.labelPlaginActive} ${s.labelPlagin}`}>
              Активировано
            </span>
          ) : (
            <span className={`${s.labelPlaginNoActive} ${s.labelPlagin}`}>
              Не активен
            </span>
          )}
        </div>
        <div className={s.domenActive}>
          <h4>Подключенные домены</h4>
          <span>https://example.com</span>
          <span>https://example.com</span>
          <span>https://example.com</span>
        </div>
      </div>
    </div>
  );
}
