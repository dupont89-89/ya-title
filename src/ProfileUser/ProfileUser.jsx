import React, { useEffect, useState } from "react";
import s from "./ProfileUser.module.css";
import Referal from "./Referal/Referal";
import ProfileBalance from "./ProfileBalance/ProfileBalance";
import iconLoadAvatar from "./../img/icon/icon-image-upload-13434886.png";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

export default function ProfileUser(props) {
  const [langRole, setLangRole] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (props.role) {
      if (props.role === "admin") {
        setLangRole("Администратор");
      } else if (props.role === "partner") {
        setLangRole("Партнёр");
      } else if (props.role === "moder") {
        setLangRole("Модератор");
      } else {
        setLangRole("Пользователь");
      }
    }
  }, [props.role]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
  };

  const handleUpload = () => {
    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      props.loadAvatarUser(formData, props.userId);
      setAvatarFile(null);
    }
  };

  return (
    <div className={s.blockProfilePage}>
      <div className={s.profileBlockUser}>
        <h1>Профиль</h1>
        <div className={s.userInfoGrid}>
          <div className={s.avatarUser}>
            <img
              src={`${config.REACT_APP_SERVER_URL}${props.avatar}`}
              alt={`${props.firstName} ${props.lastName}`}
              className={s.imgAvatar}
            />
            <div className={s.input__wrapper}>
              <input
                type="file"
                name="avatar"
                id="input__file"
                onChange={handleFileChange}
                className={`${s.input} ${s.input__file}`}
              />
              <label htmlFor="input__file" className={s.input__fileButton}>
                <span className={s.input__fileIconWrapper}>
                  <img
                    className={s.input__fileIcon}
                    src={iconLoadAvatar}
                    alt="Выбрать файл"
                    width="25"
                  />
                </span>
                <span className={s.input__fileButtonText}>Сменить аватар</span>
              </label>
            </div>
            {avatarFile ? (
              <button className={s.btnLoadingAvatar} onClick={handleUpload}>
                Загрузить фото
              </button>
            ) : null}
          </div>
          <div className={s.nameUserBlock}>
            <span className={s.nameUser}>Имя: {props.firstName}</span>
            <span className={s.nameUser}>Фамилия: {props.lastName}</span>
            <span className={s.nameUser}>Статус аккаунта: {langRole}</span>
            <div className={s.editBtnPopUp}></div>
          </div>
        </div>
      </div>
      <ProfileBalance
        money={props.money}
        lvt={props.lvt}
        moneyHistory={props.moneyHistory}
      />
      <Referal
        referal={props.referal}
        moneyPresentReferal={props.moneyPresentReferal}
        userId={props.userId}
      />
    </div>
  );
}
