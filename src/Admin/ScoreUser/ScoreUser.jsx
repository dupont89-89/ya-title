import React from "react";
import s from "./../Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ScoreUser(props) {
  return (
    <div className={s.blockPageAdminUser}>
      <table>
        <tbody>
          <tr className={s.tableHead}>
            <th>Номер счёта</th>
            <th>Сумма</th>
            <th>Дата создания</th>
            <th>ID пользователя</th>
            <th>Статус платежа</th>
          </tr>

          {props.score &&
            props.score.map((score, index) => (
              <tr className={s.tableTrUser} key={index}>
                <td>{score.InvId}</td>
                <td>{score.OutSum}</td>
                <td>
                  <span className={s.userDataTdBlock}>{score.createdAt}</span>
                </td>
                <td>
                  <span className={s.userDataTdBlock}>{score.userId}</span>
                </td>
                <td>
                  <span className={s.userDataTdBlock}>
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
