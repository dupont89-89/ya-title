import React from "react";
import AvatarContainer from "../Avatar/AvatarContainer";
import Lvt from "../Balance/Lvt/Lvt";
import Money from "../Balance/Money/Money";
import NotificationContainer from "../Notification/NotificationContainer";
import s from "./../Header.module.css";
import { Link } from "react-router-dom";
import home from "./../../img/icon/icons-home-fff.png";

export default function MobileHeader(props) {
  return (
    <header className={s.headerMobile}>
      <div className={s.headerContainer}>
        {props.isAuthenticated ? (
          <div className={s.headerContainerGridMobile}>
            <Link to="/" className={s.homeLinkHeader}>
              <img alt="" src={home} />
            </Link>
            <AvatarContainer />
            <div className={s.balanceMobileHeader}>
              <Lvt
                lvt={props.lvt}
                bonusDayLvt={props.bonusDayLvt}
                lvtPresent={props.lvtPresent}
                totalLvt={props.totalLvt}
              />
              <Money money={props.money} />
            </div>
            <NotificationContainer />
          </div>
        ) : (
          <div className={s.noAuthMobHeader}>
            <AvatarContainer />
            <Link to="/" className={s.homeLinkHeader}>
              <img alt="" src={home} />
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
