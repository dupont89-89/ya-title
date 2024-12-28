import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ruRU } from "@mui/x-data-grid/locales";
import { Typography } from "@mui/material";

export default function DomenDeleteResultTable(props) {
  const { domenResult, domenResultData } = props;
  const [selectedRows, setSelectedRows] = useState([]);
  const handleSelectionChange = (newSelection) => {
    console.log("Selected Rows:", newSelection);
    setSelectedRows(newSelection);
  };

  // Пользовательская функция сортировки по количеству символов
  const sortByLength = (v1, v2, param1, param2) => {
    const length1 = v1.length;
    const length2 = v2.length;
    if (length1 < length2) {
      return -1;
    }
    if (length1 > length2) {
      return 1;
    }
    return 0;
  };

  const handleDownload = () => {
    console.log("Selected Rows for Download:", selectedRows);
    const selectedDomains = selectedRows.map(
      (id) => domenResult.find((row) => row.id === id).domains
    );
    const blob = new Blob([selectedDomains.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "selected_domains.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const paginationModel = { page: 0, pageSize: 50 };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "domains",
      headerName: "Домен",
      width: 200,
      sortComparator: sortByLength,
    },
  ];

  return (
    <>
      <Typography gutterBottom variant="h6" component="h4">
        {domenResultData}
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <DataGrid
          rows={domenResult}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange} // Используем onRowSelectionModelChange вместо onRowSelectionChange
          sx={{ border: 0 }}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          disabled={selectedRows.length === 0}
        >
          Скачать выбранные домены
        </Button>
      </Paper>
    </>
  );
}

// import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import Paper from "@mui/material/Paper";
// import { ruRU } from "@mui/x-data-grid/locales";

// // Пользовательская функция сортировки по количеству символов
// const sortByLength = (v1, v2, param1, param2) => {
//   const length1 = v1.length;
//   const length2 = v2.length;
//   if (length1 < length2) {
//     return -1;
//   }
//   if (length1 > length2) {
//     return 1;
//   }
//   return 0;
// };

// export default function DomenDeleteResultTable(props) {
//   const { domenResult } = props;
//   const paginationModel = { page: 0, pageSize: 50 };
//   const columns = [
//     { field: "id", headerName: "ID", width: 70 },
//     {
//       field: "domains",
//       headerName: "Домен",
//       width: 200,
//       sortComparator: sortByLength, // Передаем пользовательскую функцию сортировки
//     },
//   ];

//   return (
//     <Paper sx={{ width: "100%" }}>
//       <DataGrid
//         rows={domenResult}
//         columns={columns}
//         initialState={{ pagination: { paginationModel } }}
//         pageSizeOptions={[10, 50, 100]}
//         checkboxSelection
//         sx={{ border: 0 }}
//         localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
//       />
//     </Paper>
//   );
// }
