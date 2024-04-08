import React, { useEffect, useState } from "react";
import s from "./ProfileUser.module.css";
import Referal from "./Referal/Referal";
import ProfileBalance from "./ProfileBalance/ProfileBalance";

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
    // Здесь вы можете отправить файл на сервер
    if (avatarFile) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      props.loadAvatarUser(formData, props.userId);
      debugger;
    }
  };

  return (
    <div className={s.blockProfilePage}>
      <div className={s.profileBlockUser}>
        <h1>Профиль</h1>
        <div className={s.avatarUser}>
          <img
            src={props.avatar}
            alt={`${props.firstName} ${props.lastName}`}
          />
          <input
            type="file"
            name="avatar"
            id="avatar"
            onChange={handleFileChange}
          />
          {avatarFile ? (
            <button className={s.btnLoadingAvatar} onClick={handleUpload}>
              Загрузить фото
            </button>
          ) : null}
        </div>
        <div className={s.nameUserBlock}>
          <span className={s.nameUser}>Имя: {props.firstName}</span>
          <span className={s.nameUser}>Фамилия: {props.lastName}</span>
          <span className={s.nameUser}>Статус пользователя: {langRole}</span>
        </div>
      </div>
      <ProfileBalance
        money={props.money}
        lvt={props.lvt}
        moneyHistory={props.moneyHistory}
      />
      <Referal
        referalQuantity={props.referalQuantity}
        lvtPresentReferal={props.lvtPresentReferal}
        email={props.email}
      />
    </div>
  );
}
