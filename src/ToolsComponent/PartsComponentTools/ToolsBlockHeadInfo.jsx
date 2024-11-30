import { Alert, Box, Container, Typography } from "@mui/material";
import { Grid } from "@mui/material/Grid2";
import React from "react";
import RatingTools from "./RatingTools";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

export default function ToolsBlockHeadInfo() {
  return (
    <Container sx={{ marginBottom: 5 }} maxWidth="xl">
      <Box component="section" sx={{ flexGrow: 1, mt: 2 }}>
        <Grid
          sx={{
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "flex-start",
            overflow: "auto",
          }}
          container
          spacing={1}
        >
          <Grid item sx={{ display: "flex" }} md={3} xs={12}>
            <RatingTools />
          </Grid>
          <Grid item md={3} xs={12}>
            <Alert
              sx={{ height: "64px", alignItems: "center" }}
              icon={<CheckIcon fontSize="inherit" />}
              severity="success"
            >
              <Typography>Работает стабильно</Typography>
            </Alert>
          </Grid>
          <Grid item md={3} xs={12}>
            <Alert
              sx={{ height: "64px", alignItems: "center" }}
              action={
                <Link href="/video/" color="inherit" size="small">
                  Смотреть
                </Link>
              }
              icon={<OndemandVideoIcon fontSize="inherit" />}
              severity="success"
            >
              Видео инструкция
            </Alert>
          </Grid>
          <Grid item md={3} xs={12}>
            <Alert
              sx={{
                height: "64px",
                alignItems: "center",
              }}
              action={
                <Link href="/support/" color="inherit" size="small">
                  Оставить обращение
                </Link>
              }
              icon={<OndemandVideoIcon fontSize="inherit" />}
              severity="success"
            >
              Поддержка
            </Alert>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
