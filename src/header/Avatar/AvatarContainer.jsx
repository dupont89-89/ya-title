import React from "react";
import { connect } from "react-redux";
import Avatar from "./Avatar";
import { logoutUserThunkCreator } from "../../redux/user-reducer/user-reducer";

function AvatarContainer(props) {
  // Функция для выхода из аккаунта
  const handleLogout = () => {
    // Здесь можете добавить логику для выхода из аккаунта
    // Например, вызов logoutUserThunkCreator
    props.logoutUserThunkCreator();
    // После успешного выхода из аккаунта устанавливаем isAuthenticated в false
  };
  return (
    <Avatar
      logoutUserThunkCreator={props.logoutUserThunkCreator}
      isAuthenticated={props.isAuthenticated}
      avatar={props.avatar}
      email={props.email}
      lvt={props.lvt}
      lvtPresent={props.lvtPresentRegistration + props.lvtPresentReferal}
      referalQuantity={props.referalQuantity}
      notifications={props.notifications}
      money={props.money}
      handleLogout={handleLogout}
      bonusDayLvt={props.bonusDayLvt}
      firstName={props.firstName}
      lastName={props.lastName}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    avatar: state.user.dataUser.avatar,
    email: state.user.dataUser.email,
    isAuthenticated: state.user.isAuthenticated,
    lvt: state.user.dataUser.lvt,
    lvtPresentReferal: state.user.dataUser.lvtPresent.lvtPresentReferal,
    lvtPresentRegistration:
      state.user.dataUser.lvtPresent.lvtPresentRegistration,
    referalQuantity: state.user.dataUser.referal.quantity,
    notifications: state.user.dataUser.notifications,
    money: state.user.dataUser.money,
    bonusDayLvt: state.user.dataUser.bonusDayLvt,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
  };
};
const mapDispatchToProps = {
  logoutUserThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarContainer);
