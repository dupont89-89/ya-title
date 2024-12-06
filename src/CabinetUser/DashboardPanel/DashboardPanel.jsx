import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import DashboardPanelTarif from "./Parts/DashboardPanelTarif";
import DashboardPanelBuyBall from "./Parts/DashboardPanelBuyBall";
import DashboardPanelNews from "./Parts/DashboardPanelNews";
import DashboardPanelSupport from "./Parts/DashboardPanelSupport";

export default function DashboardPanel(props) {
  return (
    <Container maxWidth="false">
      <Grid mt={3} spacing={3} container>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardPanelTarif />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardPanelBuyBall />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardPanelSupport />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <DashboardPanelNews />
        </Grid>
      </Grid>
    </Container>
  );
}
