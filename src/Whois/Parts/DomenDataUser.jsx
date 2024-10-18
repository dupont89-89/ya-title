import React from "react";

import { Box, Button, Grid, Typography } from "@mui/material";

const styleUserDomenBlock = {
  background: "#0288d2",
  padding: "25px 15px",
  borderRadius: "8px",
  color: "#fff",
  textAlign: "center",
  height: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

//Находим ближайший освобождающийся домен
const getClosestDate = (subscriptions) => {
  return subscriptions.reduce((closest, current) => {
    const currentDate = new Date(current.freeData);
    const closestDate = new Date(closest.freeData);

    return currentDate < closestDate ? current : closest;
  });
};

export default function DomenDataUser(props) {
  const { isAuthenticated, domenSubscription } = props;

  const closestSubscription = getClosestDate(domenSubscription);
  return (
    <>
      {isAuthenticated && (
        <Grid mt={10} mb={10} container spacing={2}>
          <Grid item xs={4}>
            <Box sx={styleUserDomenBlock} component="div">
              <Typography sx={{ display: "block" }} component="span">
                Доменов в отслеживании
              </Typography>
              <Typography
                sx={{ display: "block", fontSize: "20px" }}
                component="span"
              >
                {domenSubscription.length}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={4}>
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
                Домен: {closestSubscription.domen}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={styleUserDomenBlock} component="div">
              <Button variant="contained" href="#contained-buttons">
                Список отслеживаемых
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
