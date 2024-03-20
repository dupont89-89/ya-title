import React from "react";
import s from "./../../footer/Footer.module.css";

export default function PayPogertvovanie() {
  return (
    <div className={s.payYumoneyBlock}>
      <iframe
        title="Отправить пожертвование"
        src="https://yoomoney.ru/quickpay/fundraise/button?billNumber=11IK7KERTBU.240319&"
        width="330"
        height="36"
        frameBorder="0"
        allowtransparency="true"
        scrolling="no"
      ></iframe>
      ​
    </div>
  );
}
