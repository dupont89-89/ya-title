import React, { useLayoutEffect, useState } from "react";
import s from "./BalancePage.module.css";
import t from "./../css/Tools.module.css";
import Login from "../Auth/Login/Login";
import BalancePageLinkReg from "./BalanceParts/BalancePageLinkReg";
import PresentInfo from "./BalanceParts/PresentInfo";
import BalancePay from "./BalancePay";
import BalancePayLvt from "./BalancePayLvt";
import BalanceAsideActiveUser from "./BalanceParts/BalanceAsideActiveUser";

export default function BalancePage(props) {
  const [addBalance, setAddBalance] = useState(0); // Изначальное значение 0

  const text = {
    backgroundColor: "#3a1148eb",
    padding: "15px",
    borderRadius: "10px",
    color: "#fff",
  };

  // Функция обратного вызова для передачи addBalance из BalancePayLvt
  const handleAddBalance = (addBalance) => {
    setAddBalance(addBalance);
  };

  const [modalWidth, setModalWidth] = useState("50%");

  useLayoutEffect(() => {
    // Определяем ширину модального окна в зависимости от ширины экрана
    const width = window.innerWidth;
    if (width >= 768) {
      setModalWidth("50%");
    } else {
      setModalWidth("80%");
    }
  }, []);

  return (
    <div>
      <div className={`${t.sectionGridSK} ${s.sectionGridSK}`}>
        <aside className={s.sidebarBalance}>
          {props.isAuthenticated ? (
            <BalanceAsideActiveUser
              email={props.email}
              money={props.money}
              firstName={props.firstName}
              lastName={props.lastName}
              avatar={props.avatar}
              totalLvt={props.totalLvt}
              referal={props.referal}
            />
          ) : (
            <Login
              inputPadding="7px 5px"
              inputRadius="3px"
              inputWidth="220px"
              fontSizeTitle="22px"
              btnFormMargin="10px 9px"
              btnFormWidth="232px"
              registration={
                <BalancePageLinkReg
                  width={modalWidth}
                  linkRehName="Регистрация"
                  color="#000"
                />
              }
              presentInfo={<PresentInfo />}
            />
          )}
        </aside>
        <section className={`${t.sectionTools} ${s.sectionTools}`}>
          <div className={s.sectionToolsPayGrid}>
            <BalancePayLvt
              onAddBalance={handleAddBalance}
              money={props.money}
              addLvtUserBalance={props.addLvtUserBalance}
              userId={props.userId}
            />
            <BalancePay
              addBalance={addBalance}
              email={props.email}
              userId={props.userId}
            />
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
