import React from "react";
import ModalSignUp from "../Auth/SignUp/ModalSignUp";
import ModalLogin from "../Auth/Login/ModalLogin";
import s from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={s.headerContainer}>
        <div className={s.headerContainerGrid}>
          <ModalLogin />
          <ModalSignUp />
        </div>
      </div>
    </header>
  );
}
