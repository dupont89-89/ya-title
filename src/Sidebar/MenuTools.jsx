import React from "react";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

export default function MenuTools(props) {
  return (
    <>
      <nav>
        <h2>SEO-инструменты</h2>
        <ul>
          <li>
            <Link to="/">Создание Title</Link>
          </li>
          <li>
            <Link to="/commerce-key">
              Определение типа ключевого запроса{" "}
              <span className={s.versionApp}></span>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={s.documentacionNav}>
        <h2 className={s.documentacioNavTitle}>{props.sidebar.nameDoc}</h2>
        <ul>
          <li>
            <span className={`${s.iconYandex} ${s.iconDocNav}`}></span>
            <a
              rel="noreferrer"
              target="_blank"
              href={props.sidebar.hrefLinkOne}
            >
              {props.sidebar.nameLinkOne}
            </a>
          </li>
          <li>
            <span className={`${s.iconGoogle} ${s.iconDocNav}`}></span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://developers.google.cn/search/docs/appearance/title-link?hl=ru"
            >
              Справка Google
            </a>
          </li>
          <li>
            <span className={`${s.iconHTML} ${s.iconDocNav}`}></span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://html.spec.whatwg.org/multipage/semantics.html#the-title-element"
            >
              HTML спецификация
            </a>
          </li>
          <li>
            <span className={`${s.iconRuTube} ${s.iconDocNav}`}></span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://rutube.ru/video/35ef2307b6a22542b6b53217abdbbc6c/?r=wd"
            >
              Видео по теме
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
