import React from "react";
import Signup from "./SignUp";
import { connect } from "react-redux";
import { setAuthSuccess } from "../../redux/user-reducer/user-reducer";
import { getUser } from "../../Api/api-user-login";

function SignUpContainer(props) {
  return (
    <Signup
      getUser={props.getUser}
      setAuthSuccess={props.setAuthSuccess}
      close={props.close}
      closeButton={props.closeButton}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
