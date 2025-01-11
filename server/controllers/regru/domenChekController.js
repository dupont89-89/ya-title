import axios from "axios";

export const getDomenChekController = async (req, res) => {
  console.log("Получен запрос на обработку доменов:", req.body);
  const params = {
    domains: req.body,
    username: process.env.USERNAME_REGRU,
    password: process.env.PASSWORD_REGRU,
  };

  const form = {
    input_format: "json",
    output_format: "json",
    io_encoding: "utf8",
    input_data: JSON.stringify(params),
    show_input_params: 0,
    username: process.env.USERNAME_REGRU,
    password: process.env.PASSWORD_REGRU,
  };

  const axiosConfig = {
    method: "POST",
    url: "https://api.reg.ru/api/regru2/domain/check",
    data: form,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios(axiosConfig);
    console.log("Status", response.status);
    console.log("Headers", response.headers);
    console.log("Response received", response.data.answer);
    return res
      .status(200)
      .send({ results: response.data.answer, message: "Отправлены домены" });
  } catch (error) {
    console.error("Ошибка при обращении в поддержку:", error);
    return res.status(500).send({ message: "Ошибка сервера" });
  }
};
