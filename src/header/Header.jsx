import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { blueGrey } from "@mui/material/colors";
import { Link } from "react-router-dom";
import NotificationContainer from "./Notification/NotificationContainer";
import { Chip, Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloudIcon from "@mui/icons-material/Cloud";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { AccountCircle } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Header(props) {
  const {
    avatar,
    firstName,
    lastName,
    money,
    totalLvt,
    handleLogout,
    settings,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
  } = props;

  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../config.dev");
  } else {
    config = require("../config.prod");
  }
  const vkAvatar = "userapi";
  return (
    <Container
      sx={{
        background:
          "linear-gradient(90deg, rgba(25, 118, 211, 1) 0%, rgba(25, 176, 211, 1) 100%)",
        marginBottom: "20px",
      }}
      maxWidth={false}
    >
      <Grid alignItems="center" container spacing={2}>
        <Grid size="auto">
          <Link style={{ display: "flex", alignItems: "center" }} to="/">
            <Box
              sx={{ mr: 1 }}
              component="img"
              src="/img/logo/white-logo-ptahini.png"
              alt="Логотип Ptahini"
              style={{ width: "50px" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="p"
              sx={{
                mr: 2,
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
        <Grid size="auto">
          <Button
            href="/dashboard/"
            sx={{ backgroundColor: "#fff" }}
            variant="outlined"
            startIcon={<DashboardIcon />}
          >
            Панель инструментов
          </Button>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "15px",
          }}
          size="grow"
        >
          <Box sx={{ display: { xs: "none", md: "contents" } }}>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1}>
              <Chip
                sx={{
                  backgroundColor: "#4CAF50", // Используем кастомный цвет
                  color: "#fff", // Добавим цвет текста, если нужно
                  fontWeight: "600",
                }}
                icon={<CreditCardIcon color="#fff" size="small" />}
                label={`${money} руб`}
              />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1}>
              <Chip
                sx={{
                  backgroundColor: "#4CAF50", // Используем кастомный цвет
                  color: "#fff", // Добавим цвет текста, если нужно
                  fontWeight: "600",
                }}
                icon={<CloudIcon color="#fff" size="small" />}
                label={`${totalLvt} баллов`}
              />
            </Stack>
            <Divider orientation="vertical" flexItem />
          </Box>
          <NotificationContainer />
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Управление профилем">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {avatar ? (
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={
                    avatar.includes(vkAvatar)
                      ? `${avatar}`
                      : `${config.REACT_APP_SERVER_URL}${avatar}`
                  }
                  sx={{ bgcolor: blueGrey[50] }}
                />
              ) : (
                <AccountCircle sx={{ color: "#fff" }} fontSize="large" />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Menu
        disableScrollLock={true}
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            <Link to={setting.link}>
              <Typography textAlign="center">{setting.name}</Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={handleLogout} textAlign="center">
            Выйти
          </Typography>
        </MenuItem>
      </Menu>
    </Container>
  );
}
export default Header;
