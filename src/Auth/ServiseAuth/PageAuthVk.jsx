import React, { useEffect, useState } from "react";
import CircularWithValueLabel from "../../app-function/Loading";
import * as VKID from "@vkid/sdk";
import { authUserVk, getUser } from "../../Api/api-user-login";
import { connect } from "react-redux";
import { setAuthSuccess } from "../../redux/user-reducer/user-reducer";

function PageAuthVk(props) {
  const [params, setParams] = useState({
    code: "",
    expires_in: "",
    device_id: "",
    state: "",
    type: "",
  });

  const [loading, setLoading] = useState(true); // для состояния загрузки

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    debugger;
    setParams({
      code: queryParams.get("code") || "",
      expires_in: queryParams.get("expires_in") || "",
      device_id: queryParams.get("device_id") || "",
      state: queryParams.get("state") || "",
      type: queryParams.get("type") || "",
    });
  }, []);

  const exchangeCodeAndFetchUserInfo = async (code, device_id) => {
    try {
      console.log("Before VKID.Config.init");
      VKID.Config.init({
        app: 52208411, // укажите ваш client_id
        redirectUrl: "http://localhost/signup/vk/", // redirectUrl
      });

      console.log("Before VKID.Auth.exchangeCode");
      const tokenResponse = await VKID.Auth.exchangeCode(code, device_id);
      console.log("Token response:", tokenResponse);

      if (!tokenResponse || !tokenResponse.access_token) {
        console.error(
          "Некорректный ответ от VKID.Auth.exchangeCode:",
          tokenResponse
        );
        throw new Error("Ошибка обмена кода на токен");
      }

      console.log("Before VKID.Auth.userInfo");
      const { access_token } = tokenResponse;
      const userInfo = await VKID.Auth.userInfo(access_token);
      console.log("User info:", userInfo);

      const userPayload = userInfo.user;

      console.log("Before authUserVk call");
      const res = await authUserVk({
        first_name: userPayload.first_name,
        last_name: userPayload.last_name,
        email: userPayload.email,
        avatar: userPayload.avatar,
        user_id: userPayload.user_id,
      });
      console.log("Server response:", res);

      if (res.token) {
        console.log("Before saving token and calling props");
        const token = res.token;
        const userId = res.dataUser.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", JSON.stringify(userId));
      }
    } catch (error) {
      console.error("Ошибка при обмене кода на токен:", error.message || error);
    } finally {
      console.log("Finally block reached");
      setLoading(false);
      // Проверяем, есть ли props.getUser и props.setAuthSuccess
      const userId = JSON.parse(localStorage.getItem("userId"));
      console.log("Props getUser:", props.getUser);
      console.log("Props setAuthSuccess:", props.setAuthSuccess);
      props.getUser(userId);
      props.setAuthSuccess();
    }
  };

  useEffect(() => {
    if (params.code && params.device_id) {
      console.log(
        "Calling exchangeCodeAndFetchUserInfo with code and device_id"
      );
      exchangeCodeAndFetchUserInfo(params.code, params.device_id);
    } else {
      setLoading(false); // Если нет параметров, загрузка завершается
    }
  }, [params.code, params.device_id]);

  return loading ? <CircularWithValueLabel /> : null;
}

let mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

const mapDispatchToProps = {
  setAuthSuccess,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageAuthVk);
