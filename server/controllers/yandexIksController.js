const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const pLimit = require("p-limit").default || require("p-limit");
const proxiesData = require("../proxies/proxiesData").proxiesData;

puppeteer.use(StealthPlugin());

async function solveCaptcha(page, siteUrl) {
  console.log("Проверка на наличие капчи...");

  // Пытаемся найти элемент с классом Achievement-SqiNumber
  const sqiElement = await page.$(".Achievement-SqiNumber");

  if (sqiElement) {
    // Если элемент найден, сразу отправляем данные на фронт
    const sqiText = await page.$eval(".Achievement-SqiNumber", (div) =>
      div.textContent.trim()
    );
    console.log(`Найден элемент с SQI: ${sqiText}`);
    return { sqi: sqiText }; // Отправляем данные на фронт
  }

  // Если элемент не найден, ищем чекбокс для капчи
  console.log("Элемент с SQI не найден. Ищем чекбокс для капчи...");
  const captchaCheckbox = await page.$(
    'input[type="submit"].CheckboxCaptcha-Button'
  );

  if (captchaCheckbox) {
    console.log("Чекбокс капчи найден, нажимаем на него...");

    // Кликаем по чекбоксу
    await captchaCheckbox.click();

    // Таймаут в 25 секунд
    console.log("Ожидаем решения капчи...");
    await new Promise((resolve) => setTimeout(resolve, 25000)); // Просто ждём 25 секунд

    // После таймаута снова пытаемся найти элемент с SQI
    const sqiElementAfterCaptcha = await page.$(".Achievement-SqiNumber");

    if (sqiElementAfterCaptcha) {
      // Если элемент найден, сразу отправляем данные на фронт
      const sqiText = await page.$eval(".Achievement-SqiNumber", (div) =>
        div.textContent.trim()
      );
      console.log(`Найден элемент с SQI: ${sqiText}`);
      return { sqi: sqiText }; // Отправляем данные на фронт
    } else {
      console.log("Элемент с SQI по-прежнему не найден после решения капчи.");
    }
  } else {
    console.log("Чекбокс капчи не найден. Возможно, капча не требуется.");
  }

  return {
    sqi: null,
    message: "Ошибка при решении капчи или отсутствии SQI элемента",
  };
}

async function fetchSiteInfo(site, proxy, browser) {
  const url = `https://webmaster.yandex.ru/siteinfo/?site=${site}`;
  const [auth, hostPort] = proxy.split("@");
  const [username, password] = auth.split(":");
  const [host, port] = hostPort.split(":");

  const page = await browser.newPage();

  try {
    await page.authenticate({ username, password });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ru-RU,ru;q=0.9",
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    const result = await solveCaptcha(page, url);

    if (result && result.sqi) {
      console.log(`SQI для сайта ${site}: ${result.sqi}`);
      return { site, sqi: result.sqi };
    } else {
      return {
        site,
        sqi: "Ошибка",
        message: "Ошибка при решении капчи или отсутствии SQI элемента",
      };
    }
  } catch (error) {
    console.error(`Ошибка для сайта ${site}:`, error);
    try {
      const pageContent = await page.content();
      console.log(`HTML-код страницы для сайта ${site}:\n`, pageContent);
    } catch (saveError) {
      console.error(
        `Не удалось получить HTML-код для сайта ${site}:`,
        saveError
      );
    }
    return { site, sqi: "Ошибка", message: "Ошибка при выполнении запроса" };
  } finally {
    await page.close();
  }
}

exports.getIksContController = async (req, res) => {
  const limit = pLimit(10);

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--lang=ru-RU,ru",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  try {
    const sites = req.body;

    if (!Array.isArray(sites) || sites.length === 0) {
      return res.status(400).send({
        message: "Неверный запрос: отсутствует параметр sites или он пуст",
      });
    }

    if (!Array.isArray(proxiesData) || proxiesData.length === 0) {
      return res.status(500).send({
        message:
          "Внутренняя ошибка сервера: массив прокси пуст или не определен",
      });
    }

    const results = await Promise.all(
      sites.map((site, index) =>
        limit(() => {
          const proxy = proxiesData[index % proxiesData.length];
          return fetchSiteInfo(site, proxy, browser);
        })
      )
    );

    return res.status(200).send({
      message: "Сбор информации о ИКС сайтов завершен",
      results,
    });
  } catch (error) {
    console.error("Ошибка в getIksContController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  } finally {
    await browser.close();
  }
};

// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const pLimit = require("p-limit").default || require("p-limit");
// const proxiesData = require("../proxies/proxiesData").proxiesData;

