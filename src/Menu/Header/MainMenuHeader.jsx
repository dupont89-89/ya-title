import React from "react";
import s from "./../Menu.module.css";
import { Link } from "react-router-dom";
import ToolsModalMenu from "../../Modal/ToolsModalMenu";

export default function MainMenuHeader(props) {
  return (
    <div className={s.menuLinkHeader}>
      <ToolsModalMenu
        nameBtnPopup="Инструменты"
        content={<MainMenuHeaderModal />}
      />
      <Link className={s.link} to="/balance">
        Тарифы
      </Link>
    </div>
  );
}

function MainMenuHeaderModal(props) {
  return (
    <nav className={s.mainMenuNav}>
      <ol>
        <li>
          <Link to="/">
            <span className={s.linkMenuTools}>Создание тайтла</span>
          </Link>
        </li>
      </ol>
    </nav>
  );
}
