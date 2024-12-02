import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid2";

function HeaderNoAuth(props) {
  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../config.dev");
  } else {
    config = require("../config.prod");
  }

  return (
    <Container
      maxWidth={false}
      sx={{ backgroundColor: "#1976d3", marginBottom: "20px" }}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid>
          <Link to="/">
            <Box
              sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
              component="img"
              src="/img/logo/white-logo-ptahini.png"
              alt="Логотип Ptahini"
              style={{ width: "50px" }}
            />
          </Link>
        </Grid>
        <Grid>
          <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              PTAHINI
            </Typography>
          </Link>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          size="grow"
        >
          <Button
            component="a"
            href="/login/"
            style={{
              backgroundColor: "#21b6ae",
            }}
            variant="contained"
          >
            Войти
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
export default HeaderNoAuth;
