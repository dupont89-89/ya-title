import React from "react";
import s from "./BalancePage.module.css";
import t from "./../css/Tools.module.css";
import Login from "../Auth/Login/Login";
import BalancePageLinkReg from "./BalanceParts/BalancePageLinkReg";
import PresentInfo from "./BalanceParts/PresentInfo";
import BalancePay from "./BalancePay";
import BalancePayLvt from "./BalancePayLvt";

export default function BalancePage(props) {
  const text = {
    backgroundColor: "#3a1148eb",
    padding: "15px",
    borderRadius: "10px",
    color: "#fff",
  };
  return (
    <div>
      <div className={t.sectionGridSK}>
        <aside className={s.sidebarBalance}>
          <Login
            inputPadding="7px 5px"
            inputRadius="3px"
            inputWidth="220px"
            fontSizeTitle="22px"
            btnFormMargin="10px 9px"
            btnFormWidth="232px"
            registration={
              <BalancePageLinkReg linkRehName="Регистрация" color="#000" />
            }
            presentInfo={<PresentInfo />}
          />
        </aside>
        <section className={t.sectionTools}>
          <div className={s.sectionToolsPayGrid}>
            <BalancePayLvt money={props.money} />
            <BalancePay email={props.email} userId={props.userId} />
          </div>
        </section>
      </div>
      <p style={text}>
        Выбирайте выгодную покупку Lvt и пополняйте баланс на нужную сумму.
        Деньги зачисляются моментально и вы сразу же сможете обменять их на Lvt
        и использовать инструменты.
      </p>
    </div>
  );
}
