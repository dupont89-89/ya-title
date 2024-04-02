import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./footer/Footer";
import { setAuthSuccess } from "./redux/user-reducer/user-reducer";
import { connect } from "react-redux";
import { getUser } from "./Api/api-user-login";
import { useEffect, useState } from "react";
import HeaderContainer from "./header/HeaderContainer";
import ToolsContentContainer from "./ToolsContent/ToolsContentContainer";
import BalancePageContainer from "./BalancePage/BalancePageContainer";
import Loading from "./app-function/Loading";
import LogoPtahini from "./img/logo/PTAHINI-nav.png";
import io from "socket.io-client";
import { getNotificationMessage } from "./Api/api-support";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("./config.dev");
} else {
  config = require("./config.prod");
}

const serverUrl = `${config.REACT_APP_SERVER_URL}`;

function App({
  setAuthSuccess,
  getUser,
  isAuthenticated,
  getNotificationMessage,
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Создаем соединение с сервером Socket.IO
  const socket = io(serverUrl);

  // Прослушиваем событие "dailyUpdate" от сервера
  socket.on("dailyUpdate", () => {
    // Выполняем функцию при получении события "dailyUpdate"
    console.log("Received daily update from server");
    // Ваша логика здесь
    const userId = JSON.parse(localStorage.getItem("userId"));
    getNotificationMessage(userId);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (userId) {
          setAuthSuccess();
        }
        if (isAuthenticated) {
          await Promise.all([getUser(userId)]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="lodingBlockApp">
        <span className="logoLoading">
          <img alt="" src={LogoPtahini} />
        </span>
        <Loading />
      </div>
    );
  }

  return (
    <div className="App">
      {/* <Test /> */}
      <div className="blockOsn">
        <HeaderContainer />
        <article>
          <Routes>
            <Route path="/" element={<ToolsContentContainer />} />
            <Route path="/balance" element={<BalancePageContainer />} />
          </Routes>
        </article>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  setAuthSuccess,
  getUser,
  getNotificationMessage,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
