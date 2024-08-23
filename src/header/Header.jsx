// import React from "react";
// import s from "./Header.module.css";
// import Lvt from "./Balance/Lvt/Lvt";
// import Money from "./Balance/Money/Money";
// import AvatarContainer from "./Avatar/AvatarContainer";
// import NotificationContainer from "./Notification/NotificationContainer";
// import MainMenuHeader from "../Menu/Header/MainMenuHeader";
// import { Link } from "react-router-dom";
// import home from "./../img/icon/icons-home-fff.png";

// export default function Header(props) {
//   return (
//     <header className={s.headerDekstop}>
//       <div className={s.headerContainerGrid}>
//         <Link to="/" className={s.homeLinkHeader}>
//           <img alt="" src={home} />
//         </Link>
//         <AvatarContainer />
//         {props.isAuthenticated ? (
//           <>
//             <Lvt
//               lvt={props.lvt}
//               bonusDayLvt={props.bonusDayLvt}
//               lvtPresent={props.lvtPresent}
//               totalLvt={props.totalLvt}
//             />
//             <Money money={props.money} />
//             <MainMenuHeader />
//             <NotificationContainer />
//           </>
//         ) : (
//           <MainMenuHeader />
//         )}
//       </div>
//     </header>
//   );
// }
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

const pages = [
  {
    name: "Баланс",
    link: "/balance/",
    icon: <CreditCardIcon ontSize="small" />,
  },
  {
    name: "Кабинет",
    link: "/cabinet/",
    icon: <AssessmentIcon ontSize="small" />,
  },
];
const settings = [
  { name: "Профиль", link: "/profile/" },
  { name: "Рефералы", link: "/referal/" },
  { name: "История", link: "/history-message/" },
];

function Header(props) {
  const { avatar, firstName, lastName, money, totalLvt, handleLogout } = props;
  let config;

  if (process.env.NODE_ENV === "development") {
    config = require("../config.dev");
  } else {
    config = require("../config.prod");
  }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
            >
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
            <MenuToolbar />
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "#fff", marginLeft: 2 }}
                component={Link} // Используем Link из react-router-dom
                to={page.link} // Используем link из объекта page
                variant="outlined"
                color="white"
                startIcon={page.icon}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box
            sx={{ flexGrow: 0, display: "flex", gap: 2, alignItems: "center" }}
          >
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1}>
              <Chip
                color="success"
                icon={<CreditCardIcon ontSize="small" />}
                label={`${money} руб`}
              />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" spacing={1}>
              <Chip
                color="success"
                icon={<CloudIcon ontSize="small" />}
                label={`${totalLvt} баллов`}
              />
            </Stack>
            <Divider orientation="vertical" flexItem />
            <NotificationContainer />
            <Divider orientation="vertical" flexItem />
            <Tooltip title="Управление профилем">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={`${config.REACT_APP_SERVER_URL}${avatar}`}
                  sx={{ bgcolor: blueGrey[50] }}
                />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
