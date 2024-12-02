import React from "react";
import SocialContact from "./SocialContact";
import MailContact from "./MailContact";
import { Box, Container, Link } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Footer() {
  const gridStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  };
  return (
    <Box
      pt={2}
      pb={2}
      sx={{
        backgroundColor: "#1a76d3",
        marginTop: "auto",
      }}
      component="footer"
    >
      <Container maxWidth={false}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid sx={gridStyles} size={{ md: 4, xs: 12 }}>
            <Link
              variant="body2"
              sx={{ color: "#fff", textDecoration: "underline" }}
              href="/policy/"
            >
              Политика конфиденциальности
            </Link>
            <Link
              variant="body2"
              sx={{ color: "#fff", textDecoration: "underline" }}
              href="/oferta/"
            >
              Публичная оферта
            </Link>
          </Grid>
          <Grid sx={gridStyles} size={{ md: 4, xs: 12 }}>
            <SocialContact />
          </Grid>
          <Grid size={{ md: 4, xs: 12 }}>
            <MailContact />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
