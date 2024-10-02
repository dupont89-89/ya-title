const axios = require("axios");

const fetchApiWhois = async (domain) => {
  const url = process.env.URL_WHOIS;
  const apiKey = process.env.API_WHOIS_KEY;
  const apiHost = process.env.API_WHOIS_HOST;

  const axiosConfig = {
    method: "GET",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": apiHost,
    },
    params: {
      domain: domain,
      format: "json",
      _forceRefresh: "0",
    },
  };

  try {
    const response = await axios.request(url, axiosConfig);
    console.dir(response.data, { depth: null, colors: true });
    return response.data;
  } catch (err) {
    console.error("Ошибка в запросе к SEO API", err);
  }
};

module.exports = {
  fetchApiWhois,
};
