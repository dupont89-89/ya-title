import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import CardPanelAdmin from "./Parts/Panel/CardPanelAdmin";
import Grid from "@mui/material/Grid2";

export default function Admin({ getAdminUserData, countUser, dataPanelAdmin }) {
  useEffect(() => {
    getAdminUserData();
  }, [getAdminUserData]);

  return (
    <Container maxWidth="xl">
      <Box mt={4} component="section">
        <Typography component="h1" variant="h4">
          Панель управления
        </Typography>
        <Grid mt={2} container spacing={3}>
          {dataPanelAdmin &&
            dataPanelAdmin.map((item, index) => (
              <Grid
                sx={{ display: "flex" }}
                size={{ xs: 12, sm: 6, md: 3, xl: 2 }}
                key={index}
              >
                <CardPanelAdmin
                  title={item.title}
                  link={item.link}
                  data={item.data}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}
