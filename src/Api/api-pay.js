import axios from "axios";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api`,
});

export const addPayScore = async (OutSum, InvId, userId) => {
  try {
    const response = await instance.get(
      `/pay/success-payment-score?OutSum=${OutSum}&InvId=${InvId}&userId=${userId}`
    );
    return response.data;
  } catch (error) {
    // Обработка ошибок здесь
    console.error("Error fetching user data:", error);
    throw error; // Пробросить ошибку для обработки в вызывающем коде
  }
};

export const successPay = async (params) => {
  const { OutSum, InvId, SignatureValue, IsTest } = params;
  console.log(OutSum, InvId, SignatureValue, IsTest);
  try {
    const response = await instance.get(
      `/pay/success-payment?OutSum=${OutSum}&InvId=${InvId}&SignatureValue=${SignatureValue}&IsTest=${IsTest}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    // Обработка ошибок здесь
    console.error("Error fetching user data:", error);
    throw error; // Пробросить ошибку для обработки в вызывающем коде
  }
};
