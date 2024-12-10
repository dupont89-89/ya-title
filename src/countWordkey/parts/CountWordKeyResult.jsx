import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import AutorenewIcon from "@mui/icons-material/Autorenew";

export default function CountWordKeyResult(props) {
  const { result, csvDownloadLink, handleClear } = props;
  return (
    <>
      {Array.isArray(result) && (
        <Grid mt={2} container spacing={2}>
          <Grid size={12}>
            <Typography color="#fff" gutterBottom component="h2" variant="h5">
              Результат проверки:
            </Typography>
          </Grid>
          <Grid size={12}>
            <Box component="table">
              <Box component="thead">
                <Box component="tr">
                  <Box component="th">Ключевой запрос</Box>
                  <Box component="th">Частотность</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {result.slice(0, 5).map((item, index) => (
                  <Box component="tr" key={index}>
                    <Box backgroundColor="#fff" component="td">
                      {item.phrase}
                    </Box>
                    <Box backgroundColor="#fff" component="td">
                      {item.shows}
                    </Box>
                  </Box>
                ))}
                <Box component="tr">
                  <Box backgroundColor="#fff" component="td">
                    ...
                  </Box>
                  <Box backgroundColor="#fff" component="td">
                    ...
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={12}>
            <Typography gutterBottom color="#fff" variant="body1" component="p">
              Полный результат проверки в файле. Скачайте результат.
            </Typography>
            {csvDownloadLink && (
              <Grid container spacing={2}>
                <Grid size={"auto"}>
                  <Button
                    sx={{ backgroundColor: "#4CAF50" }}
                    startIcon={<ArrowCircleDownIcon />}
                    variant="contained"
                    component="a"
                    href={csvDownloadLink}
                    download="results.csv"
                  >
                    Скачать результат
                  </Button>
                </Grid>
                <Grid size={"auto"}>
                  <Button
                    startIcon={<AutorenewIcon />}
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
