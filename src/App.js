import "./App.css";
import Test from "./Test/Test";
import { Route, Routes } from "react-router-dom";
import Footer from "./footer/Footer";
import { setAuthSuccess } from "./redux/user-reducer/user-reducer";
import { connect } from "react-redux";
import { getUser } from "./Api/api-user-login";
import { useEffect, useState } from "react";
import HeaderContainer from "./header/HeaderContainer";
import ToolsContentContainer from "./ToolsContent/ToolsContentContainer";

function App({ setAuthSuccess, getUser, isAuthenticated }) {
  const [isLoading, setIsLoading] = useState(true);

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
  }, [isAuthenticated, getUser, setAuthSuccess]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="App">
      {/* <Test /> */}
      <div className="blockOsn">
        <HeaderContainer />
        <article>
          <Routes>
            <Route path="/" element={<ToolsContentContainer />} />
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
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
