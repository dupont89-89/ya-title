import { fetchApiWhois } from "../api-whois/fetch-api-whois.js";
import { Whois } from "../models/WhoisToolsSchema.js";

// Запрос к API whois сервиса
export const whoisDomenController = async (req, res) => {
  const { domen } = req.query;
  try {
    const result = await fetchApiWhois(domen);

    if (result) {
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

// Пользователь подписывается на освобождение домена
export const whoisDomenSubscriptionController = async (req, res) => {
  const { domen, userId, freeData, email } = req.query;

  try {
    // Преобразуем дату в UTC формат ISO 8601
    const date = new Date(freeData);
    const normalizedFreeData = date.toISOString(); // сохраняет в UTC, добавляя Z

    // Проверяем корректность даты после преобразования
    if (isNaN(date.getTime())) {
      return res.status(400).send({ message: "Некорректный формат даты" });
    }

    // Проверяем, существует ли пользователь и его подписка
    const user = await Whois.findOne({ userId });

    if (user) {
      // Проверяем, подписан ли пользователь уже на этот домен
      const existingDomen = user.subscriptionFreeDomen.find(
        (item) => item.domen === domen
      );

      if (existingDomen) {
        return res.status(400).send({
          message: "Вы уже подписаны на оповещения об этом домене",
        });
      }

      // Добавляем новую подписку
      user.subscriptionFreeDomen.push({ domen, freeData: normalizedFreeData });
      await user.save();
    } else {
      // Создаем новую запись для пользователя
      await Whois.create({
        userId,
        email,
        subscriptionFreeDomen: [{ domen, freeData: normalizedFreeData }],
      });
    }

    return res.status(200).send({ message: "Подписка успешно создана" });
  } catch (error) {
    console.error("Ошибка в whoisDomenSubscriptionController:", error);
    return res.status(500).send({
      message: "Внутренняя ошибка сервера",
    });
  }
};

// Получаем домены, на которые подписан пользователь
export const getDomenSubscriptionController = async (req, res) => {
  try {
    const user = await Whois.findOne({ userId: req.query.userId });

    if (!user) {
      return res.status(200).json({ message: "Подписки не найдены" });
    }

    const domenData = user.subscriptionFreeDomen.map(({ domen, freeData }) => ({
      domen,
      freeData,
    }));

    res.status(200).json({ domenData });
  } catch (error) {
    console.error("Ошибка при получении подписок:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

// Удаляем подписку на домен
export const deleteWhoisDomenSubscriptionController = async (req, res) => {
  const { domen, userId } = req.query;

  try {
    const result = await Whois.updateOne(
      { userId },
      { $pull: { subscriptionFreeDomen: { domen } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).send({
        message: "Подписка на данный домен у пользователя не найдена",
      });
    }

    return res
      .status(200)
      .send({ message: "Подписка на домен успешно удалена" });
  } catch (error) {
    console.error("Ошибка в deleteWhoisDomenSubscriptionController:", error);
    return res.status(500).send({
      message: "Внутренняя ошибка сервера",
    });
  }
};
