import React from "react";

import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import CloseIcon from "@mui/icons-material/Close";

const styleUserDomenBlock = {
  background: "#fff",
  padding: "25px 15px",
  borderRadius: "8px",
  color: "#000",
  textAlign: "center",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

// Находим ближайший освобождающийся домен
const getClosestDate = (subscriptions) => {
  if (subscriptions.length === 0) {
    return null; // Возвращаем null или любое значение по умолчанию, если массив пуст
  }

  return subscriptions.reduce((closest, current) => {
    const currentDate = new Date(current.freeData);
    const closestDate = new Date(closest.freeData);

    return currentDate < closestDate ? current : closest;
  });
};

export default function DomenDataUser(props) {
  const {
    isAuthenticated,
    domenSubscription,
    displayListDomen,
    setDisplayListDomen,
  } = props;

  const closestSubscription = getClosestDate(domenSubscription);

  return (
    <>
      {isAuthenticated & (domenSubscription.length > 0) ? (
        <Grid mt={2} mb={2} container spacing={2}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={styleUserDomenBlock} component="div">
              <Typography sx={{ display: "block" }} component="span">
                Доменов в отслеживании
              </Typography>
              <Typography
                mt={1}
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#fff",
                  backgroundColor: "#0288d2",
                  minWidth: "40px", // Минимальная ширина контейнера
                  minHeight: "40px",
                  textAlign: "center", // Выравнивание текста по центру
                  borderRadius: "50%", // Закругленные углы (по желанию)
                  lineHeight: "40px",
                }}
                component="span"
              >
                {domenSubscription.length}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={styleUserDomenBlock} component="div">
              <Typography sx={{ display: "block" }} component="span">
                Ближайшая дата освобождения
              </Typography>
              <Typography
                sx={{ display: "block", fontSize: "15px" }}
                component="span"
              >
                Дата: {closestSubscription.freeData}
              </Typography>
              <Typography
                sx={{ display: "block", fontSize: "15px" }}
                component="span"
              >
                Домен:
                <br /> {closestSubscription.domen}
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={styleUserDomenBlock} component="div">
              <Button
                onClick={(e) => setDisplayListDomen(!displayListDomen)}
                startIcon={
                  displayListDomen ? <CloseIcon /> : <AddToPhotosOutlinedIcon />
                }
                variant="contained"
                href="#contained-buttons"
              >
                Список отслеживаемых
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}
