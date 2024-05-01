import React from "react";
import Signup from "./SignUp";
import { connect } from "react-redux";
import { setAuthSuccess } from "../../redux/user-reducer/user-reducer";
import { getUser } from "../../Api/api-user-login";
import { addRefUser } from "../../Api/api-referal";

function SignUpContainer(props) {
  return (
    <Signup
      getUser={props.getUser}
      setAuthSuccess={props.setAuthSuccess}
      close={props.close}
      closeButton={props.closeButton}
      addRefUser={props.addRefUser}
    />
  );
}
let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  setAuthSuccess,
  getUser,
  addRefUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
