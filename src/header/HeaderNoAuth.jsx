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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            component="img"
            src="/img/logo/white-logo-ptahini.png"
            alt="Логотип Ptahini"
            style={{ width: "50px" }}
          />
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
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <MenuItem>
                <Button
                  sx={{ my: 2, color: "white" }}
                  onClick={() => {
                    setOpen(true);
                    setAnchorElNav(null);
                  }}
                  startIcon={<MenuOpenIcon />}
                  variant="outlined"
                >
                  Инструменты
                </Button>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.link}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>{" "}
          <Box
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            component="img"
            src="/img/logo/white-logo-ptahini.png"
            alt="Логотип Ptahini"
            style={{ width: "50px" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PTAHINI
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuToolbar openMob={open} />
          </Box>
          <Box
            sx={{ flexGrow: 0, display: "flex", gap: 2, alignItems: "center" }}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderNoAuth;
