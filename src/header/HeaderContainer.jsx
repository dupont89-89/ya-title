import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutUserThunkCreator } from "../redux/user-reducer/user-reducer";
import HeaderNoAuth from "./HeaderNoAuth";

function HeaderContainer(props) {
  // Функция для выхода из аккаунта
  const handleLogout = () => {
    // Здесь можете добавить логику для выхода из аккаунта
    // Например, вызов logoutUserThunkCreator
    props.logoutUserThunkCreator();
    // После успешного выхода из аккаунта устанавливаем isAuthenticated в false
  };

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
        />
      ) : (
        <HeaderNoAuth />
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
