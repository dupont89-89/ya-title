import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import CardHistoryDashboard from "./PartsCabinet/CardHistoryDashboard";

export default function DashboardComponent(props) {
  const blockHistory = [
    { name: "Отслеживаемые домены на освобождение", link: "/" },
    { name: "История проверки коммерциализации запросов", link: "/about" },
    { name: "История проверки частотности запросов", link: "/about" },
  ];

  return (
    <Container maxWidth="lg">
      <Grid mt={3} spacing={3} container>
        {blockHistory.map((item, index) => (
          <Grid key={index} size={{ lg: 3, md: 6, sm: 6, xs: 12 }}>
            <CardHistoryDashboard link={item.link} name={item.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
