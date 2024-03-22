import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {
  setDataUser,
  setAuthSuccess,
} from "./../../redux/user-reducer/user-reducer";

function LoginContainer(props) {
  return (
    <div>
      <Login
        getUser={props.getUser}
        setAuthSuccess={props.setAuthSuccess}
        setDataUser={props.setDataUser}
        isAuthenticated={props.isAuthenticated}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
