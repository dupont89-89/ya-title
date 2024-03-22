import React, { useState } from "react";
import LoginContainer from "./LoginContainer";
import s from "./styles.module.css";

export default function ModalLogin() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button className={s.linkModalHeader} onClick={openModal}>
        Войти
      </button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <LoginContainer />
          </div>
        </div>
      )}
    </div>
  );
}
