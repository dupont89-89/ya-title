const { Pay } = require("../models/PaySchema");
const { User } = require("../models/UserSchema");
const md5 = require("md5");
require("dotenv").config();
const logger = require("../utils/logger");

const merchant_login = process.env.ROBOKASSA_SHOP_NAME;
const password_1 = process.env.ROBOKASSA_PASSWORD_1;

exports.payRobokassaController = async (req, res) => {
  try {
    const InvId = req.query.InvId; // Номер счёта
    const signatureValueRobokassa = req.query.SignatureValue;
    const currentDate = new Date();
    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime());
    // Форматируем дату и время в строку
    const formattedDate = moscowTime.toISOString();

    logger.writeToLog("Incoming request data:");
    logger.writeToLog(`InvId: ${InvId}`);
    logger.writeToLog(`Хеш который пришёл: ${signatureValueRobokassa}`);
    logger.writeToLog(`Пароль: ${password_1}`);
    logger.writeToLog(`Название магазина: ${merchant_login}`);

    // Проверяем, есть ли номер счёта
    if (InvId) {
      // Находим запись в базе данных по номеру счёта
      const score = await Pay.findOne({ InvId: InvId });
      // Если запись найдена, отправляем данные обратно
      if (score) {
        logger.writeToLog(`Счёт: ${score}`);

        const { OutSum, userId, InvId } = score; // Получаем нужные значения из найденной записи

        const signatureValue = md5(
          `${OutSum.toFixed(2)}:${InvId.toString()}:${password_1}`
        );
        logger.writeToLog(
          `Начинаем проверять merchant_login: ${merchant_login}`
        );
        logger.writeToLog(`paymentAmount: ${OutSum}`);
        logger.writeToLog(`invoiceId: ${InvId}`);
        logger.writeToLog(`password_2: ${password_1}`);
        logger.writeToLog(`Хеш сформированный: ${signatureValue}`);

        if (signatureValue === signatureValueRobokassa) {
          logger.writeToLog("Хеш совпадает");

          // Найти пользователя по userId
          const user = await User.findOne({ _id: userId });
          // Если пользователь найден, обновить его счет
          if (user) {
            logger.writeToLog(`Найденный пользователь: ${user}`);
            // Добавить сумму к существующему балансу пользователя
            user.money += parseFloat(OutSum);
            user.moneyHistory += parseFloat(OutSum);

            // Проверяем, существует ли значение user.referalPay.userId
            const referalPayUserId = user.referalPay && user.referalPay.userId;
            logger.writeToLog(`Баланс пользователя обновлен: ${user}`);
            const notification = {
              message: `Баланс пополнен на ${OutSum} рублей.`,
              dateAdded: formattedDate,
            };
            if (referalPayUserId) {
              const commissionRate = 0.15; // 15% реферальная выплата
              const commission = Math.floor(
                parseFloat(OutSum) * commissionRate
              );
              const userPayRef = await User.findOne({ _id: referalPayUserId });
              // Проверяем, найден ли пользователь-реферал
              if (userPayRef) {
                userPayRef.money += parseFloat(commission);
                userPayRef.moneyHistory += parseFloat(commission);
                userPayRef.lvtPresent.moneyPresentReferal +=
                  parseFloat(commission);
                const notificationRef = {
                  message: `Бонус за реферала. Баланс пополнен на ${commission} рублей.`,
                  dateAdded: formattedDate,
                };
                // Добавить уведомление пользователю-рефералу
                userPayRef.notifications.push(notificationRef);
                userPayRef.notificationsHistory.push(notificationRef);
                // Сохранить данные пользователя-реферала
                await userPayRef.save();
              } else {
                logger.writeToLog("Пользователь-реферал не найден");
              }
            }
            // Добавить уведомление пользователю
            user.notifications.push(notification);
            user.notificationsHistory.push(notification);
            // Сохранить данные пользователя
            await user.save();
          } else {
            logger.writeToLog("Пользователь не найден");
          }
        } else {
          logger.writeToLog("Хеш НЕ совпадает");
          return res
            .status(400)
            .json({ message: "Ошибка верификации подписи" });
        }

        return res.status(200).json({
          message: `Оплата на сумму ${OutSum} успешно произведена.`,
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
    const currentDate = new Date();
    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime());
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
