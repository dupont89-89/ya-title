import React, { useState } from "react";
import Signup from "./SignUp";
import s from "./styles.module.css";

export default function ModalSignUp() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className={s.linkModalHeaderSignUp} onClick={openModal}>
        Регистрация
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <Signup />
          </div>
        </div>
      )}
    </div>
  );
}