// puppeteer.use(StealthPlugin());

// async function solveCaptcha(page, siteUrl) {
//   console.log("Проверка на наличие капчи...");

//   // Пытаемся найти элемент с классом Achievement-SqiNumber
//   const sqiElement = await page.$(".Achievement-SqiNumber");

//   if (sqiElement) {
//     // Если элемент найден, сразу отправляем данные на фронт
//     const sqiText = await page.$eval(".Achievement-SqiNumber", (div) =>
//       div.textContent.trim()
//     );
//     console.log(`Найден элемент с SQI: ${sqiText}`);
//     return { sqi: sqiText }; // Отправляем данные на фронт
//   }

//   // Если элемент не найден, ищем чекбокс для капчи
//   console.log("Элемент с SQI не найден. Ищем чекбокс для капчи...");
//   const captchaCheckbox = await page.$(
//     'input[type="submit"].CheckboxCaptcha-Button'
//   );

//   if (captchaCheckbox) {
//     console.log("Чекбокс капчи найден, нажимаем на него...");

//     // Кликаем по чекбоксу
//     await captchaCheckbox.click();

//     // Вместо waitForTimeout, ожидаем появления скрытого элемента
//     console.log("Ожидаем появления элемента после капчи...");
//     await page.waitForSelector(".captcha-processed", {
//       visible: false,
//       timeout: 25000,
//     }); // Элемент, который появляется после капчи

//     // Получаем HTML-код страницы после клика по чекбоксу
//     const pageContent = await page.content();
//     console.log("HTML-код страницы после клика по чекбоксу:\n", pageContent);
//   } else {
//     console.log("Чекбокс капчи не найден. Возможно, капча не требуется.");
//   }
// }

// async function fetchSiteInfo(site, proxy, browser) {
//   const url = `https://webmaster.yandex.ru/siteinfo/?site=${site}`;
//   const [auth, hostPort] = proxy.split("@");
//   const [username, password] = auth.split(":");
//   const [host, port] = hostPort.split(":");

//   const page = await browser.newPage();

//   try {
//     await page.authenticate({ username, password });
//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
//     );
//     await page.setExtraHTTPHeaders({
//       "Accept-Language": "ru-RU,ru;q=0.9",
//     });

//     await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

//     const result = await solveCaptcha(page, url);

//     if (result && result.sqi) {
//       console.log(`SQI для сайта ${site}: ${result.sqi}`);
//       return { site, sqi: result.sqi };
//     } else {
//       return {
//         site,
//         sqi: null,
//         message: "Ошибка при решении капчи или отсутствии SQI элемента",
//       };
//     }
//   } catch (error) {
//     console.error(`Ошибка для сайта ${site}:`, error);
//     try {
//       const pageContent = await page.content();
//       console.log(`HTML-код страницы для сайта ${site}:\n`, pageContent);
//     } catch (saveError) {
//       console.error(
//         `Не удалось получить HTML-код для сайта ${site}:`,
//         saveError
//       );
//     }
//     return { site, sqi: null, message: "Ошибка при выполнении запроса" };
//   } finally {
//     await page.close();
//   }
// }

// exports.getIksContController = async (req, res) => {
//   const limit = pLimit(10);

//   const browser = await puppeteer.launch({
//     headless: true,
//     args: [
//       "--no-sandbox",
//       "--disable-setuid-sandbox",
//       "--lang=ru-RU,ru",
//       "--disable-blink-features=AutomationControlled",
//     ],
//   });

//   try {
//     const sites = req.body;

//     if (!Array.isArray(sites) || sites.length === 0) {
//       return res.status(400).send({
//         message: "Неверный запрос: отсутствует параметр sites или он пуст",
//       });
//     }

//     if (!Array.isArray(proxiesData) || proxiesData.length === 0) {
//       return res.status(500).send({
//         message:
//           "Внутренняя ошибка сервера: массив прокси пуст или не определен",
//       });
//     }

//     const results = await Promise.all(
//       sites.map((site, index) =>
//         limit(() => {
//           const proxy = proxiesData[index % proxiesData.length];
//           return fetchSiteInfo(site, proxy, browser);
//         })
//       )
//     );

//     return res.status(200).send({
//       message: "Сбор информации о ИКС сайтов завершен",
//       results,
//     });
//   } catch (error) {
//     console.error("Ошибка в getIksContController:", error);
//     return res.status(500).send({ message: "Внутренняя ошибка сервера" });
//   } finally {
//     await browser.close();
//   }
// };
