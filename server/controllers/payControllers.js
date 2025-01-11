import { Pay } from "../models/PaySchema.js";
import { User } from "../models/UserSchema.js";
import md5 from "md5";
import dotenv from "dotenv";
import { writeToLog } from "../utils/logger.js"; // Измененный импорт

// Загрузка переменных окружения
dotenv.config();

const merchant_login = process.env.ROBOKASSA_SHOP_NAME;
const password_1 = process.env.ROBOKASSA_PASSWORD_1;

export const payRobokassaController = async (req, res) => {
  try {
    const InvId = req.query.InvId; // Номер счёта
    const signatureValueRobokassa = req.query.SignatureValue;
    const currentDate = new Date();
    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime());
    // Форматируем дату и время в строку
    const formattedDate = moscowTime.toISOString();

    // Проверяем, есть ли номер счёта
    if (InvId) {
      // Находим запись в базе данных по номеру счёта
      const score = await Pay.findOne({ InvId: InvId });
      // Если запись найдена, отправляем данные обратно
      if (score) {
        writeToLog(`Начинаем проверку для счета: ${score.InvId}`);

        const { OutSum, userId, InvId, paymentStatus } = score; // Получаем нужные значения из найденной записи

        const signatureValue = md5(
          `${OutSum.toFixed(2)}:${InvId.toString()}:${password_1}`
        );
        writeToLog(`Проверка подписи для merchant_login: ${merchant_login}`);

        if (signatureValue === signatureValueRobokassa) {
          writeToLog("Хеш совпадает");
          if (!paymentStatus) {
            const user = await User.findOne({ _id: userId });
            // Если пользователь найден, обновить его счет
            if (user) {
              // Добавить сумму к существующему балансу пользователя
              user.money += parseFloat(OutSum);
              user.moneyHistory += parseFloat(OutSum);

              const referalPayUserId =
                user.referalPay && user.referalPay.userId;
              const notification = {
                message: `Баланс пополнен на ${OutSum} рублей.`,
                dateAdded: formattedDate,
              };
              if (referalPayUserId) {
                const commissionRate = 0.15; // 15% реферальная выплата
                const commission = Math.floor(
                  parseFloat(OutSum) * commissionRate
                );
                const userPayRef = await User.findOne({
                  _id: referalPayUserId,
                });
                if (userPayRef) {
                  userPayRef.money += parseFloat(commission);
                  userPayRef.moneyHistory += parseFloat(commission);
                  userPayRef.lvtPresent.moneyPresentReferal +=
                    parseFloat(commission);
                  const notificationRef = {
                    message: `Бонус за реферала. Баланс пополнен на ${commission} рублей.`,
                    dateAdded: formattedDate,
                  };
                  userPayRef.notifications.push(notificationRef);
                  userPayRef.notificationsHistory.push(notificationRef);
                  await userPayRef.save();
                }
              }
              user.notifications.push(notification);
              user.notificationsHistory.push(notification);
              score.paymentStatus = true;
              await user.save();
              await score.save();
            }
          } else {
            writeToLog("Счёт уже оплачен!");
          }
        } else {
          return res
            .status(400)
            .json({ message: "Ошибка верификации подписи" });
        }

        return res.status(200).json({
          message: `Оплата на сумму ${OutSum} успешно произведена.`,
        });
      } else {
        return res.status(404).json({ message: "Счёт не найден" });
      }
    } else {
      res.status(400).json({ message: "Не передан номер счёта" });
    }
  } catch (error) {
    console.error("Ошибка при поиске счёта:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const payScoreRobokassaController = async (req, res) => {
  try {
    const OutSum = req.query.OutSum; // Сумма счёта
    const InvId = req.query.InvId; // Номер счёта
    const userId = req.query.userId; // Id пользователя
    const currentDate = new Date();

    // Применяем смещение +5 часов
    const offset = 5 * 60 * 60 * 1000; // 5 часов в миллисекундах
    const moscowTime = new Date(currentDate.getTime() + offset);

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
        paymentStatus: false,
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

export const getScoreController = async (req, res) => {
  try {
    const score = await Pay.find({}); // Найти всех пользователей

    // Проверить, найдены ли пользователи
    if (score.length > 0) {
      // Преобразовать данные каждого пользователя в нужный формат
      const scoreData = score.map((score) => ({
        OutSum: score.OutSum,
        InvId: score.InvId,
        userId: score.userId,
        createdAt: score.createdAt, // Добавляем поле createdAt
        paymentStatus: score.paymentStatus, // Статус оплаты
      }));

      // Отправить данные пользователей в ответе
      res.status(200).json({
        score: scoreData,
        message: "Успешно отправлены счета пользователей",
      });
    } else {
      // Если не все значения переданы, отправляем ответ с ошибкой
      res.status(400).json({ message: "Вроде как счетов нет" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при отправке счетов:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
