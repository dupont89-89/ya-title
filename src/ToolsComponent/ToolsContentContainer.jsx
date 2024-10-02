import React from "react";
import { connect } from "react-redux";
import ToolsContent from "./ToolsContent";

function ToolsContentContainer(props) {
  return (
    <div>
      <ToolsContent isAuthenticated={props.isAuthenticated} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolsContentContainer);
