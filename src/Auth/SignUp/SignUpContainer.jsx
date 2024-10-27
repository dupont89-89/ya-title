import React from "react";
import Signup from "./SignUp";
import { connect } from "react-redux";
import { setAuthSuccess } from "../../redux/user-reducer/user-reducer";
import { getUser, loginUser } from "../../Api/api-user-login";
import { addRefUser } from "../../Api/api-referal";
import { TitleComponent } from "../../Function/TitleComponent";

function SignUpContainer(props) {
  return (
    <>
      <TitleComponent
        description="Пройдите простую регистрацию в нашем сервисе онлайн инструментов Ptahini"
        title="Регистрация в сервисе инструментов Ptahini"
      />
      <Signup
        getUser={props.getUser}
        setAuthSuccess={props.setAuthSuccess}
        close={props.close}
        closeButton={props.closeButton}
        addRefUser={props.addRefUser}
        loginUser={props.loginUser}
      />
    </>
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
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
