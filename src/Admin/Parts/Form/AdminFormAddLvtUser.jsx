import React, { useState } from "react";
import s from "./../../Admin.module.css";

export default function AdminFormAddLvtUser(props) {
  const [selectedLvt, setSelectedLvt] = useState("");
  const [infoServer, setInfoServer] = useState("");

  const handleOnClick = () => {
    props
      .addLvtAdminUser(props.userId, selectedLvt)
      .then((data) => {
        // Обработка успешного ответа от сервера
        console.log("Данные от сервера:", data);
        setInfoServer(data);
        // Здесь вы можете обновить состояние компонента или выполнить другие действия с полученными данными
      })
      .catch((error) => {
        // Обработка ошибки
        console.error("Ошибка при отправке запроса:", error);
        setInfoServer(error);
      });
  };

  const handleInputChange = (e) => {
    setSelectedLvt(e.target.value);
  };

  return (
    <div className={s.inputAddLvtBlock}>
      <div className={s.inputAddLvt}>
        <label htmlFor="lvt">Количество Lvt</label>
        <input
          onChange={handleInputChange}
          id="lvt"
          name="lvt"
          value={selectedLvt}
          type="number"
        />
      </div>
      <div className={s.btnAddBalanceLvt}>
        <button onClick={handleOnClick} type="button">
          Зачислить
        </button>
      </div>
      <p className={s.infoTextServer}>{infoServer}</p>
    </div>
  );
}
