import React from "react";
import AvatarContainer from "../Avatar/AvatarContainer";
import Lvt from "../Balance/Lvt/Lvt";
import Money from "../Balance/Money/Money";
import MainMenuHeader from "../../Menu/Header/MainMenuHeader";
import NotificationContainer from "../Notification/NotificationContainer";
import s from "./../Header.module.css";

export default function MobileHeader(props) {
  return (
    <header className={s.headerMobile}>
      <div className={s.headerContainer}>
        {props.isAuthenticated ? (
          <div className={s.headerContainerGridMobile}>
            <AvatarContainer />
            <Lvt
              lvt={props.lvt}
              bonusDayLvt={props.bonusDayLvt}
              lvtPresent={props.lvtPresent}
              totalLvt={props.totalLvt}
            />
            <Money money={props.money} />
            <NotificationContainer />
          </div>
        ) : (
          <div className={s.noAuthMobHeader}>
            <AvatarContainer />
            <MainMenuHeader />
          </div>
        )}
      </div>
    </header>
  );
}
