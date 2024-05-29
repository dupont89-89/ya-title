import React from "react";
import s from "./../Menu.module.css";
import { Link } from "react-router-dom";
import ToolsModalMenu from "../../Modal/ToolsModalMenu";

export default function MainMenuHeader(props) {
  return (
    <>
      <div className={s.menuLinkHeader}>
        <ToolsModalMenu
          nameBtnPopup="Инструменты"
          content={<MainMenuHeaderModal />}
          backgroundColor="#465ab6"
          color="#fff"
        />
        <Link className={s.link} to="/balance">
          Тарифы
        </Link>
      </div>
    </>
  );
}

function MainMenuHeaderModal(props) {
  const handleCloseModal = props.handleCloseModal;

  const handleLinkClick = () => {
    // Закрываем модальное окно при клике на ссылку
    handleCloseModal();
  };

  return (
    <nav className={s.mainMenuNav}>
      <ol>
        <li>
          {/* Добавляем обработчик клика на ссылку */}
          <Link to="/" onClick={handleLinkClick}>
            <span className={s.linkMenuTools}>Создание тайтла</span>
          </Link>
        </li>
        <li>
          <Link to="/commerce-key" onClick={handleLinkClick}>
            <span className={s.linkMenuTools}>
              Проверка на коммерциализацию запроса
            </span>
          </Link>
        </li>
      </ol>
    </nav>
  );
}
