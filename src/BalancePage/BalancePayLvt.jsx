import React, { useEffect, useState } from "react";
import s from "./BalancePage.module.css";
import iconPodarok from "./../img/icon/icon-giftbox.png";
import WhatLvt from "./BalanceParts/WhatLvt";

export default function BalancePayLvt(props) {
  const [selectedValue, setSelectedValue] = useState("4990");
  const [selectedLvt, setSelectedLvt] = useState("1600");
  const [selectedLvtBonus, setSelectedLvtBonus] = useState("600 lvt в подарок");
  const [selectedLvtText, setSelectedLvtText] = useState("1000 lvt");
  const [selectedFaq, setSelectedFaq] = useState(true);

  const options = [
    {
      id: "1",
      value: "100",
      lvt: "10",
      text: "10 lvt",
      textSale: "+ 0%",
      price1: "10 р.",
      price2: "100 руб",
    },
    {
      id: "2",
      value: "499",
      lvt: "50",
      text: "50 lvt",
      textSale: "+ 0%",
      price1: "9.98 р.",
      price2: "499 руб",
    },
    {
      id: "3",
      value: "790",
      lvt: "100",
      text: "100 lvt",
      textSale: "+ 0%",
      price1: "7.9 р.",
      price2: "790 руб",
    },
    {
      id: "4",
      value: "1390",
      lvt: "200",
      text: "200 lvt",
      textSale: "+ 0%",
      price1: "6.95 р.",
      price2: "1390 руб",
    },
    {
      id: "5",
      value: "1990",
      lvt: "360",
      lvtBonus: "60 lvt в подарок",
      text: "300 lvt",
      textSale: "+ 20%",
      price1: "5.53 р.",
      price2: "1 990 руб",
    },
    {
      id: "6",
      value: "2990",
      lvt: "700",
      lvtBonus: "200 lvt в подарок",
      text: "500 lvt",
      textSale: "+ 40%",
      price1: "4.27 р.",
      price2: "2 990 руб",
    },
    {
      id: "7",
      value: "4990",
      lvtBonus: "600 lvt в подарок",
      lvt: "1600",
      text: "1000 lvt",
      textSale: "+ 60%",
      price1: "3.12 р.",
      price2: "4 990 руб",
    },
    {
      id: "8",
      value: "9990",
      lvt: "6000",
      lvtBonus: "3 000 lvt в подарок",
      text: "3000 lvt",
      textSale: "+ 100%",
      price1: "1.67 р.",
      price2: "9 990 руб",
    },
    {
      id: "9",
      value: "19990",
      lvt: "17500",
      lvtBonus: "10 500 lvt в подарок",
      text: "7000 lvt",
      textSale: "+ 150%",
      price1: "1.14 р.",
      price2: "19 990 руб",
    },
    {
      id: "10",
      value: "29990",
      lvt: "90000",
      lvtBonus: "60 000 lvt в подарок",
      text: "30000 lvt",
      textSale: "+ 200%",
      price1: "0.33 р.",
      price2: "29 990 руб",
    },
  ];
  const handleInputChange = (event, lvt, lvtBonus, text) => {
    setSelectedValue(event.target.value);
    setSelectedLvt(lvt);
    setSelectedLvtBonus(lvtBonus);
    setSelectedLvtText(text);
  };

  const btnLvtFaq = {
    backgroundColor: "rgb(71, 93, 178)",
    color: "#fff",
    border: selectedFaq ? null : "1px solid #000",
  };

  const btnLvtPay = {
    backgroundColor: "#c32e2e",
    color: "#fff",
    border: selectedFaq ? "1px solid #000" : null,
  };

  const addBalanse = parseInt(selectedValue) - parseInt(props.money);

  useEffect(() => {
    handleAddBalance(addBalanse);
    console.log("addBalance изменен:", addBalanse);
  }, [addBalanse]);

  // Функция обратного вызова для передачи addBalance
  const handleAddBalance = (addBalance) => {
    props.onAddBalance(addBalance);
    console.log("Вызвана функция handleAddBalance с параметром:", addBalance);
  };

  const userId = props.userId;

  const handleAddLvtBalance = () => {
    // Проверяем, что userId и selectedLvt определены и не являются null
    if (userId && selectedLvt !== null && selectedLvt !== undefined) {
      // Проверяем, что selectedLvt является числовым значением
      if (!isNaN(selectedLvt)) {
        // Вызываем функцию addLvtUserBalance
        props.addLvtUserBalance(userId, selectedLvt, selectedValue);
        debugger;
      } else {
        console.error("Ошибка: selectedLvt не является числовым значением");
      }
    } else {
      console.error("Ошибка: userId или selectedLvt не определены");
    }
  };

  return (
    <div className={s.payLvtBlock}>
      <div className={s.btnFaq}>
        <button style={btnLvtPay} onClick={() => setSelectedFaq(true)}>
          Тарифы / Пополнение
        </button>
        <button style={btnLvtFaq} onClick={() => setSelectedFaq(false)}>
          Что такое Lvt?
        </button>
      </div>
      {selectedFaq ? (
        <div>
          <div className={s.inputLvtPay}>
            <div className={`${s.labelGrid} ${s.labelGridTitle}`}>
              <span className={s.textTitleTable}>Кол-во Lvt</span>
              <span className={s.textTitleTable}>Бонусы</span>
              <span className={s.textTitleTable}>Цена 1 Lvt</span>
              <span className={s.textTitleTable}>Сумма</span>
            </div>
            {options.map((option) => (
              <React.Fragment key={option.id}>
                <label
                  className={
                    selectedValue === option.value
                      ? s.payLvtBlockLabelCheced
                      : s.payLvtBlockLabel
                  }
                  htmlFor={option.id}
                >
                  <input
                    id={option.id}
                    type="radio"
                    name="lvt"
                    text={option.text}
                    lvt={option.lvt}
                    value={option.value}
                    checked={selectedValue === option.value}
                    onChange={(event) =>
                      handleInputChange(
                        event,
                        option.lvt,
                        option.lvtBonus,
                        option.text
                      )
                    }
                  />
                  <div className={s.labelGrid}>
                    <span>{option.text}</span>
                    <span>{option.textSale}</span>
                    <span>{option.price1}</span>
                    <span>{option.price2}</span>
                  </div>
                </label>
              </React.Fragment>
            ))}
          </div>
          <div className={s.sumInputBlock}>
            <div className={s.sumInput}>
              <div className={s.rowSumInput}>
                <span className={s.rowSumInputFlex}>
                  Вы выбрали: {selectedLvtText} запросов
                </span>
              </div>
              <div className={s.rowSumInput}>
                <span className={s.rowSumInputFlex}>
                  К списанию с баланса: {selectedValue} рублей
                  {addBalanse > 0 ? (
                    <span className={s.noSumBalanse}>
                      Не хватает {addBalanse} руб
                    </span>
                  ) : null}
                </span>
              </div>
              <div className={s.rowSumInput}>
                <span className={s.rowSumInputFlex}>
                  Вы получите:
                  {selectedLvtText}
                  {selectedLvtBonus ? (
                    <React.Fragment>
                      {" + "}
                      <span className={s.bonusWeight}>{selectedLvtBonus}</span>
                      <img width="16" src={iconPodarok} alt="" />
                    </React.Fragment>
                  ) : null}
                </span>
              </div>
            </div>
            <div className={s.btnAddLvtBalance}>
              {addBalanse > 0 ? (
                <span className={s.noSumBalanseBtn}>
                  Пополните баланс на недостающею сумму
                </span>
              ) : (
                <button onClick={handleAddLvtBalance}>Обменять на Lvt</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <WhatLvt />
        </div>
      )}
    </div>
  );
}
