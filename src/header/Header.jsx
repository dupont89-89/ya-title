import React from "react";
import s from "./Header.module.css";
import Lvt from "./Balance/Lvt/Lvt";
import Money from "./Balance/Money/Money";
import AvatarContainer from "./Avatar/AvatarContainer";
import NotificationContainer from "./Notification/NotificationContainer";
import MainMenuHeader from "../Menu/Header/MainMenuHeader";
import { Link } from "react-router-dom";
import home from "./../img/icon/icons-home-fff.png";

export default function Header(props) {
  return (
    <header className={s.headerDekstop}>
      <div className={s.headerContainerGrid}>
        <Link to="/" className={s.homeLinkHeader}>
          <img alt="" src={home} />
        </Link>
        <AvatarContainer />
        {props.isAuthenticated ? (
          <>
            <Lvt
              lvt={props.lvt}
              bonusDayLvt={props.bonusDayLvt}
              lvtPresent={props.lvtPresent}
              totalLvt={props.totalLvt}
            />
            <Money money={props.money} />
            <MainMenuHeader />
            <NotificationContainer />
          </>
        ) : (
          <MainMenuHeader />
        )}
      </div>
    </header>
  );
}
