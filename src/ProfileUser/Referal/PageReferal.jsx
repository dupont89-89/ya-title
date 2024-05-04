import React from "react";
import Referal from "./Referal";
import s from "./../ProfileUser.module.css";

export default function PageReferal(props) {
  const textLine = {
    borderBottom: "1px solid",
  };
  return (
    <div className={s.pageReferal}>
      <h1>Реферальная программа</h1>
      <p className={s.afterTitlereferal}>
        Получайте <span>15% на баланс бонусом</span> , от платежей ваших
        рефералов.
      </p>
      <div className={s.blockTextReferal}>
        <p>
          Привлекайте пользователей{" "}
          <span style={textLine}>
            размещаю ссылку в соц. сетях, на форумах или в личных сообщениях
            своим друзьям
          </span>
          . Когда пользователь перейдет по вашей ссылке и пройдет регистрацию он
          станет вашим рефералом.
        </p>
        <p>
          Мы предусмотрели, что{" "}
          <span style={textLine}>
            пользователь может зарегистрироваться не сразу
          </span>
          , а через какое то время. Поэтому если пользователь просто ознакомится
          с сервисом Ptahini, но пройдет регистрацию потом, через некоторое
          время и даже не по вашей ссылке, он все равно станет вашим рефералом.
        </p>
      </div>
      <Referal
        moneyPresentReferal={props.moneyPresentReferal}
        userId={props.userId}
        referal={props.referal}
      />
    </div>
  );
}
