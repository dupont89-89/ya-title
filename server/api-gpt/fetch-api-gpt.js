import axios from "axios";

const url = process.env.API_GPT_URL;
const token = process.env.API_GPT_TOKEN;

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const fetchApiGptText = async (text) => {
  const body = {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `${text}` }],
    max_tokens: 150,
  };

  try {
    const response = await axios.post(url, body, axiosConfig);
    console.dir(response.data, { depth: null, colors: true });
    return response.data;
  } catch (err) {
    console.error("Ошибка в ответе API GPT", err);
  }
};
