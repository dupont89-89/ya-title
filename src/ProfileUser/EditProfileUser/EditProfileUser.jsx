import s from "./../ProfileUser.module.css";
import React, { useState } from "react";

export default function EditProfileUser(props) {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleOnClick = () => {
    props.editUserData(props.userId, firstName, lastName);
  };

  return (
    <div className={s.inputEditPopUp}>
      <h3>Редактировать данные</h3>
      <div className={s.blockInputPopUp}>
        <div className={s.inputEditBlock}>
          <label htmlFor="firstName" className={s.textInput}>
            Имя
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div className={s.inputEditBlock}>
          <label htmlFor="lastName" className={s.textInput}>
            Фамилия
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
      </div>
      <div className={s.saveBtnEdit}>
        <button onClick={handleOnClick}>Сохранить</button>
      </div>
    </div>
  );
}
