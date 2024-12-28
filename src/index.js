import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ruRU } from "@mui/x-data-grid/locales";

const theme = createTheme({
  typography: {
    fontFamily: ["Raleway", "Arial", "sans-serif"].join(","),
  },
  palette: {
    success: {
      main: "#009688",
    },
    white: {
      main: "#fff",
    },
    mat: {
      main: "#21b5ae",
    },
  },
  ruRU,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

const helmetContext = {};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <HelmetProvider context={helmetContext}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
