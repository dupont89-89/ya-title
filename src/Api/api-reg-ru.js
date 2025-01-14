import axios from "axios";

let config;

if (process.env.NODE_ENV === "development") {
  config = require("../config.dev");
} else {
  config = require("../config.prod");
}

const instance = axios.create({
  baseURL: `${config.REACT_APP_SERVER_URL}/api/reg-ru`,
});

// export const getDomenChekRegRu = (dataDomen) => {
//   return async (dispatch) => {
//     try {
//       const response = await instance.post(`/chek-domen`, dataDomen);
//       debugger;
//       return response.data.results;
//     } catch (error) {
//       console.error(
//         "Ошибка отправки доменов проверки доступности регистрации!:",
//         error
//       );
//       throw error;
//     }
//   };
// };

// Функция для повторных попыток
const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Повторная попытка... Осталось попыток: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay)); // Ждем перед повторной попыткой
      return retry(fn, retries - 1, delay); // Рекурсивно вызываем функцию
    }
    throw error; // Если попытки закончились, выбрасываем ошибку
  }
};

export const getDomenChekRegRu = (dataDomen) => {
  return async (dispatch) => {
    const chunkSize = 100; // Уменьшенный размер чанка
    const chunks = [];
    console.log("Пришло в dataDomen:", dataDomen); // Для отладки

    // Разбиваем массив на части
    for (let i = 0; i < dataDomen.length; i += chunkSize) {
      chunks.push(dataDomen.slice(i, i + chunkSize));
    }

    const allResults = [];
    for (let chunk of chunks) {
      try {
        // Используем функцию retry для отправки запроса
        const response = await retry(async () => {
          const result = await instance.post(`/chek-domen`, chunk);
          return result;
        });

        console.log("Ответ от API:", response.data); // Для отладки

        // Проверяем, что response.data.results существует и является массивом
        if (
          response.data.results &&
          response.data.results.domains &&
          Array.isArray(response.data.results.domains)
        ) {
          allResults.push(...response.data.results.domains); // Используем spread-оператор
        } else {
          console.error(
            "Ожидался массив domains, но получен:",
            response.data.results
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 504) {
          console.error("Сервер Reg.ru недоступен. Попробуйте позже.");
        } else {
          console.error(
            "Ошибка отправки доменов проверки доступности регистрации!:",
            error
          );
        }
        throw error;
      }
    }
    return { domains: allResults }; // Возвращаем данные в ожидаемом формате
  };
};
