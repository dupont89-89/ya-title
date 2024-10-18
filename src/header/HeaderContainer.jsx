import React, { useState } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutUserThunkCreator } from "../redux/user-reducer/user-reducer";
import HeaderNoAuth from "./HeaderNoAuth";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CreditCardIcon from "@mui/icons-material/CreditCard";

function HeaderContainer(props) {
  // Функция для выхода из аккаунта
  const handleLogout = () => {
    // Здесь можете добавить логику для выхода из аккаунта
    // Например, вызов logoutUserThunkCreator
    props.logoutUserThunkCreator();
    // После успешного выхода из аккаунта устанавливаем isAuthenticated в false
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    { name: "Профиль", link: "/profile/" },
    { name: "Рефералы", link: "/referal/" },
    { name: "История", link: "/history-message/" },
  ];

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

  return (
    <>
      {props.isAuthenticated ? (
        <Header
          money={props.money}
          lvt={props.lvt}
          bonusDayLvt={props.bonusDayLvt}
          lvtPresent={props.lvtPresentRegistration + props.lvtPresentReferal}
          notifications={props.notifications}
          isAuthenticated={props.isAuthenticated}
          totalLvt={props.totalLvt}
          avatar={props.avatar}
          firstName={props.firstName}
          lastName={props.lastName}
          handleLogout={handleLogout}
          pages={pages}
          settings={settings}
          anchorElUser={anchorElUser}
          toggleDrawer={toggleDrawer}
          handleOpenUserMenu={handleOpenUserMenu}
          handleCloseUserMenu={handleCloseUserMenu}
          handleOpenNavMenu={handleOpenNavMenu}
          anchorElNav={anchorElNav}
          handleCloseNavMenu={handleCloseNavMenu}
          open={open}
        />
      ) : (
        <HeaderNoAuth
          anchorElNav={anchorElNav}
          open={open}
          setOpen={setOpen}
          setAnchorElNav={setAnchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
          pages={pages}
        />
      )}
    </>
  );
}

let mapStateToProps = (state) => {
  return {
    money: state.user.dataUser.money,
    lvt: state.user.dataUser.lvt,
    bonusDayLvt: state.user.dataUser.bonusDayLvt,
    lvtPresentReferal: state.user.dataUser.lvtPresent.lvtPresentReferal,
    lvtPresentRegistration:
      state.user.dataUser.lvtPresent.lvtPresentRegistration,
    notifications: state.user.dataUser.notifications,
    isAuthenticated: state.user.isAuthenticated,
    totalLvt: state.user.dataUser.totalLvt,
    avatar: state.user.dataUser.avatar,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
  };
};

const mapDispatchToProps = {
  logoutUserThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
