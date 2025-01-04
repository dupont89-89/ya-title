const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const pLimit = require("p-limit").default || require("p-limit");
const proxiesData = require("../proxies/proxiesData").proxiesData;

puppeteer.use(StealthPlugin());

async function solveCaptcha(page, siteUrl) {
  console.log("Проверка на наличие капчи...");

  const sqiElement = await page.$(".Achievement-SqiNumber");

  if (sqiElement) {
    const sqiText = await page.$eval(".Achievement-SqiNumber", (div) =>
      div.textContent.trim()
    );

    if (sqiText.includes("—")) {
      console.log("Найдено значение с длинным тире, устанавливаем SQI: 0");
      return { sqi: 0 };
    }

    console.log(`Найден элемент с SQI: ${sqiText}`);
    return { sqi: sqiText };
  }

  console.log("Элемент с SQI не найден. Ищем чекбокс для капчи...");
  const captchaCheckbox = await page.$(
    'input[type="submit"].CheckboxCaptcha-Button'
  );

  if (captchaCheckbox) {
    console.log("Чекбокс капчи найден, нажимаем на него...");
    await captchaCheckbox.click();
    console.log("Ожидаем решения капчи...");
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Используем setTimeout вместо page.waitForTimeout Было 15000

    const sqiElementAfterCaptcha = await page.$(".Achievement-SqiNumber");
    if (sqiElementAfterCaptcha) {
      const sqiText = await page.$eval(".Achievement-SqiNumber", (div) =>
        div.textContent.trim()
      );

      if (sqiText.includes("—")) {
        console.log(
          "Найдено значение с длинным тире после капчи, устанавливаем SQI: 0"
        );
        return { sqi: 0 };
      }

      console.log(`Найден элемент с SQI после капчи: ${sqiText}`);
      return { sqi: sqiText };
    }
  }

  console.log("Элемент с SQI не найден после всех проверок.");
  return { sqi: "Ошибка" };
}

async function fetchSiteInfo(site, proxy, browser) {
  const url = `https://webmaster.yandex.ru/siteinfo/?site=${site}`;
  const [auth, hostPort] = proxy.split("@");
  const [username, password] = auth.split(":");
  const [host, port] = hostPort.split(":");

  const page = await browser.newPage();
  try {
    // Устанавливаем таймауты для этой страницы
    page.setDefaultNavigationTimeout(50000); //БЫло 250000
    page.setDefaultTimeout(50000); //БЫло 250000

    await page.authenticate({ username, password });
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
    );
    await page.setExtraHTTPHeaders({
      "Accept-Language": "ru-RU,ru;q=0.9",
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 50000 }); //БЫло 250000

    const result = await solveCaptcha(page, url);

    if (result && result.sqi !== null) {
      console.log(`SQI для сайта ${site}: ${result.sqi}`);
      return { site, sqi: result.sqi };
    } else {
      throw new Error("Ошибка при решении капчи или отсутствии SQI элемента");
    }
  } catch (error) {
    if (error.message.includes("Runtime.callFunctionOn timed out")) {
      console.warn(
        `Таймаут для сайта ${site}. Пробуем снова или увеличьте 'protocolTimeout'.`
      );
    }
    return { site, sqi: "Ошибка", message: error.message };
  } finally {
    await page.close();
  }
}

exports.getIksContController = async (req, res) => {
  const limit = pLimit(5); // Лимит одновременно выполняемых задач

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 10000, //Было 250000
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

    const errorSites = [];
    let retryCount = 0;
    const maxRetries = 3;

    async function processSites(sitesToProcess) {
      const results = await Promise.all(
        sitesToProcess.map((site, index) =>
          limit(async () => {
            const proxy = proxiesData[index % proxiesData.length];
            const result = await fetchSiteInfo(site, proxy, browser);

            if (
              result.sqi === "Ошибка" ||
              result.message?.includes("TimeoutError")
            ) {
              console.log(`Ошибка для сайта ${site}: ${result.message}`);
              errorSites.push(site);
            }

            return result;
          })
        )
      );
      return results;
    }

    let results = await processSites(sites);
    const resultsMap = new Map();

    // Сохраняем начальные результаты
    results.forEach((result) => resultsMap.set(result.site, result));

    while (errorSites.length > 0 && retryCount < maxRetries) {
      console.log(
        `Повторная проверка для ${errorSites.length} сайтов, попытка ${retryCount + 1} из ${maxRetries}...`
      );
      const sitesToRetry = [...errorSites];
      errorSites.length = 0;
      retryCount++;

      const retryResults = await processSites(sitesToRetry);

      // Перезаписываем только успешные результаты
      retryResults.forEach((result) => {
        if (result.sqi !== "Ошибка") {
          resultsMap.set(result.site, result);
        } else {
          errorSites.push(result.site); // Добавляем сайты с ошибками снова
        }
      });
    }

    if (errorSites.length > 0) {
      console.log(
        `Некоторые сайты (${errorSites.length}) остались с ошибками после ${maxRetries} попыток:`,
        errorSites
      );
    }

    const finalResults = Array.from(resultsMap.values());

    return res.status(200).send({
      message: "Сбор информации о ИКС сайтов завершен",
      results: finalResults,
      errors: errorSites,
    });
  } catch (error) {
    console.error("Ошибка в getIksContController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  } finally {
    await browser.close();
  }
};
