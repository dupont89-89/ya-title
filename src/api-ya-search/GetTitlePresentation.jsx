import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import React, { useState } from "react";
import { Home } from "@mui/icons-material";
import s from "./Form.module.css";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const serverUrl = `${config.REACT_APP_SERVER_URL}`;

export default function GetTitlePresentation() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultString, setResultString] = useState("");

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${serverUrl}/api/tools/get-title`, {
        query,
      });

      // Деструктурируем данные из ответа
      const { title } = response.data;
      setResultString(title);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="section" sx={{ mb: 10 }}>
      <Grid container spacing={4}>
        <Grid size={12}>
          <Typography align="center" variant="h3" component="h2">
            Создавай лучшие Title заголовки
          </Typography>
        </Grid>
        {resultString && (
          <Grid size={12}>
            <Typography align="center" variant="h6" component="p">
              <Box
                sx={{
                  display: "inline-block",
                  background: "whitesmoke",
                  padding: "10px",
                  borderRadius: "6px",
                  marginRight: "5px",
                }}
                component="span"
              >
                {" "}
                <Home />
              </Box>
              <Box
                sx={{
                  display: "inline-block",
                  background: "whitesmoke",
                  padding: "10px",
                  borderRadius: "6px",
                }}
                component="span"
              >
                {resultString}
              </Box>
            </Typography>
          </Grid>
        )}
        <Grid
          size={12}
          alignContent="center"
          alignItems="center"
          container
          spacing={2}
        >
          <Grid
            sx={{ display: "flex", justifyContent: "flex-end" }}
            size={{ xs: 12, md: 7 }}
          >
            <TextField
              sx={{ width: "510px" }}
              id="title"
              label="Ключевой запрос"
              variant="outlined"
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
            size={{ xs: 12, md: 5 }}
          >
            <Button
              sx={{ width: "300px", height: "53px", fontSize: "18px" }}
              onClick={handleClick}
              variant="contained"
              disabled={!query || isLoading}
            >
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "Создать Title"
              )}
            </Button>
          </Grid>
        </Grid>
        <Grid
          spacing={2}
          sx={{ justifyContent: "center", display: "flex" }}
          size={12}
        >
          <Typography textAlign="center" variant="body1" component="p">
            Загружай список ключевых запросов и массово создавай Title заголовки
            для всего сайта!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
