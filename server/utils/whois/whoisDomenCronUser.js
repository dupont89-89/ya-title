const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { Whois } = require("../../models/WhoisToolsSchema");
const moment = require("moment-timezone"); // Для работы с временными зонами
const mongoose = require("mongoose");

// Настройка сервиса для отправки email через Nodemailer

const login = process.env.USER_MAIL_SMTP;
const password = process.env.PASSWORD_MAIL_SMTP;
const frontend = process.env.REACT_APP_URL_FRONTEND;

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
      html: `Домен ${domen} освободился. Успейте его зарегистрировать. Перейти в инструмент <a style={border-bottom: 1px solid;} href="${frontend}/app/whois/">проверки домена</a>.`,
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

module.exports = {
  checkSubscriptions,
};

// Запуск каждый 10 секунд для тестирования

// Проверка подписок
// const checkSubscriptions = async () => {
//   try {
//     // Пример получения текущей даты в формате ISO
//     const today = new Date().toISOString();

//     // Находим все подписки, где freeData совпадает с текущей датой
//     const subscriptions = await Whois.find({
//       "subscriptionFreeDomen.freeData": today,
//     });

//     console.log(`Найдено подписок: ${subscriptions.length}`);
//     for (const user of subscriptions) {
//       const email = user.email;
//       for (const domenSubscription of user.subscriptionFreeDomen) {
//         if (domenSubscription.freeData === today) {
//           console.log(
//             `Отправляем email на адрес пользователю ${email} по домену ${domenSubscription.domen}`
//           );
//           await sendEmailNotification(email, domenSubscription.domen);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Ошибка при проверке подписок:", error);
//   }
// };

// // Вызываем функцию проверки подписок
// checkSubscriptions();
