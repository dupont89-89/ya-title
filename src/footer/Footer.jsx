import React from "react";
import SocialContact from "./SocialContact";
import MailContact from "./MailContact";
import { Box, Container, Grid, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{ backgroundColor: "#1a76d3", paddingBottom: "20px" }}
      component="footer"
    >
      <Container maxWidth="xl">
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid
            sx={{ display: "flex", flexDirection: "column" }}
            item
            md={4}
            xs={12}
          >
            <Link sx={{ color: "#fff" }} href="/policy/">
              Политика конфиденциальности
            </Link>
            <Link sx={{ color: "#fff" }} href="/oferta/">
              Публичная оферта
            </Link>
          </Grid>
          <Grid md={4} item xs={12}>
            <SocialContact />
          </Grid>
          <Grid md={4} item xs={12}>
            <MailContact />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
