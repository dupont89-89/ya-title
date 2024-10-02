const { fetchApiWhois } = require("../api-whois/fetch-api-whois");

exports.whoisDomenController = async (req, res) => {
  const domen = req.query.domen;
  try {
    const result = await fetchApiWhois(domen);

    if (result) {
      console.log(`Результат в контроллере WHOIS: ${JSON.stringify(result)}`);
      return res.status(200).send(result);
    } else {
      console.error("Данные от WHOIS не пришли");
      return res.status(400).send({ message: "Данные от WHOIS не пришли" });
    }
  } catch (error) {
    console.error("Ошибка в Whois контроллере whoisDomenController:", error);
    return res.status(500).send({
      message: "Внутренняя ошибка сервера. Ошибка в whoisDomenController",
    });
  }
};
