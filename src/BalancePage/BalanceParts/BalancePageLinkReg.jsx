import React, { useState } from "react";
import ModalSignUp from "../../Auth/SignUp/ModalSignUp";

export default function BalancePageLinkReg(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const btnForm = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : "#009688",
    color: "white",
    margin: props.btnFormMargin,
    width: props.btnFormWidth ? props.btnFormWidth : "200px",
    border: "none",
    outline: "none",
    padding: "10px 20px",
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
