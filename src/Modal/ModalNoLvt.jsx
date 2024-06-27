import React, { useLayoutEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import s from "./Modal.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import ModalSignUp from "./../Auth/SignUp/ModalSignUp";

export default function ModalNoLvt({
  onClose,
  isAuthenticated,
  totalLvt,
  sumLvt,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [modalWidth, setModalWidth] = useState("50%");

  useLayoutEffect(() => {
    // Определяем ширину модального окна в зависимости от ширины экрана
    const width = window.innerWidth;
    if (width >= 768) {
      setModalWidth("370px");
    } else {
      setModalWidth("80%");
    }
  }, []);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <Popup
      contentStyle={{
        padding: "0px",
        border: "none",
        background: "none",
        width: modalWidth,
      }}
      open={true} // Для отображения попапа сразу, когда он открывается
      onClose={onClose} // Закрываем попап при нажатии на крестик
      modal
      nested
    >
      {(close) => (
        <div className={s.modalNoLvt}>
          <div className={s.closeBtnPopup}>
            <button
              onClick={() => {
                close();
                onClose();
              }}
            >
              ✖
            </button>
          </div>
          <div className={s.contentModalNoLvt}>
            <p>Ваш баланс {totalLvt} lvt</p>
            <p>Не хватает {sumLvt} lvt</p>
            <FontAwesomeIcon size="4x" color="#000" icon={faFaceFrown} />
            {!isAuthenticated ? (
              <div className={s.registrationUserBtn}>
                <p>Дарим 20 lvt при регистрации</p>
                <ModalSignUp
                  isOpen={isPopupOpen}
                  closePopup={() => setIsPopupOpen(false)}
                />
                <Link className={s.linkAddBalance} onClick={openPopup}>
                  Регистрация
                </Link>
              </div>
            ) : (
              <Link className={s.linkAddBalance} to="/balance">
                Пополнить баланс
              </Link>
            )}
          </div>
        </div>
      )}
    </Popup>
  );
}
