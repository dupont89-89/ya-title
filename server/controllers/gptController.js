import { fetchApiGptText } from "../api-gpt/fetch-api-gpt.js";

export const apiGptTitleOneController = async (req, res) => {
  const text = `Создай из этих слов заголовок Title для поисковых систем: ${req.query.text}`;
  try {
    const result = await fetchApiGptText(text);

    if (result) {
      console.log(
        `Результат в контроллере Title GPT apiGptTitleOneController: ${JSON.stringify(
          result.choices[0].message.content
        )}`
      );
      return res.status(200).send(result.choices[0].message.content);
    } else {
      console.error("Данные от GPT не пришли");
      return res.status(400).send({ message: "Данные от GPT не пришли" });
    }
  } catch (error) {
    console.error("Ошибка в apiGptTitleOneController:", error);
    return res.status(500).send({
      message: "Внутренняя ошибка сервера. Ошибка в apiGptTitleOneController",
    });
  }
};
