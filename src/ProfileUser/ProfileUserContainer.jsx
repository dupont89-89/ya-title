import React from "react";
import { connect } from "react-redux";
import ProfileUser from "./ProfileUser";

function ProfileUserContainer(props) {
  return <ProfileUser email={props.email} avatar={props.avatar} />;
}

const mapStateToProps = (state) => {
  return {
    email: state.user.dataUser.email,
    avatar: state.user.dataUser.avatar,
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileUserContainer);
