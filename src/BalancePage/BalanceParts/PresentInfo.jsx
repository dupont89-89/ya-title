import React from "react";
import s from "./../BalancePage.module.css";

export default function PresentInfo(props) {
  return (
    <div className={s.blockPresentInfo}>
      <h3>Подарки</h3>
      <table>
        <tr>
          <td>3 Lvt</td>
          <td>Ежедневный 9:00 МСК</td>
        </tr>
        <tr>
          <td>20 Lvt</td>
          <td>за регистрацию</td>
        </tr>
        <tr>
          <td>50 Lvt</td>
          <td>за рекомендацию</td>
        </tr>
        <tr>
          <td>50 Lvt</td>
          <td>за репост</td>
        </tr>
        <tr>
          <td>15% Lvt</td>
          <td>реферальная про</td>
        </tr>
      </table>
    </div>
  );
}
