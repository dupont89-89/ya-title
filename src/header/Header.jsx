import React from "react";
import s from "./Header.module.css";
import Lvt from "./Balance/Lvt/Lvt";
import Money from "./Balance/Money/Money";
import AvatarContainer from "./Avatar/AvatarContainer";

export default function Header() {
  return (
    <header>
      <div className={s.headerContainerGrid}>
        <AvatarContainer />
        <Lvt />
        <Money />
      </div>
    </header>
  );
}
