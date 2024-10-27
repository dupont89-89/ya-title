// import React from "react";
// import s from "./../Admin.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

// export default function ScoreUser(props) {
//   return (
//     <div className={s.blockPageAdminUser}>
//       <table className={s.tableScore}>
//         <thead>
//           <tr className={s.tableHead}>
//             <th>Номер счёта</th>
//             <th>Сумма</th>
//             <th>Дата создания</th>
//             <th>ID пользователя</th>
//             <th>Статус платежа</th>
//           </tr>
//         </thead>
//         <tbody>
//           {props.score &&
//             props.score.map((score, index) => (
//               <tr className={s.tableTrUser} key={index}>
//                 <td aria-label="Номер счёта">{score.InvId}</td>
//                 <td aria-label="Сумма">{score.OutSum}</td>
//                 <td aria-label="Дата создания">
//                   <span className={s.userDataTdBlockScore}>
//                     {score.createdAt}
//                   </span>
//                 </td>
//                 <td aria-label="ID пользователя">
//                   <span className={s.userDataTdBlockScore}>{score.userId}</span>
//                 </td>
//                 <td aria-label="Статус платежа">
//                   <span className={s.userDataTdBlockScore}>
// {score.paymentStatus ? (
//   <FontAwesomeIcon
//     size="2x"
//     color="#4caf50"
//     icon={faCheck}
//   />
// ) : (
//   <FontAwesomeIcon
//     size="2x"
//     color="#cc1e1e"
//     icon={faXmark}
//   />
// )}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import s from "./../Admin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ScoreUser(props) {
  const { score } = props;

  // Проверяем, что score — это массив и не пустой
  if (!Array.isArray(score) || score.length === 0) {
    return <div>No score data available.</div>;
  }

  // Определяем колонки
  const columns = [
    { field: "InvId", headerName: "Номер счёта", flex: 1 },
    { field: "OutSum", headerName: "Сумма", flex: 1 },
    { field: "createdAt", headerName: "Дата создания", flex: 1 },
    { field: "userId", headerName: "ID пользователя", flex: 1 },
    {
      field: "paymentStatus",
      headerName: "Статус платежа",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <FontAwesomeIcon size="2x" color="#4caf50" icon={faCheck} />
        ) : (
          <FontAwesomeIcon size="2x" color="#cc1e1e" icon={faXmark} />
        ),
    },
  ];

  // Преобразуем данные для таблицы, задаем id для каждой строки
  const rows = score.map((item, index) => ({
    id: item.InvId || index, // Используем InvId как уникальный идентификатор строки, либо индекс как fallback
    ...item,
  }));

  return (
    <div
      className={s.blockPageAdminUser}
      style={{ height: "100%", width: "100%" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 30, 50]}
        checkboxSelection
      />
    </div>
  );
}
