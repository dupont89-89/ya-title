import React, { useState } from "react";
import avatarNoUser from "./../../img/icon/anonymous.png";
import { Link } from "react-router-dom";
import s from "./Avatar.module.css";
import ModalLogin from "../../Auth/Login/ModalLogin";
import ModalSignUp from "../../Auth/SignUp/ModalSignUp";
import MenuAuthUser from "../../Menu/Header/MenuAuthUser";

export default function Avatar(props) {
  return (
    <div className={s.blockUserAvatar}>
      <Link className={s.linkAvatarHeader} to="#user">
        {props.isAuthenticated ? (
          <img src={props.avatar} alt="Аватарка пользователя без фото" />
        ) : (
          <img src={avatarNoUser} alt="Аватарка пользователя без регистрации" />
        )}
      </Link>
      {props.isAuthenticated ? (
        <div className={s.menuAuth}>
          <MenuAuthUser
            notifications={props.notifications}
            referalQuantity={props.referalQuantity}
            lvtPresent={props.lvtPresent}
            lvt={props.lvt}
            email={props.email}
            onLogout={props.handleLogout}
            money={props.money}
            bonusDayLvt={props.bonusDayLvt}
          />
        </div>
      ) : (
        <div className={s.menuAuth}>
          <ModalLogin nameBtnPopupLogin={"Войти в свой профиль"} />
          <hr className={s.menuAuthDivider} />
          <ModalSignUp nameBtnPopup={"Создать пользователя"} />
        </div>
      )}
    </div>
  );
}
