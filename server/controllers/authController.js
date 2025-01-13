import { mailMessageController } from "../SMTP/mail.js";
import { User } from "../models/UserSchema.js";
import { v4 as uuidv4 } from "uuid";
import {
  validateUserAuth,
  validateResetPassword,
} from "../utils/validation.js";
import bcrypt from "bcryptjs"; // Заменяем bcrypt на bcryptjs
import dotenv from "dotenv";

dotenv.config();

export const authUserController = async (req, res) => {
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

export const authResetUserPasswordController = async (req, res) => {
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
    const token = uuidv4(); // Исправлено: используем uuidv4 вместо uuid.v4
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

export const tokenResetUserPasswordController = async (req, res) => {
  const { token } = req.params;

  try {
    // Находим пользователя по токену сброса пароля
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Проверяем, что токен еще действителен
    });

    if (!user) {
      return res.status(400).send({
        message:
          "Недействительный или истекший токен сброса пароля. Повторите сброс пароля.",
      });
    }

    // Устанавливаем новый пароль пользователя
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

export const authVKController = async (req, res) => {
  try {
    const { email, first_name, last_name, avatar, user_id } = req.body;

    console.log("Получены данные VK:", req.body);
    console.log("Ищем пользователя с VK ID:", user_id);

    // Проверяем, есть ли user_id и он валиден
    if (!user_id || user_id === "null") {
      return res.status(400).send({ message: "Некорректный VK ID." });
    }

    // Ищем пользователя по VK ID (используем vkid, а не _id)
    const user = await User.findOne({ vkid: "67799295" }); // Поиск по полю vkid, а не _id

    if (user) {
      // Проверяем, что передаваемые данные валидны
      if (!avatar || !email || !first_name || !last_name) {
        return res
          .status(400)
          .send({ message: "Все поля должны быть заполнены." });
      }

      try {
        // Генерируем новый токен
        const token = user.generateAuthToken();

        // console.log("Пользователь найден и обновлен:", user);

        return res.status(200).send({
          message: "Авторизация через VK ID успешна.",
          dataUser: {
            userId: user._id,
          },
          token,
        });
      } catch (error) {
        console.error("Ошибка при обновлении пользователя:", error);
        return res.status(500).send({
          message: "Произошла ошибка при обновлении данных пользователя.",
        });
      }
    }

    // Если пользователя нет, создаем нового
    console.log("Пользователь не найден, создаем нового.");
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(user_id, salt); // Для безопасности
    const bonusLvt = 100;

    const newUser = new User({
      firstName: first_name,
      lastName: last_name,
      vkid: user_id, // Добавляем VK ID
      email,
      avatar,
      password: hashPassword, // Сохраняем ID VK как хэш пароля
      referal: [
        {
          userId: user_id,
        },
      ],
      notifications: [
        {
          message: "Добро пожаловать в систему PTAHINI через VK ID!",
        },
        {
          message: `Вам начислено ${bonusLvt} Lvt за регистрацию`,
        },
      ],
      lvtPresent: {
        lvtPresentRegistration: bonusLvt,
      },
      notificationsHistory: [
        {
          message: `Вам начислено ${bonusLvt} Lvt за регистрацию`,
        },
        {
          message: "Добро пожаловать в систему PTAHINI через VK ID!",
        },
      ],
      lvt: bonusLvt,
    });

    const savedUser = await newUser.save();
    console.log("Создан новый пользователь:", savedUser);

    const token = savedUser.generateAuthToken();

    return res.status(201).send({
      message: "Успешная регистрация через VK ID.",
      dataUser: {
        userId: savedUser._id,
      },
      token,
    });
  } catch (error) {
    console.error("Ошибка в контроллере авторизации VK:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера." });
  }
};
