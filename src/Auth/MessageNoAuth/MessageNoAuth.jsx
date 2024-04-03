import React, { useState } from "react";
import s from "./MessageNoAuth.module.css";
import { Link } from "react-router-dom";
import ModalLogin from "../Login/ModalLogin";
import BalancePageLinkReg from "../../BalancePage/BalanceParts/BalancePageLinkReg";

export default function MessageNoAuth(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const link = {
    borderBotom: "1px solid",
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <div className={s.messageNoAuthBlock}>
      <p>
        Чтобы использовать сервис вам нужно{" "}
        <Link style={link} onClick={openPopup}>
          войти в аккаунт
        </Link>
        . Вы можете пройти <BalancePageLinkReg linkRehName="регистрацию" /> и
        получить <Link to="/balance">подарки</Link>.
      </p>
      <ModalLogin
        isOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
