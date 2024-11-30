const nodemailer = require("nodemailer");
require("dotenv").config();

const login = process.env.USER_MAIL_SMTP;
const password = process.env.PASSWORD_MAIL_SMTP;
const frontend = process.env.REACT_APP_URL_FRONTEND;

exports.mailMessageController = async (req, res) => {
  try {
    const { textMail, userMail, subjectMail, resetPasswordToken } = req.body;

    const transporter = nodemailer.createTransport({
      host: "mail.hosting.reg.ru",
      port: 587,
      secure: false,
      auth: {
        user: login,
        pass: password,
      },
    });

    let mailOptions;

    if (resetPasswordToken) {
      // Если есть токен сброса пароля, отправляем письмо для сброса пароля
      const resetUrl = `${frontend}/reset-password/${resetPasswordToken}`;
      mailOptions = {
        from: "tools@ptahini.ru",
        to: userMail,
        subject: "Сброс пароля к аккаунту tools.ptahini.ru",
        html: `<p>Для сброса пароля перейдите по <a href="${resetUrl}">ссылке</a>.</p> <p>Если вы не отправляли запрос на сброс пароля, просто проигнорируйте это сообщение</p>`,
      };
    } else {
      // Иначе отправляем стандартное письмо
      mailOptions = {
        from: "tools@ptahini.ru",
        to: userMail ? userMail : "dupont89-89@yandex.ru",
        subject: subjectMail || "Письмо с tools.ptahini.ru",
        text: textMail,
      };
    }

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
    console.error("Ошибка в контроллере mailMessageController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
