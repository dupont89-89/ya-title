import React from "react";
import { connect } from "react-redux";
import ModalNoLvt from "./ModalNoLvt";

function ModalNoLvtContainer(props) {
  return (
    <ModalNoLvt
      userId={props.userId}
      totalLvt={props.totalLvt}
      isAuthenticated={props.isAuthenticated}
      sumLvt={props.sumLvt}
      onClose={props.onClose}
    />
  );
}

let mapStateToProps = (state) => {
  return {
    userId: state.user.dataUser.userId,
    isAuthenticated: state.user.isAuthenticated,
    lvt: state.user.dataUser.lvt,
    totalLvt: state.user.dataUser.totalLvt,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalNoLvtContainer);
