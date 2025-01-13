import React from "react";
import { format } from "date-fns";
import { Box, Link, Typography } from "@mui/material";
import axios from "axios";

export default function HistoryToolsUser(props) {
  const { tools, nameTools, titleTools } = props;
  const wordstatTools = tools.filter((tool) => tool.nameTools === nameTools);
  const reverseWordstatTools = wordstatTools.reverse();
  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("./../../config.dev");
  } else {
    config = require("./../../config.prod");
  }

  const downloadFile = async (fileUrl) => {
    try {
      // Запрос файла с сервера
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Ожидаем бинарные данные
      });

      // Проверка на успешный ответ
      if (response.status === 200) {
        // Создание URL для скачивания
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileUrl.split("/").pop()); // Извлекаем имя файла
        document.body.appendChild(link);
        link.click();

        // Очистка URL после скачивания
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Error downloading file: ", response.status);
      }
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  return (
    <>
      {wordstatTools && wordstatTools.length > 0 ? (
        <Box mt={5}>
          <Typography color="#fff" gutterBottom variant="h6" component="h2">
            {titleTools}
          </Typography>
          <Box component="table">
            <Box component="tbody">
              {reverseWordstatTools.slice(0, 5).map((tool, index) => (
                <Box component="tr" key={index}>
                  <Box sx={{ backgroundColor: "#fff" }} component="td">
                    <Link
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        downloadFile(
                          `${config.REACT_APP_SERVER_URL}${tool.fileTools}`
                        )
                      }
                    >
                      {format(
                        new Date(tool.dateAdded),
                        "dd-MM-yyyy / HH:mm:ss"
                      )}
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {wordstatTools.length > 5 && (
            <Typography color="#fff" variant="subtitle1">
              Результаты прошлых проверок доступны в панели управления, раздел
              истории проверок.
            </Typography>
          )}
        </Box>
      ) : null}
    </>
  );
}
