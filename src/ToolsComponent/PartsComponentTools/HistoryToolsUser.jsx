import React from "react";
import s from "./../../css/Tools.module.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

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
  return (
    <>
      {wordstatTools && wordstatTools.length > 0 ? (
        <Box>
          <h2>{titleTools}</h2>
          <table className={s.historyTableLink}>
            <tbody>
              {reverseWordstatTools.slice(0, 5).map((tool, index) => (
                <tr key={index}>
                  <td>
                    <a href={`${config.REACT_APP_SERVER_URL}${tool.fileTools}`}>
                      {" "}
                      {format(
                        new Date(tool.dateAdded),
                        "dd-MM-yyyy / HH:mm:ss"
                      )}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {wordstatTools.length > 5 && (
            <p className={s.textLinkCabinet}>
              Результаты прошлых проверок доступны в панели управления, раздел
              истории проверок.
            </p>
          )}
        </Box>
      ) : null}
    </>
  );
}
