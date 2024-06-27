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
            <span className={s.icon}>
              <img
                src={props.sidebar.iconLinkOne}
                alt={props.sidebar.nameLinkOne}
              />
            </span>
            <a
              rel="noreferrer"
              target="_blank"
              href={props.sidebar.hrefLinkOne}
            >
              {props.sidebar.nameLinkOne}
            </a>
          </li>
          <li>
            <span className={s.icon}>
              <img
                src={props.sidebar.iconLinkTwo}
                alt={props.sidebar.nameLinkTwo}
              />
            </span>
            <a
              rel="noreferrer"
              target="_blank"
              href={props.sidebar.hrefLinkTwo}
            >
              {props.sidebar.nameLinkTwo}
            </a>
          </li>
          <li>
            <span className={s.icon}>
              <img
                src={props.sidebar.iconLinkTri}
                alt={props.sidebar.nameLinkTri}
              />
            </span>
            <a
              rel="noreferrer"
              target="_blank"
              href={props.sidebar.hrefLinkTri}
            >
              {props.sidebar.nameLinkTri}
            </a>
          </li>
          <li>
            <span className={s.icon}>
              <img
                src={props.sidebar.iconLinkFo}
                alt={props.sidebar.nameLinkFo}
              />
            </span>
            <a rel="noreferrer" target="_blank" href={props.sidebar.hrefLinkFo}>
              {props.sidebar.nameLinkFo}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
