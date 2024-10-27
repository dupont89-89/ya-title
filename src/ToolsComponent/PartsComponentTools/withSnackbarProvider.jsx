import React from "react";
import { SnackbarProvider } from "notistack";

const withSnackbarProvider = (Component) => (props) => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Component {...props} />
    </SnackbarProvider>
  );
};

export default withSnackbarProvider;
