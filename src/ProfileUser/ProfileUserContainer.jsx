import React from "react";
import { connect } from "react-redux";
import ProfileUser from "./ProfileUser";
import { loadAvatarUser } from "../Api/api-edit-user";

function ProfileUserContainer(props) {
  return (
    <ProfileUser
      referalQuantity={props.referalQuantity}
      lvtPresentReferal={props.lvtPresentReferal}
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
    />
  );
}

const mapStateToProps = (state) => {
  return {
    email: state.user.dataUser.email,
    lvtPresentReferal: state.user.dataUser.lvtPresent.lvtPresentReferal,
    referalQuantity: state.user.dataUser.referalQuantity,
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUserContainer);
