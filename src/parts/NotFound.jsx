import React from "react";
import img from "./../img/img-page/404.png";
import s from "./Parts.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={s.blockNotFound}>
      <h1>Страница не существует</h1>
      <img src={img} alt="" />
      <Link to="/">На главную</Link>
      <p>Что-то случилось и страница не найдена.</p>
      <p>Возможно страница переехала или вы просто ошиблись</p>
    </div>
  );
}
