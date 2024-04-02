import React, { useState } from "react";
import ModalSignUp from "../../Auth/SignUp/ModalSignUp";
import { Link } from "react-router-dom";

export default function BalancePageLinkReg() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const link = {
    color: "#000",
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <div>
      <Link style={link} onClick={openPopup}>
        Регистрация
      </Link>
      <ModalSignUp
        isOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
      />
    </div>
  );
}
