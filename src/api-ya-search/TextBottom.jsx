import React from "react";
import t from "../css/Tools.module.css";

export default function TextBottom() {
  return (
    <div>
      <div className={t.textBottomTools}>
        <p>
          <b>Ptahini</b> разработал{" "}
          <strong>инструмент для создания “правильного тайтла”</strong>, который
          помогает SEO-специалистам <strong>автоматически</strong> составлять
          заголовки Title <strong>на основе поисковой выдачи</strong>. Этот
          инструмент подбирает самые релевантные, связанные и тематические LSI
          слова и фразы, что позволяет создать заголовок, максимально
          соответствующий поисковым запросам пользователей.
        </p>
      </div>
    </div>
  );
}
