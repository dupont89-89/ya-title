import React from "react";
import s from "./../../css/Tools.module.css";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DownloadIcon from "@mui/icons-material/Download";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

export default function CountWordKeyResult(props) {
  const { result, csvDownloadLink, handleClear } = props;
  return (
    <>
      {Array.isArray(result) && (
        <Grid mt={2} container spacing={2}>
          <Grid size={12}>
            <Typography variant="h4" component="h2">
              Результат проверки:
            </Typography>
          </Grid>
          <Grid size={12}>
            <Box component="table" className={s.resultKeyCount}>
              <Box component="thead">
                <Box component="tr">
                  <Box component="th">Ключевой запрос</Box>
                  <Box component="th">Частотность</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {result.slice(0, 5).map((item, index) => (
                  <Box component="tr" key={index}>
                    <Box component="td">{item.phrase}</Box>
                    <Box component="td">{item.shows}</Box>
                  </Box>
                ))}
                <Box component="tr">
                  <Box component="td">...</Box>
                  <Box component="td">...</Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <Typography variant="body1" component="p">
              Полный результат проверки в файле. Скачайте результат.
            </Typography>
            {csvDownloadLink && (
              <Grid container spacing={2}>
                <Grid size={"auto"}>
                  <Button
                    startIcon={<DownloadIcon />}
                    variant="contained"
                    component="a"
                    href={csvDownloadLink}
                    download="results.csv"
                  >
                    Скачать файл
                  </Button>
                </Grid>
                <Grid size={"auto"}>
                  <Button
                    color="success"
                    startIcon={<PlayCircleOutlineIcon />}
                    variant="contained"
                    onClick={() => handleClear()}
                  >
                    Новая проверка
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}
