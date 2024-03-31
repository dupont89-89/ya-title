import React from "react";
import s from "./MessageNoAuth.module.css";

export default function MessageNoAuth(props) {
  return (
    <div className={s.messageNoAuthBlock}>
      <p>Чтобы использовать сервис вам нужно войти в аккаунт.</p>
    </div>
  );
}
