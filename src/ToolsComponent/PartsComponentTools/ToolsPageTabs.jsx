import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useMediaQuery } from "@mui/material";
import json2mq from "json2mq";

export default function ToolsPageTabs(props) {
  const { app, description, video } = props;

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const matches = useMediaQuery(
    json2mq({
      minWidth: 600,
    })
  );

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <TabList
            orientation={matches ? "horizontal" : "vertical"}
            onChange={handleChange}
            aria-label="Переключения разделов инструмента"
          >
            <Tab label="Работа с инструментом" value="1" />
            <Tab label="Видеоинструкция" value="2" />
            <Tab label="Описание инструмента" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">{app}</TabPanel>
        <TabPanel value="2">{video}</TabPanel>
        <TabPanel value="3">{description}</TabPanel>
      </TabContext>
    </Box>
  );
}
