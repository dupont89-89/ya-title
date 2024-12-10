import React from "react";
import s from "./../../css/Tools.module.css";
import { format } from "date-fns";
import { Box, Link, Typography } from "@mui/material";

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
        <Box mt={5}>
          <Typography color="#fff" gutterBottom variant="h6" component="h2">
            {titleTools}
          </Typography>
          <Box component="table" className={s.historyTableLink}>
            <Box component="tbody">
              {reverseWordstatTools.slice(0, 5).map((tool, index) => (
                <Box component="tr" key={index}>
                  <Box sx={{ backgroundColor: "#fff" }} component="td">
                    <Link
                      href={`${config.REACT_APP_SERVER_URL}${tool.fileTools}`}
                    >
                      {" "}
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
