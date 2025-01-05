import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { ruRU } from "@mui/x-data-grid/locales";
import * as XLSX from "xlsx";

export default function SiteResultTable(props) {
  const { siteResult } = props;
  const [selectedRows, setSelectedRows] = React.useState([]);

  // Функция для экспорта данных в Excel
  const handleExportExcel = (rows) => {
    // Преобразуем данные и добавляем заголовки вручную
    const formattedData = rows.map((row) => ({
      ID: row.id,
      Домены: row.site,
      ИКС: row.sqi,
    }));

    // Создаем таблицу с данными
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Результаты");
    XLSX.writeFile(workbook, "domen-iks-results.xlsx");
  };

  const handleDownloadAll = () => {
    handleExportExcel(rows);
  };

  const handleDownloadSelected = () => {
    const selectedData = rows.filter((row) => selectedRows.includes(row.id));
    if (selectedData.length > 0) {
      handleExportExcel(selectedData);
    } else {
      alert("Выберите строки для скачивания.");
    }
  };

  // Пользовательская функция сортировки по количеству символов
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
    },
    {
      field: "sqi",
      headerName: "ИКС",
    },
  ];

  const rows = siteResult.map((data, index) => ({
    id: index + 1, // Индексация начинается с 1
    ...data,
  }));

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
        rows={rows}
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
