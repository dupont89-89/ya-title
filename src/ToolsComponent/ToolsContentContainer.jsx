import React from "react";
import { connect } from "react-redux";
import ToolsContent from "./ToolsContent";
import { SnackbarProvider } from "notistack";

function ToolsContentContainer(props) {
  return (
    <div>
      <SnackbarProvider maxSnack={3}>
        <ToolsContent {...props} isAuthenticated={props.isAuthenticated} />
      </SnackbarProvider>
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
