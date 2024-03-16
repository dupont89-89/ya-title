import React from "react";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.css";

export default function MenuTools() {
  return (
    <nav>
      <h2>SEO-инструменты</h2>
      <ul>
        <li>
          <Link to="/">Создание Title</Link>{" "}
          <span className={s.versionApp}>v 1.0</span>
        </li>
      </ul>
    </nav>
  );
}
