import React from "react";
import s from "./../Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ScoreUser(props) {
  return (
    <div className={s.blockPageAdminUser}>
      <table className={s.tableScore}>
        <thead>
          <tr className={s.tableHead}>
            <th>Номер счёта</th>
            <th>Сумма</th>
            <th>Дата создания</th>
            <th>ID пользователя</th>
            <th>Статус платежа</th>
          </tr>
        </thead>
        <tbody>
          {props.score &&
            props.score.map((score, index) => (
              <tr className={s.tableTrUser} key={index}>
                <td aria-label="Номер счёта">{score.InvId}</td>
                <td aria-label="Сумма">{score.OutSum}</td>
                <td aria-label="Дата создания">
                  <span className={s.userDataTdBlockScore}>
                    {score.createdAt}
                  </span>
                </td>
                <td aria-label="ID пользователя">
                  <span className={s.userDataTdBlockScore}>{score.userId}</span>
                </td>
                <td aria-label="Статус платежа">
                  <span className={s.userDataTdBlockScore}>
                    {score.paymentStatus ? (
                      <FontAwesomeIcon
                        size="2x"
                        color="#4caf50"
                        icon={faCheck}
                      />
                    ) : (
                      <FontAwesomeIcon
                        size="2x"
                        color="#cc1e1e"
                        icon={faXmark}
                      />
                    )}
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
