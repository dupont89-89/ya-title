import avatarNoUser from "./../../img/icon/anonymous.png";
import { Link } from "react-router-dom";
import s from "./Avatar.module.css";
import ModalLogin from "../../Auth/Login/ModalLogin";
import ModalSignUp from "../../Auth/SignUp/ModalSignUp";
import MenuAuthUser from "../../Menu/Header/MenuAuthUser";
import { useLayoutEffect, useState } from "react";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./../../config.dev");
} else {
  config = require("./../../config.prod");
}

export default function Avatar(props) {
  const [modalInputWidth, setModalInputWidth] = useState(null);
  const [modalBlockFormPadding, setModalBlockFormPadding] = useState(null);
  const [modalFontSizeTitle, setModalFontSizeTitle] = useState(null);

  useLayoutEffect(() => {
    // Определяем ширину модального окна в зависимости от ширины экрана
    const width = window.innerWidth;
    if (width >= 768) {
      setModalInputWidth("370px");
      setModalBlockFormPadding("70px");
      setModalFontSizeTitle("40px");
    } else {
      setModalInputWidth("100%");
      setModalBlockFormPadding("10px");
      setModalFontSizeTitle("25px");
    }
  }, []);
  return (
    <>
      <div className={s.blockUserAvatar}>
        <Link
          title={
            props.isAuthenticated
              ? `${props.firstName} ${props.lastName}`
              : "Не авторизован"
          }
          className={s.linkAvatarHeader}
          to="#"
        >
          {props.isAuthenticated ? (
            <img
              src={`${config.REACT_APP_SERVER_URL}${props.avatar}`}
              alt="Аватарка пользователя"
            />
          ) : (
            <>
              <div className={s.blockNoAuthHeader}>
                <img
                  src={avatarNoUser}
                  alt="Аватарка пользователя без регистрации"
                />
              </div>
            </>
          )}
        </Link>
        {props.isAuthenticated ? (
          <div className={s.menuAuth}>
            <MenuAuthUser
              firstName={props.firstName}
              lastName={props.lastName}
              notifications={props.notifications}
              referal={props.referal}
              present={props.present}
              lvt={props.lvt}
              email={props.email}
              onLogout={props.handleLogout}
              money={props.money}
              bonusDayLvt={props.bonusDayLvt}
            />
          </div>
        ) : (
          <div className={s.menuAuth}>
            <ModalLogin
              inputWidth={modalInputWidth}
              blockFormPadding={modalBlockFormPadding}
              fontSizeTitle={modalFontSizeTitle}
              nameBtnPopupLogin={"Войти в свой профиль"}
            />
            <hr className={s.menuAuthDivider} />
            <ModalSignUp
              inputWidth={modalInputWidth}
              blockFormPadding={modalBlockFormPadding}
              fontSizeTitle={modalFontSizeTitle}
              display="block"
              nameBtnPopup={"Создать пользователя"}
            />
          </div>
        )}
      </div>
      {props.isAuthenticated ? null : (
        <span className={s.textAuthHeader}>Войти/Создать аккаунт</span>
      )}
    </>
  );
}
