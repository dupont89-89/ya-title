import React from "react";
import s from "./Header.module.css";
import Lvt from "./Balance/Lvt/Lvt";
import Money from "./Balance/Money/Money";
import AvatarContainer from "./Avatar/AvatarContainer";
import Notification from "./Notification/Notification";

export default function Header(props) {
  return (
    <header>
      <div className={s.headerContainerGrid}>
        <AvatarContainer />
        <Lvt
          lvt={props.lvt}
          bonusDayLvt={props.bonusDayLvt}
          lvtPresent={props.lvtPresent}
        />
        <Money money={props.money} />
        <Notification notifications={props.notifications} />
      </div>
    </header>
  );
}
