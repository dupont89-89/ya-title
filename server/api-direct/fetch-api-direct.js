const axios = require("axios");
require("dotenv").config();

const url = "https://api-sandbox.direct.yandex.ru/v4/json/";
const token = process.env.API_DIRECT_TOKEN;
const login = process.env.API_DIRECT_LOGIN;

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
};

const createNewWordstatReport = async (phrases, geoId) => {
  console.log(
    "Creating new wordstat report with phrases:",
    phrases,
    "and geoId:",
    geoId
  );
  const body = {
    method: "CreateNewWordstatReport",
    param: {
      Phrases: phrases,
      GeoID: geoId, // Убедитесь, что geoId передается как массив
    },
    token: token,
  };

  try {
    const response = await axios.post(url, body, axiosConfig);
    console.log("Response from CreateNewWordstatReport:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error in createNewWordstatReport:", err);
  }
};

const getWordstatReportList = async () => {
  console.log("Getting wordstat report list");
  const body = {
    method: "GetWordstatReportList",
    token: token,
  };

  try {
    const response = await axios.post(url, body, axiosConfig);
    console.log("Response from GetWordstatReportList:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error in getWordstatReportList:", err);
  }
};

const deleteWordstatReport = async (reportId) => {
  console.log("Deleting wordstat report with reportId:", reportId);
  const body = {
    method: "DeleteWordstatReport",
    param: reportId,
    token: token,
  };

  try {
    const response = await axios.post(url, body, axiosConfig);
    const result = response.data;
    if (result.data === 1) {
      console.log(`ReportID: ${reportId} successfully deleted.`);
    } else {
      console.log(`ReportID: ${reportId} not deleted, try again`);
      console.log(result);
      return false;
    }
  } catch (err) {
    console.error("Error in deleteWordstatReport:", err);
  }
};

const getWordstatReport = async (reportId) => {
  console.log("Getting wordstat report with reportId:", reportId);
  const body = {
    method: "GetWordstatReport",
    param: reportId,
    token: token,
  };

  try {
    const response = await axios.post(url, body, axiosConfig);
    console.log("Response from GetWordstatReport:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error in getWordstatReport:", err);
  }
};

const getClientsUnits = async () => {
  console.log("Getting client's units");
  const body = {
    method: "GetClientsUnits",
    param: [login],
    token: token,
  };

  try {
    const response = await axios.post(url, body, axiosConfig);
    const result = response.data;
    console.log(result);
    if (!result.data) {
      console.log("баллы не получены", result.data);
      return;
    }
    const number = result.data[0].UnitsRest;
    console.log("баллы", number);
    return number;
  } catch (err) {
    console.error("Error in getClientsUnits:", err);
  }
};

const deleteAllReports = async () => {
  console.log("Deleting all reports");
  const reportList = await getWordstatReportList();
  if (!reportList || !reportList.data) return;

  for (const report of reportList.data) {
    await deleteWordstatReport(report.ReportID);
  }
};

const waitForReport = async (reportId) => {
  console.log("Waiting for report with reportId:", reportId);
  let isReady = false;
  while (!isReady) {
    const reportList = await getWordstatReportList();
    if (!reportList || !reportList.data) return false;

    for (const report of reportList.data) {
      if (report.ReportID === reportId && report.StatusReport === "Done") {
        isReady = true;
        console.log("Отчет готов!");
        return true;
      }
    }

    console.log("Отчет еще не готов. Ждем...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};

const dataRequest = async (reportId) => {
  console.log("Requesting data for reportId:", reportId);
  const result = await getWordstatReport(reportId);
  if (!result || !result.data) return;

  const resultData = result.data.map((item) => {
    return {
      phrase: item.Phrase,
      shows: item.SearchedWith[0].Shows,
    };
  });
  console.log("Data request result:", resultData);
  return resultData;
};

const getData = async (phrases, geoId) => {
  console.log("getData called with phrases:", phrases, "and geoId:", geoId);
  await deleteAllReports();

  const newReport = await createNewWordstatReport(phrases, geoId);
  if (!newReport || !newReport.data) return;

  await new Promise((resolve) => setTimeout(resolve, 5000));
  const reportReady = await waitForReport(newReport.data);
  if (!reportReady) {
    console.log("Report not ready in time");
    return;
  }

  await getClientsUnits();

  const data = await dataRequest(newReport.data);
  console.log("Final data:", data);
  return data;
};

module.exports = {
  createNewWordstatReport,
  getWordstatReportList,
  deleteWordstatReport,
  getWordstatReport,
  getClientsUnits,
  deleteAllReports,
  waitForReport,
  dataRequest,
  getData,
};
