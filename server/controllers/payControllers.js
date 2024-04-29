const { Pay } = require("../models/PaySchema");
const { User } = require("../models/UserSchema");
const md5 = require("md5");
require("dotenv").config();

const merchant_login = process.env.ROBOKASSA_SHOP_NAME;
const password_2 = process.env.ROBOKASSA_PASSWORD_2;

exports.payRobokassaController = async (req, res) => {
  try {
    const InvId = req.query.InvId; // Номер счёта

    const signatureValueRobokassa = req.query.SignatureValue;

    // Проверяем, есть ли номер счёта
    if (InvId) {
      // Находим запись в базе данных по номеру счёта
      const score = await Pay.findOne({ InvId: InvId });

      // Если запись найдена, отправляем данные обратно
      if (score) {
        const { OutSum, userId, createdAt, InvId } = score; // Получаем нужные значения из найденной записи
        console.log(score);

        // const signatureValue = md5(
        //   `${merchant_login}:${OutSum}:${InvId}:${password_2}`
        // );
        // Преобразуем OutSum в строку и передаем в signatureValue
        const OutSumString = OutSum.toString();

        // Здесь используйте OutSumString вместо 1390 в md5
        const signatureValue = md5(
          `${merchant_login}:${OutSumString}:${InvId}:${password_2}`
        );

        console.log(signatureValueRobokassa);
        console.log(signatureValue);

        if (signatureValue === signatureValueRobokassa) {
          console.log("Контролльная сумма равна");
          const user = await User.findOne({ _id: userId });
          console.log(user);
        }

        return res.status(200).json({
          OutSum,
          userId,
          InvId,
          createdAt,
          message: `Успешно оплачен счёт на ${OutSum} для пользователя ${userId} по счёту ${InvId}`,
        });
      } else {
        // Если запись не найдена, возвращаем соответствующее сообщение об ошибке
        return res.status(404).json({ message: "Счёт не найден" });
      }
    } else {
      // Если номер счёта не передан, возвращаем сообщение об ошибке
      res.status(400).json({ message: "Не передан номер счёта" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при поиске счёта:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

exports.payScoreRobokassaController = async (req, res) => {
  try {
    const OutSum = req.query.OutSum; // Сумма счёта
    const InvId = req.query.InvId; // Номер счёта
    const userId = req.query.userId; // Id пользователя

    // Получаем текущую дату и время
    const currentDate = new Date();

    // Вычисляем смещение часового пояса (MSK)
    const timeZoneOffset = 3 * 60; // MSK - UTC+3
    const offsetInMilliseconds = timeZoneOffset * 60 * 1000;

    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime() + offsetInMilliseconds);

    // Форматируем дату и время в строку
    const formattedDate = moscowTime.toISOString();

    // Проверяем, есть ли все значения
    if (OutSum && InvId && userId) {
      // Создаем новую запись в базе данных
      const newPay = new Pay({
        OutSum: OutSum,
        InvId: InvId,
        userId: userId,
        createdAt: formattedDate, // Добавляем дату и время создания
      });

      // Сохраняем новую запись в базе данных
      await newPay.save();

      // Если запись успешно сохранена, отправляем ответ с успехом
      res
        .status(200)
        .json(
          `Успешно создан счёт на ${OutSum}, для пользователя ${userId} по счёту ${InvId}`
        );
    } else {
      // Если не все значения переданы, отправляем ответ с ошибкой
      res.status(400).json({ message: "Не все параметры переданы" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при создании счёта:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
