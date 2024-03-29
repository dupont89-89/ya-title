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
      lvtPresent={props.lvtPresent}
      referalQuantity={props.referalQuantity}
      notifications={props.notifications}
      handleLogout={handleLogout}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    avatar: state.user.dataUser.avatar,
    email: state.user.dataUser.email,
    isAuthenticated: state.user.isAuthenticated,
    lvt: state.user.dataUser.lvt,
    lvtPresent: state.user.dataUser.lvtPresent,
    referalQuantity: state.user.dataUser.referal.quantity,
    notifications: state.user.dataUser.notifications,
  };
};
const mapDispatchToProps = {
  logoutUserThunkCreator,
};

export default connect(mapStateToProps, mapDispatchToProps)(AvatarContainer);
