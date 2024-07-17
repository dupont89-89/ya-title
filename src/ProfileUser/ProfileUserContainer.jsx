import React from "react";
import { connect } from "react-redux";
import ProfileUser from "./ProfileUser";
import { editUserData, loadAvatarUser } from "../Api/api-edit-user";
import { TitleComponent } from "../Function/TitleComponent";

function ProfileUserContainer(props) {
  return (
    <>
      <TitleComponent
        description="Управление данными пользователя. Редактирование данных. Смена аватарки. Информация об активности в реферальной программе."
        title={`Профиль пользователя ${props.firstName} ${props.lastName}`}
      />
      <ProfileUser
        referal={props.referal}
        moneyPresentReferal={props.moneyPresentReferal}
        email={props.email}
        avatar={props.avatar}
        firstName={props.firstName}
        lastName={props.lastName}
        role={props.role}
        money={props.money}
        lvt={props.lvt}
        moneyHistory={props.moneyHistory}
        userId={props.userId}
        loadAvatarUser={props.loadAvatarUser}
        editUserData={props.editUserData}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.user.dataUser.email,
    moneyPresentReferal: state.user.dataUser.lvtPresent.moneyPresentReferal,
    referal: state.user.dataUser.referal,
    avatar: state.user.dataUser.avatar,
    firstName: state.user.dataUser.firstName,
    lastName: state.user.dataUser.lastName,
    role: state.user.dataUser.role,
    money: state.user.dataUser.money,
    lvt: state.user.dataUser.lvt,
    moneyHistory: state.user.dataUser.moneyHistory,
    userId: state.user.dataUser.userId,
  };
};

const mapDispatchToProps = {
  loadAvatarUser,
  editUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUserContainer);
