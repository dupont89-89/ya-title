import React, { useState } from "react";
import ModalSignUp from "../../Auth/SignUp/ModalSignUp";
import { Link } from "react-router-dom";

export default function LinkTextReg(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const link = {
    color: props.color,
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <>
      <Link style={link} onClick={openPopup}>
        {props.linkRehName}
      </Link>
      <ModalSignUp
        isOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
        display="none"
        width={props.width}
      />
    </>
  );
}
