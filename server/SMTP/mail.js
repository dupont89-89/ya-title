const nodemailer = require("nodemailer");
require("dotenv").config();

const login = process.env.USER_MAIL_SMTP;
const password = process.env.PASSWORD_MAIL_SMTP;

exports.mailMessageController = async (req, res) => {
  try {
    // Считываем данные из тела POST запроса
    const { textMail, userMail, subjectMail } = req.body;

    const transporter = nodemailer.createTransport({
      host: "mail.hosting.reg.ru",
      port: 587,
      secure: false, // true для использования SSL
      auth: {
        user: login,
        pass: password, //Пароль
      },
    });

    const mailOptions = {
      from: "tools@ptahini.ru",
      to: userMail ? userMail : "dupont89-89@yandex.ru",
      subject: subjectMail
        ? `Письмо от пользователя ${subjectMail}`
        : "Письмо с tools.ptahini. от неизвестного пользователя",
      text: textMail,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Ошибка отправки письма:", error);
        return res.status(500).send({ message: "Ошибка отправки письма" });
      } else {
        console.log("Письмо отправлено: ", info.response);
        return res.status(200).send({ message: "Письмо успешно отправлено" });
      }
    });
  } catch (error) {
    console.error("Ошибка в контроллере supportMessageController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
