import React from "react";
import s from "./BalancePage.module.css";
import t from "./../css/Tools.module.css";
import Login from "../Auth/Login/Login";
import BalancePageLinkReg from "./BalanceParts/BalancePageLinkReg";
import PresentInfo from "./BalanceParts/PresentInfo";
import BalancePay from "./BalancePay";
import BalancePayLvt from "./BalancePayLvt";
import RobokassaPaymentForm from "../pay/Robokassa/RobokassaPaymentForm";

export default function BalancePage(props) {
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
            <BalancePay />
          </div>
        </section>
      </div>
      <p>
        <RobokassaPaymentForm />
      </p>
    </div>
  );
}
