import React from "react";
import vkIcon from "./../img/icon/icon-vk.png";
import s from "./Footer.module.css";

export default function SocialContact() {
  const iconLink = {
    width: "37px",
  };
  return (
    <a href="https://vk.com/ptahini">
      <div className={s.socialContactBlock}>
        <img style={iconLink} src={vkIcon} alt="Группа Вк Ptahini" />
        <div className={s.nameLinkSocial}>
          <span>SEO PTAHINI</span>
          <span>Группа ВК</span>
        </div>
      </div>
    </a>
  );
}
