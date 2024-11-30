import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import MenuToolbar from "../Sidebar/MenuToolbar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Grid from "@mui/material/Grid2";

function HeaderNoAuth(props) {
  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../config.dev");
  } else {
    config = require("../config.prod");
  }

  const {
    pages,
    handleOpenNavMenu,
    handleCloseNavMenu,
    setAnchorElNav,
    setOpen,
    open,
    anchorElNav,
  } = props;

  return (
    <Container sx={{ backgroundColor: "#1976d3" }} maxWidth>
      <Grid alignItems="center" container spacing={2}>
        <Grid size="auto">
          <Box
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            component="img"
            src="/img/logo/white-logo-ptahini.png"
            alt="Логотип Ptahini"
            style={{ width: "50px" }}
          />
        </Grid>
        <Grid size="auto">
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
