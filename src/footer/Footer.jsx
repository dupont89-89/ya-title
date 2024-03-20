import React from "react";
import PayPogertvovanie from "../pay/test-pogert/PayPogertvovanie";
import s from "./Footer.module.css";
import SocialContact from "./SocialContact";
import MailContact from "./MailContact";

export default function Footer() {
  return (
    <div className={s.footer}>
      <PayPogertvovanie />
      <SocialContact />
      <MailContact />
    </div>
  );
}
