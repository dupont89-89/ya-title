const { User } = require("../models/UserSchema");

exports.adminDataUserController = async (req, res) => {
  try {
    const users = await User.find({}); // Найти всех пользователей

    // Проверить, найдены ли пользователи
    if (users.length > 0) {
      // Преобразовать данные каждого пользователя в нужный формат
      const userData = users.map((user) => ({
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
        referal: user.referal,
        role: user.role,
      }));

      // Отправить данные пользователей в ответе
      res.status(200).json({ users: userData });
    } else {
      // Если пользователи не найдены, отправить соответствующее сообщение об ошибке
      res.status(404).json({ message: "Пользователи не найдены" });
    }
  } catch (error) {
    // Обработать ошибку, возникшую во время запроса к базе данных
    console.error("Ошибка при извлечении пользователей:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

exports.adminEditStatusUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const role = req.query.role;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    // Обновляем поле notifications в базе данных
    user.role = role;
    await user.save();

    // Возвращаем ответ с уведомлениями
    return res
      .status(200)
      .send({ message: `Статус пользователя сменился на ${role}` });
  } catch (error) {
    console.error("Ошибка в контроллере adminEditStatusUserController:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
