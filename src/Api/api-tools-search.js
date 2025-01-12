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

// export const getFetchkey = async (query) => {
//   try {
//     const response = await instance.post("/tools/fetch-key", { query });
//     return response.data;
//   } catch (error) {
//     // Обработка ошибок здесь
//     console.error("Ошибка запроса счетов:", error);
//     throw error; // Пробросить ошибку для обработки в вызывающем коде
//   }
// };
// export const getFetchkey = async (queries) => {
//   try {
//     const chunkSize = 100; // Размер куска
//     const results = [];

//     // Разбиваем массив queries на части по 100 элементов
//     for (let i = 0; i < queries.length; i += chunkSize) {
//       const chunk = queries.slice(i, i + chunkSize);
//       const response = await instance.post("/tools/fetch-key", {
//         query: chunk,
//       });
//       debugger;

//       // Проверяем, что response.data является массивом
//       if (Array.isArray(response.data.result)) {
//         results.push(...response.data.result); // Собираем результаты
//       } else {
//         console.error(
//           "Ожидался массив в response.data.result, но получено:",
//           response.data.result
//         );
//         throw new Error("Некорректный формат данных от сервера");
//       }
//     }

//     return results; // Возвращаем все результаты
//   } catch (error) {
//     console.error("Ошибка запроса счетов:", error);
//     throw error; // Пробросить ошибку для обработки в вызывающем коде
//   }
// };
export const getFetchkey = async (queries) => {
  try {
    const chunkSize = 100; // Размер куска
    const results = [];

    // Разбиваем массив queries на части по 100 элементов
    for (let i = 0; i < queries.length; i += chunkSize) {
      const chunk = queries.slice(i, i + chunkSize);
      const response = await instance.post("/tools/fetch-key", {
        query: chunk,
      });

      // Проверяем, что response.data существует
      if (!response.data) {
        console.error("Ответ от сервера не содержит данных:", response);
        throw new Error("Некорректный формат данных от сервера");
      }

      // Обрабатываем response.data в зависимости от его типа
      if (Array.isArray(response.data)) {
        // Если response.data — массив, добавляем его элементы в results
        results.push(...response.data);
      } else if (response.data.result && Array.isArray(response.data.result)) {
        // Если response.data.result — массив, добавляем его элементы в results
        results.push(...response.data.result);
      } else if (typeof response.data === "object" && response.data.result) {
        // Если response.data.result — не массив, но существует, добавляем его как отдельный элемент
        results.push(response.data.result);
      } else {
        // Если response.data — строка или другой тип, добавляем его как отдельный элемент
        results.push(response.data);
      }
    }

    return results; // Возвращаем все результаты
  } catch (error) {
    console.error("Ошибка запроса счетов:", error);
    throw error; // Пробросить ошибку для обработки в вызывающем коде
  }
};
