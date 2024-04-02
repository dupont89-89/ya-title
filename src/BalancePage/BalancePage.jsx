import React from "react";
import s from "./BalancePage.module.css";
import t from "./../css/Tools.module.css";
import Login from "../Auth/Login/Login";
import BalancePageLinkReg from "./BalanceParts/BalancePageLinkReg";
import PresentInfo from "./BalanceParts/PresentInfo";
import BalancePay from "./BalancePay";
import BalancePayLvt from "./BalancePayLvt";

export default function BalancePage() {
  return (
    <div>
      <div className={t.sectionGridSK}>
        <aside>
          <Login
            inputPadding="7px 5px"
            inputRadius="3px"
            inputWidth="220px"
            fontSizeTitle="22px"
            btnFormMargin="10px 9px"
            btnFormWidth="232px"
            registration={<BalancePageLinkReg />}
            presentInfo={<PresentInfo />}
          />
        </aside>
        <section className={t.sectionTools}>
          <div className={s.sectionToolsPayGrid}>
            <BalancePayLvt />
            <BalancePay />
          </div>
        </section>
      </div>
      <p>Текстовый контент</p>
    </div>
  );
}
