import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {
  setDataUser,
  setAuthSuccess,
} from "./../../redux/user-reducer/user-reducer";
import { getUser } from "../../Api/api-user-login";

function LoginContainer(props) {
  return (
    <div>
      <Login
        getUser={props.getUser}
        setAuthSuccess={props.setAuthSuccess}
        setDataUser={props.setDataUser}
        isAuthenticated={props.isAuthenticated}
        closeButton={props.closeButton}
        close={props.close}
        inputWidth="370px"
        blockFormHeight="350px"
        blockFormPadding="70px"
        fontSizeTitle="40px"
        inputPadding="15px"
        inputRadius="10px"
        btnFormMargin="10px"
        btnFormWidth="200px"
      />
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  setDataUser,
  setAuthSuccess,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
