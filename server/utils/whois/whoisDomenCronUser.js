import cron from "node-cron";
import nodemailer from "nodemailer";
import { Whois } from "../../models/WhoisToolsSchema.js";
import moment from "moment-timezone"; // Для работы с временными зонами
import mongoose from "mongoose";

// Настройка сервиса для отправки email через Nodemailer
const {
  USER_MAIL_SMTP: login,
  PASSWORD_MAIL_SMTP: password,
  REACT_APP_URL_FRONTEND: frontend,
} = process.env;

const transporter = nodemailer.createTransport({
  host: "mail.hosting.reg.ru",
  port: 587,
  secure: false,
  auth: {
    user: login,
    pass: password,
  },
});

// Функция для отправки email
const sendEmailNotification = async (email, domen) => {
  try {
    await transporter.sendMail({
      from: "tools@ptahini.ru",
      to: email,
      subject: "Оповещение от Ptahini. Доменное имя освободилось.",
      html: `Домен ${domen} освободился. Успейте его зарегистрировать. Перейти в инструмент <a style="border-bottom: 1px solid;" href="${frontend}/app/whois/">проверки домена</a>.`,
    });
    console.log(`Email отправлен пользователю: ${email}`);
  } catch (error) {
    console.error(`Ошибка при отправке email: ${error.message}`);
  }
};

// Функция для ежедневной проверки подписок
const checkSubscriptions = async () => {
  // Получаем текущую дату в формате UTC (00:00:00Z)
  const today = moment.utc().startOf("day"); // Текущая дата 00:00 UTC

  try {
    // Ищем все записи, где freeData совпадает с текущей датой
    const subscriptions = await Whois.find({
      "subscriptionFreeDomen.freeData": today,
    });
    console.log("Запущен поиск");
    console.log(`Поиск по дате ${today}`);
    console.log(subscriptions);
    // Проходим по всем найденным подпискам и отправляем email
    for (const user of subscriptions) {
      for (const domenSubscription of user.subscriptionFreeDomen) {
        if (moment(domenSubscription.freeData).isSame(today, "day")) {
          await sendEmailNotification(user.email, domenSubscription.domen);
        }
      }
    }
  } catch (error) {
    console.error("Ошибка при проверке подписок:", error);
  }
};

export { checkSubscriptions }; // Используем экспорт в ES6
