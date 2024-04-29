import React from "react";
import s from "./Footer.module.css";
import SocialContact from "./SocialContact";
import MailContact from "./MailContact";

export default function Footer() {
  return (
    <div className={s.footer}>
      <SocialContact />
      <MailContact />
    </div>
  );
}
