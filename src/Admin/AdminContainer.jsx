import React from "react";
import { connect } from "react-redux";
import Admin from "./Admin";

function AdminContainer(props) {
  let countUser = props.dataUser.length;
  return <Admin countUser={countUser} />;
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.adminUser.dataUser,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
