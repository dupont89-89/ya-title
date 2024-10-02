const { mailMessageController } = require("../SMTP/mail");
const { User } = require("../models/UserSchema");
const VKID = require("@vkid/sdk");
const uuid = require("uuid");
const {
  validateUserAuth,
  validateResetPassword,
} = require("../utils/validation");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.authUserController = async (req, res) => {
  try {
    const { error } = validateUserAuth(req.body);
    if (error) {
      console.log("Validation error:", error); // Добавленный console.log для отладки
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log("User not found"); // Добавленный console.log для отладки
      return res.status(401).send({ message: "Пользователь не найден" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      console.log("Invalid password"); // Добавленный console.log для отладки
      return res.status(401).send({ message: "Ошибка в пароле" });
    }

    const token = user.generateAuthToken();

    // Создайте объект с данными пользователя
    const userData = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName, // Другие данные, которые вы хотите добавить
    };

    // Отправьте объект userData вместе с токеном в ответе
    res.status(200).send({
      data: { token, user: userData },
      message: "Успешно вошли в систему Ptahini",
    });
  } catch (error) {
    console.error("Error in authUserController:", error); // Добавленный console.error для отладки
    res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};

exports.authResetUserPasswordController = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Выводим тело запроса в консоль

    // Проверяем валидность данных для сброса пароля
    const { error } = validateResetPassword(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message); // Выводим сообщение об ошибке валидации в консоль
      return res.status(400).send({ message: error.details[0].message });
    }
    const email = req.body.email; // Получаем электронную почту из тела запроса
    // Находим пользователя по email
    const user = await User.findOne({ email });
    console.log("User found:", user); // Выводим найденного пользователя в консоль
    if (!user) {
      return res.status(404).send({
        message: "Пользователь с указанным адресом электронной почты не найден",
      });
    }
    const token = uuid.v4();
    // Обновляем токен для сброса пароля у пользователя в базе данных
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Токен будет действителен 1 час
    await user.save();
    // Вызываем функцию для отправки письма со ссылкой для сброса пароля
    await mailMessageController({
      body: {
        userMail: email, // Используем электронную почту для отправки сообщения
        resetPasswordToken: token,
      },
    });
    console.log("Email sent"); // Выводим сообщение об успешной отправке письма в консоль

    return res
      .status(200)
      .send({ message: "Ссылка для сброса пароля отправлена на вашу почту" });
  } catch (error) {
    console.error("Ошибка в resetPasswordController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};

exports.tokenResetUserPasswordController = async (req, res) => {
  const { token } = req.params;

  try {
    // Находим пользователя по токену сброса пароля
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Проверяем, что токен еще действителен
    });

    if (!user) {
      return res.status(400).send({
        message: "Недействительный или истекший токен сброса пароля.",
      });
    }

    // Устанавливаем новый пароль пользователя (вы должны реализовать validateResetPassword для проверки пароля)
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).send({ message: "Пароль успешно сброшен." });
  } catch (error) {
    console.error("Ошибка при сбросе пароля:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера." });
  }
};

exports.authVKController = async (req, res) => {
  const code = req.query.code; // Используем req.query для извлечения параметров из URL
  const device_id = req.query.device_id;
  const client_id = process.env.CLIENT_ID_VK;
  console.log(`client_id ${client_id}`);
  console.log(`Код ${code}`);
  console.log(`device_id ${device_id}`);
  try {
    if (!code || !device_id) {
      return res
        .status(400)
        .send({ message: "Ошибка: отсутствует code или device_id." });
    }

    // Обмен кода на токен
    const tokenResponse = await VKID.Auth.exchangeCode(
      code,
      device_id,
      client_id
    );
    console.log(`tokenResponse ${tokenResponse}`);
    if (!tokenResponse || !tokenResponse.accessToken) {
      return res.status(400).send({ message: "Ошибка обмена кода на токен." });
    }

    const accessToken = tokenResponse.accessToken;

    // Получение информации о пользователе
    const userInfo = await VKID.Auth.userInfo(accessToken);
    console.log(userInfo);
    return res.status(200).send({
      message: "Успешно.",
      user: userInfo,
    });
  } catch (error) {
    console.error("Ошибка:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера." });
  }
};
