import React from "react";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

export default function MenuTools() {
  return (
    <>
      <nav>
        <h2>SEO-инструменты</h2>
        <ul>
          <li>
            <Link to="/">Создание Title</Link>{" "}
            <span className={s.versionApp}>v 1.0</span>
          </li>
        </ul>
      </nav>
      <nav className={s.documentacionNav}>
        <h2 className={s.documentacioNavTitle}>Документация по Title</h2>
        <ul>
          <li>
            <span className={`${s.iconYandex} ${s.iconDocNav}`}></span>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://yandex.ru/support/webmaster/search-results/title.html"
            >
              Справка Яндекса
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
