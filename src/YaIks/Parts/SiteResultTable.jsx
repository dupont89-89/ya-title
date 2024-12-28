import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { ruRU } from "@mui/x-data-grid/locales";

export default function SiteResultTable(props) {
  const { siteResult } = props;
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
  const paginationModel = { page: 0, pageSize: 50 };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "site",
      headerName: "Домен",
      width: 200,
      sortComparator: sortByLength,
    }, // Увеличил ширину для лучшего отображения доменов
    { field: "sqi", headerName: "ИКС", width: 800 }, // Исправил ключ на sqi
  ];

  const rows = siteResult.map((data, index) => ({
    id: index, // Важно для уникальной идентификации строки
    ...data,
  }));

  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 25, 50, 100]}
        checkboxSelection
        sx={{ border: 0 }}
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      />
    </Paper>
  );
}
