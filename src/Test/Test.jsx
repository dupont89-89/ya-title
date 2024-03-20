import React from "react";
import s from "./Test.module.css";

export default function Test() {
  return (
    <div className={s.textInfo}>
      <p>
        Инструменты работают в тестовом режиме без оплаты. Если у вас есть
        вопросы или предложения по работе инструмента, напишите мне.
      </p>
    </div>
  );
}
