import React from "react";
import s from "./Test.module.css";

export default function Test() {
  return (
    <div className={s.textInfo}>
      <p>
        Инструменты работают в тестовом режиме без оплаты. Если у вас есть
        вопросы или предложения по работе инструмента, обращайтесь:
      </p>
      <p className={s.mailTextInfo}>
        Почта: <a href="tel:app@ptahini.ru">app@ptahini.ru</a>
      </p>
    </div>
  );
}
