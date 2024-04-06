import React, { useEffect } from "react";
import s from "./../Admin.module.css";

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
      <table>
        <tbody>
          <tr className={s.tableHead}>
            <th>ID пользователя</th>
            <th>Эл. почта</th>
            <th>LVT баланс</th>
            <th>Баланс деньги</th>
            <th>Рефералы</th>
            <th>Статус</th>
            {/* Добавьте остальные поля, которые вы хотите отобразить */}
          </tr>
          {props.dataUser &&
            props.dataUser.map((user, index) => (
              <tr className={s.tableTrUser} key={index}>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>
                  <span className={s.userDataTdBlock}>
                    Всего (куплено + бонусы): {user.totalLvt}
                  </span>
                  <span className={s.userDataTdBlock}>
                    Без бонусов: {user.lvt}
                  </span>
                  <span className={s.userDataTdBlock}>
                    Бонусы за рефералов: {user.lvtPresent.lvtPresentReferal}
                  </span>
                </td>
                <td>
                  <span className={s.userDataTdBlock}>
                    Баланс денег: {user.money}{" "}
                  </span>
                  <span className={s.userDataTdBlock}>
                    Всего пополнений: {user.moneyHistory}
                  </span>
                </td>
                <td>Кол-во рефералов: {user.referalQuantity}</td>
                <td>
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
