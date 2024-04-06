import React from "react";
import s from "./AdminPanel.module.css";
import { Link } from "react-router-dom";

export default function AdminPanel(props) {
  return (
    <div className={s.blockAdmin}>
      <div className={s.blockAdminLink}>
        <Link to="admin/">Панель управления</Link>
        <Link to="admin/user/">Пользователи</Link>
      </div>
    </div>
  );
}
