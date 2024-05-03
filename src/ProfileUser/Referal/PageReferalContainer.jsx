import React from "react";
import { connect } from "react-redux";
import PageReferal from "./PageReferal";

function PageReferalContainer(props) {
  return <PageReferal referal={props.referal} userId={props.userId} />;
}

const mapStateToProps = (state) => {
  return {
    referal: state.user.dataUser.referal,
    userId: state.user.dataUser.userId,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageReferalContainer);
