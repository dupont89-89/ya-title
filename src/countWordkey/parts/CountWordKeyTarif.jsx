import React from "react";
import s from "./../../css/Tools.module.css";

export default function CountWordKeyTarif(props) {
  const { lvtUserSpend, frontTarif, ballDirect } = props;
  return (
    <div className={s.tarifBlock}>
      <span className={s.tarifLvt}>{frontTarif}</span>
      <span className={s.spendUserFront}>К списанию: {lvtUserSpend} Lvt</span>
      <span className={s.ballDirect}>Лимит: {ballDirect} ключей</span>
    </div>
  );
}
