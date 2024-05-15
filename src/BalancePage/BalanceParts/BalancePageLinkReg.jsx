import React, { useState } from "react";
import ModalSignUp from "../../Auth/SignUp/ModalSignUp";

export default function BalancePageLinkReg(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const btnForm = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#03A9F4",
    color: "white",
    margin: props.btnFormMargin,
    width: props.btnFormWidth,
    border: "none",
    outline: "none",
    padding: "10px 0",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "20px",
    cursor: "pointer",
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  return (
    <>
      <button style={btnForm} onClick={openPopup}>
        {props.linkRehName}
      </button>
      <ModalSignUp
        isOpen={isPopupOpen}
        closePopup={() => setIsPopupOpen(false)}
        display="none"
        width={props.width}
      />
    </>
  );
}
