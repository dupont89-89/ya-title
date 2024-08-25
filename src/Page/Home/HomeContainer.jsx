import React from "react";
import Home from "./Home";
import { connect } from "react-redux";

function HomeContainer(props) {
  const { isAuthenticated } = props;
  return (
    <div>
      <Home isAuthenticated={isAuthenticated} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
