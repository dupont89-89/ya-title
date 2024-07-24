import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../img/logo/PTAHINI-nav.png";
import MenuTools from "./MenuTools";
import s from "./Sidebar.module.css";
import iconMenuOpen from "./../img/icon/icon-vertical-menu.png";
import iconMenuClose from "./../img/icon/icon-vertical-close.png";

export default function ToolsSidebar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarStyle = {
    transform: isOpen ? "translateX(0)" : "translateY(-900px)",
    transition: isOpen ? "transform 0.3s ease" : "transform 0s ease",
    position: isOpen ? "relative" : "absolute",
    width: "100%",
  };

  const logoStyle = {
    width: "230px",
  };

  const logoStyleMobile = {
    width: "130px",
  };

  const iconStyleOpenMenu = {
    width: "24px", // Укажите требуемые размеры и другие стили
    height: "24px",
    // Добавьте другие стили при необходимости
  };

  return (
    <div className={s.sidebarContainer}>
      {/* Для десктопа */}
      <div className={`${s.sidebar} ${s.desktop}`}>
        <div>
          <Link to="/">
            <img style={logoStyle} src={logo} alt="ptahini" />
          </Link>
        </div>
        <MenuTools sidebar={props.sidebar} />
      </div>

      {/* Для мобильных устройств */}
      <div
        className={`${s.sidebar} ${s.mobile} ${isOpen ? s.open : ""}`}
        style={sidebarStyle}
      >
        <div className={s.mobileCloseMenu}>
          {isOpen ? (
            <div className={s.blockIconClose}>
              <img
                onClick={toggleSidebar}
                className={`${s.sidebar} ${s.mobile} ${s.sidebarToggle}`}
                alt=""
                style={iconStyleOpenMenu}
                src={iconMenuClose}
              />
            </div>
          ) : null}
          <MenuTools sidebar={props.sidebar} />
        </div>
      </div>

      {/* Кнопка для открытия/закрытия сайдбара на мобильных */}
      <div className={s.mobileHeader}>
        {!isOpen && (
          <div className={`${s.sidebar} ${s.mobile}`}>
            <Link to="/">
              <img style={logoStyleMobile} src={logo} alt="ptahini" />
            </Link>
          </div>
        )}

        {isOpen ? null : (
          <div>
            <img
              onClick={toggleSidebar}
              className={`${s.sidebar} ${s.mobile} ${s.sidebarToggle}`}
              alt=""
              style={iconStyleOpenMenu}
              src={iconMenuOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}
