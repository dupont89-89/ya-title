import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ruRU } from "@mui/x-data-grid/locales";
import * as XLSX from "xlsx";
import decodePunycode from "../../Whois/Parts/PunycodeConverter";

export default function SiteResultTable(props) {
  const { siteResult, stateChek, stateNumberIks } = props;
  const [selectedRows, setSelectedRows] = React.useState([]);

  // Функция для фильтрации данных на основе ИКС
  const filteredRows = siteResult
    .filter((data) => {
      const sqi = Number(data.sqi) || 0; // Обработайте случаи null/undefined
      console.log("SQI:", sqi, "State Number IKS:", stateNumberIks);
      if (!stateChek) return true;
      return stateNumberIks === 0 ? sqi > 0 : sqi >= stateNumberIks;
    })
    .map((data, index) => ({
      id: index + 1,
      site: data.site,
      sqi: data.sqi,
      result: data.result,
    }));

  // Функция для экспорта данных в Excel
  const handleExportExcel = (rows) => {
    const formattedData = rows.map((row) => {
      const decodedSite = decodePunycode(row.site);
      return {
        ID: row.id,
        Домены: decodedSite,
        ИКС: row.sqi,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Результаты");
    XLSX.writeFile(workbook, "domen-iks-results.xlsx");
  };

  const handleDownloadAll = () => {
    handleExportExcel(filteredRows);
  };

  const handleDownloadSelected = () => {
    const selectedData = filteredRows.filter((row) =>
      selectedRows.includes(row.id)
    );
    if (selectedData.length > 0) {
      handleExportExcel(selectedData);
    } else {
      alert("Выберите строки для скачивания.");
    }
  };

  const sortByLength = (v1, v2) => {
    return v1.length - v2.length;
  };

  const paginationModel = { page: 0, pageSize: 100 };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "site",
      headerName: "Домены",
      width: 300,
      sortComparator: sortByLength,
      valueFormatter: (params) => decodePunycode(params),
    },
    { field: "sqi", headerName: "ИКС" },
    {
      field: "result",
      headerName: "Статус домена",
      width: 300,
      renderCell: (params) => {
        if (params.value === "Available") {
          const buyLink = `https://www.reg.ru/buy/domains/?query=${params.row.site}&rlink=reflink-28428623`;
          return (
            <a
              target="_blank"
              href={buyLink}
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Купить домен
            </a>
          );
        }
        if (params.value === "DOMAIN_ALREADY_EXISTS") {
          return <span style={{ color: "red" }}>Домен занят</span>;
        }
        return params.value;
      },
    },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleDownloadAll}
        >
          Скачать всё
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleDownloadSelected}
          disabled={!selectedRows.length > 0}
        >
          Скачать выбранное
        </Button>
      </div>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        sx={{ border: 0 }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      />
    </Paper>
  );
}

// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import { ruRU } from "@mui/x-data-grid/locales";
// import * as XLSX from "xlsx";
// import decodePunycode from "../../Whois/Parts/PunycodeConverter";

// export default function SiteResultTable(props) {
//   const { siteResult, chekSiteResult } = props;
//   const [selectedRows, setSelectedRows] = React.useState([]);

//   // Функция для экспорта данных в Excel
//   const handleExportExcel = (rows) => {
//     // Преобразуем данные и добавляем заголовки вручную
//     const formattedData = rows.map((row) => {
//       const decodedSite = decodePunycode(row.site);
//       return {
//         ID: row.id,
//         Домены: decodedSite,
//         ИКС: row.sqi,
//       };
//     });

//     // Создаем таблицу с данными
//     const worksheet = XLSX.utils.json_to_sheet(formattedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Результаты");
//     XLSX.writeFile(workbook, "domen-iks-results.xlsx");
//   };

//   const handleDownloadAll = () => {
//     handleExportExcel(rows);
//   };

//   const handleDownloadSelected = () => {
//     const selectedData = rows.filter((row) => selectedRows.includes(row.id));
//     if (selectedData.length > 0) {
//       handleExportExcel(selectedData);
//     } else {
//       alert("Выберите строки для скачивания.");
//     }
//   };

//   // Пользовательская функция сортировки по количеству символов
//   const sortByLength = (v1, v2) => {
//     return v1.length - v2.length;
//   };

//   const paginationModel = { page: 0, pageSize: 100 };

//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     {
//       field: "site",
//       headerName: "Домены",
//       width: 300,
//       sortComparator: sortByLength,
//       valueFormatter: (params) => decodePunycode(params), // Декодируем домен для отображения
//     },
//     { field: "sqi", headerName: "ИКС" },
//     {
//       field: "result",
//       headerName: "Статус домена",
//       width: 300,
//       renderCell: (params) => {
//         // Если статус "Available", отображаем ссылку "Купить домен"
//         if (params.value === "Available") {
//           const buyLink = `https://www.reg.ru/buy/domains/?query=${params.row.site}&rlink=reflink-28428623`;
//           return (
//             <a
//               target="_blank"
//               href={buyLink}
//               style={{ color: "blue", textDecoration: "underline" }}
//             >
//               Купить домен
//             </a>
//           );
//         }
//         // Если статус "DOMAIN_ALREADY_EXISTS", отображаем "Домен занят"
//         if (params.value === "DOMAIN_ALREADY_EXISTS") {
//           return <span style={{ color: "red" }}>Домен занят</span>;
//         }
//         // Для всех остальных статусов отображаем значение как есть
//         return params.value;
//       },
//     },
//   ];

//   const rows = siteResult.map((data, index) => ({
//     id: index + 1, // Индексация начинается с 1
//     site: data.site, // Домен (Punycode)
//     sqi: data.sqi, // ИКС
//     result: data.result, // Статус
//   }));

//   return (
//     <Paper sx={{ width: "100%" }}>
//       <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={handleDownloadAll}
//         >
//           Скачать всё
//         </Button>
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={handleDownloadSelected}
//           disabled={!selectedRows.length > 0}
//         >
//           Скачать выбранное
//         </Button>
//       </div>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[10, 25, 50, 100]}
//         checkboxSelection
//         onRowSelectionModelChange={(newSelection) => {
//           setSelectedRows(newSelection);
//         }}
//         sx={{ border: 0 }}
//         localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
//       />
//     </Paper>
//   );
// }
