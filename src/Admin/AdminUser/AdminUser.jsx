import React, { useEffect } from "react";
import s from "./../Admin.module.css";
import UniversalModal from "../../Modal/UniversalModal";
import AdminFormAddLvtUser from "../Parts/Form/AdminFormAddLvtUser";

export default function AdminUser(props) {
  useEffect(() => {
    props.getAdminUserData();
  }, []);

  const onChange = (userId, role) => {
    // Вызываем функцию editAdminUserStatus и передаем ей userId и новый статус
    props.editAdminUserStatus(userId, role);
  };

  return (
    <div className={s.blockPageAdminUser}>
      <table className={s.userDataAdmin}>
        <thead>
          <tr className={s.tableHead}>
            <th>ID пользователя</th>
            <th>Эл. почта</th>
            <th>LVT баланс</th>
            <th>Баланс деньги</th>
            <th>Рефералы</th>
            <th>Статус</th>
            {/* Добавьте остальные поля, которые вы хотите отобразить */}
          </tr>
        </thead>
        <tbody>
          {props.dataUser &&
            props.dataUser.map((user, index) => (
              <tr className={s.tableTrUser} key={index}>
                <td aria-label="ID пользователя">{user.userId}</td>
                <td aria-label="Эл. почта">{user.email}</td>
                <td aria-label="LVT баланс">
                  <span className={s.userDataTdBlock}>
                    Текущий баланс: {user.totalLvt} Lvt
                  </span>
                  <span>
                    <UniversalModal
                      content={
                        <AdminFormAddLvtUser
                          addLvtAdminUser={props.addLvtAdminUser}
                          userId={user.userId}
                        />
                      }
                      nameBtnPopup="Добавить Lvt"
                    />
                  </span>
                </td>
                <td aria-label="Баланс деньги">
                  <span className={s.userDataTdBlock}>
                    Баланс: {user.money} руб
                  </span>
                  <span className={s.userDataTdBlock}>
                    Всего пополнений: {user.moneyHistory} руб
                  </span>
                </td>
                <td aria-label="Рефералы">
                  {" "}
                  <span className={s.userDataTdBlock}>
                    Бонусы за рефералов: {user.lvtPresent.moneyPresentReferal}{" "}
                    руб
                  </span>
                  <span className={s.userDataTdBlock}>
                    Кол-во рефералов: {user.referal.length} польз.
                  </span>
                </td>
                <td aria-label="Статус">
                  <select
                    value={user.role}
                    onChange={(e) => {
                      onChange(user.userId, e.target.value);
                    }}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moder">Moder</option>
                    <option value="partner">Partner</option>
                  </select>
                </td>
                {/* Добавьте остальные поля здесь */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
