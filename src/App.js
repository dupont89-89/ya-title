import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./footer/Footer";
import { setAuthSuccess } from "./redux/user-reducer/user-reducer";
import { connect } from "react-redux";
import { getUser, loginUser } from "./Api/api-user-login";
import { useEffect, useLayoutEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import HeaderContainer from "./header/HeaderContainer";
import ToolsContentContainer from "./ToolsContent/ToolsContentContainer";
import BalancePageContainer from "./BalancePage/BalancePageContainer";
import Loading from "./app-function/Loading";
import LogoPtahini from "./img/logo/PTAHINI-nav.png";
import io from "socket.io-client";
import { getNotificationMessage } from "./Api/api-support";
import AdminContainer from "./Admin/AdminContainer";
import AdminUserContainer from "./Admin/AdminUser/AdminUserContainer";
import AdminPanelContainer from "./header/AdminPanel/AdminPanelContainer";
import ProfileUserContainer from "./ProfileUser/ProfileUserContainer";
import Login from "./Auth/Login/Login";
import BalancePageLinkReg from "./BalancePage/BalanceParts/BalancePageLinkReg";
import NotificationPageContainer from "./header/Notification/NotificationPageContainer";
import TestPay from "./Admin/Test/TestPay";
import TrackingReferalUrl from "./Auth/Referal/TrackingReferalUrl";
import PageReferalContainer from "./ProfileUser/Referal/PageReferalContainer";
import SuccessPay from "./BalancePage/SuccessPay";
import ScoreUserContainer from "./Admin/ScoreUser/ScoreUserContainer";
import MobileHeaderContainer from "./header/MobileHeader/MobileHeaderContainer";
import MobileMenu from "./Menu/MobileMenu/MobileMenu";
import ResetPasswordForm from "./Auth/ResetPassword/ResetPasswordForm";
import NotFound from "./parts/NotFound";
import FailPayment from "./BalancePage/FailPayment";

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
  role,
  loginUser,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [modalInputWidth, setModalInputWidth] = useState("370px");
  const [modalBlockFormPadding, setModalBlockFormPadding] = useState("70px");
  const [modalFontSizeTitle, setModalFontSizeTitle] = useState("40px");
  const [modalWidth, setModalWidth] = useState("50%");

  useLayoutEffect(() => {
    // Определяем ширину модального окна в зависимости от ширины экрана
    const width = window.innerWidth;
    if (width >= 768) {
      setModalWidth("50%");
      setModalInputWidth("370px");
      setModalBlockFormPadding("70px");
      setModalFontSizeTitle("40px");
    } else {
      setModalWidth("80%");
      setModalInputWidth("100%");
      setModalBlockFormPadding("10px");
      setModalFontSizeTitle("25px");
    }
  }, []);

  useEffect(() => {
    // Создаем соединение с сервером Socket.IO
    const socket = io(serverUrl);
    console.log("Соединение установленно");
    // Прослушиваем событие "dailyUpdate" от сервера
    socket.on("dailyUpdate", () => {
      // Выполняем функцию при получении события "dailyUpdate"
      console.log("Received daily update from server");
      // Ваша логика здесь
      const userId = JSON.parse(localStorage.getItem("userId"));
      getUser(userId);
      getNotificationMessage(userId);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userId = JSON.parse(localStorage.getItem("userId"));
        if (userId) {
          if (isAuthenticated) {
            await Promise.all([getUser(userId)]);
          }
          setAuthSuccess();
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
      {role === "admin" && <AdminPanelContainer />}
      {isAuthenticated ? null : <TrackingReferalUrl />}
      <div className="blockOsn">
        <HeaderContainer />
        <MobileHeaderContainer />
        <article>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<ToolsContentContainer />} />
            <Route path="/:tools" element={<ToolsContentContainer />} />
            <Route path="/balance/" element={<BalancePageContainer />} />
            <Route
              path="/history-message"
              element={
                isAuthenticated ? (
                  <NotificationPageContainer />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    loginUser={loginUser}
                    inputWidth={modalInputWidth}
                    blockFormHeight="350px"
                    blockFormPadding={modalBlockFormPadding}
                    fontSizeTitle={modalFontSizeTitle}
                    inputPadding="15px"
                    inputRadius="10px"
                    btnFormMargin="10px"
                    btnFormWidth="200px"
                    registration={
                      <BalancePageLinkReg
                        linkRehName="Регистрация"
                        color="#000"
                        width={modalWidth}
                      />
                    }
                  />
                )
              }
            />

            <Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <ProfileUserContainer />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/referal"
              element={
                isAuthenticated ? (
                  <PageReferalContainer />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/reset-password/*"
              element={
                !isAuthenticated ? <ResetPasswordForm /> : <Navigate to="/" />
              }
            />

            <Route
              path="/success-pay"
              element={
                isAuthenticated ? <SuccessPay /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/fail-payment"
              element={
                isAuthenticated ? <FailPayment /> : <Navigate to="/login" />
              }
            />
            {role === "admin" && (
              <>
                <Route path="/admin" exact element={<AdminContainer />} />
                <Route path="/admin/user" element={<AdminUserContainer />} />
                <Route path="/admin/test" exact element={<TestPay />} />
                <Route path="/admin/score" element={<ScoreUserContainer />} />
              </>
            )}
          </Routes>
        </article>
        <footer>
          <Footer />
        </footer>
      </div>
      <MobileMenu />
    </div>
  );
}

const mapDispatchToProps = {
  setAuthSuccess,
  getUser,
  getNotificationMessage,
  loginUser,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    role: state.user.dataUser.role,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
