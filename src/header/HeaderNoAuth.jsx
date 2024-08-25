import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { blueGrey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import NotificationContainer from "./Notification/NotificationContainer";
import { Chip, Divider, Stack } from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import MenuToolbar from "../Sidebar/MenuToolbar";
import AssessmentIcon from "@mui/icons-material/Assessment";

function HeaderNoAuth(props) {
  const { avatar, firstName, lastName, money, totalLvt, handleLogout } = props;
  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../config.dev");
  } else {
    config = require("../config.prod");
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

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
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
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
            <MenuToolbar />
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
