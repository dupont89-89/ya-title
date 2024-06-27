const { User } = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { validateUser } = require("../utils/validation");

exports.signUpUserController = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Валидация данных пользователя
    const { error } = validateUser(req.body);
    if (error) {
      console.log("Validation error:", error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      console.log("User already exists:", userExists);
      return res.status(409).send({
        message:
          "Пользователь с указанным адресом электронной почты уже существует",
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log("Hashed password:", hashPassword);
    const bonusLvt = 20;
    // Создание нового пользователя с начислением 20 в поле lvtPresent
    await User.create({
      ...req.body,
      password: hashPassword,
      lvtPresent: {
        lvtPresentRegistration: bonusLvt,
      },
      notifications: [
        {
          message: `Вам начислено ${bonusLvt} Lvt за регистрацию`,
        },
      ],
      notificationsHistory: [
        {
          message: `Вам начислено ${bonusLvt} Lvt за регистрацию`,
        },
      ],
      lvt: bonusLvt,
    });

    res.status(201).send({ message: "Пользователь успешно создан" });
  } catch (error) {
    console.error("Ошибка в signUpUserController:", error);
    res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};

exports.dataUserController = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.query.userId });
    if (user) {
      // User found, send the user data in the response
      const userData = {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
        bonusDayLvt: user.bonusDayLvt,
        lvt: user.lvt,
        lvtPresent: user.lvtPresent,
        totalLvt: user.totalLvt,
        money: user.money,
        moneyHistory: user.moneyHistory,
        notifications: user.notifications,
        notificationsHistory: user.notificationsHistory,
        referal: user.referal,
        role: user.role,
        tools: user.tools,
      };
      res.status(200).json({ userData }); // Assuming you want to send the user data as JSON
    } else {
      // User not found, send a 404 Not Found response
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle any errors that occur during the query
    console.error("Ошибка при извлечении пользователя:", error);
    res.status(500).json({ message: "Внутренней ошибки сервера" });
  }
};
