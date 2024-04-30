import React from "react";
import s from "./Footer.module.css";
import SocialContact from "./SocialContact";
import MailContact from "./MailContact";
import UniversalModal from "../Modal/UniversalModal";
import Politika from "../parts/Politika";
import Oferta from "../parts/Oferta";

export default function Footer() {
  return (
    <div className={s.footer}>
      <div className={s.linkPayKonf}>
        <span className={s.linkModal}>
          <UniversalModal
            nameBtnPopup="*Политика конфиденциальности"
            content={<Politika />}
            height="90vh"
            backgroundBtn="#f5b24d00"
            colorBtn="#fff"
            borderBottom="1px solid"
            paddingBtn="0"
            fontSizeBtn="13px"
            width="80%"
          />
        </span>
        <span className={s.linkModal}>
          <UniversalModal
            nameBtnPopup="*Договор офёрты"
            content={<Oferta />}
            height="90vh"
            backgroundBtn="#f5b24d00"
            colorBtn="#fff"
            borderBottom="1px solid"
            paddingBtn="0"
            fontSizeBtn="13px"
            width="80%"
          />
        </span>
      </div>
      <SocialContact />
      <MailContact />
    </div>
  );
}
