const { User } = require("../models/UserSchema");

// Получаем текущую дату и время
const currentDate = new Date();

// Форматируем дату в нужный формат (можно выбрать другой формат, если нужно)
const formattedDate = currentDate.toISOString();

exports.spendLvtUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const amountToSpend = 1; // Количество LVT для списания

    // Проверяем, есть ли у пользователя достаточно LVT для списания
    if (user.totalLvt < amountToSpend) {
      return res.status(400).send({ message: "Недостаточно баланса Lvt" });
    }

    // Если у пользователя есть достаточно бонусных LVT (bonusDayLvt),
    // списываем из них указанное количество
    if (user.bonusDayLvt >= amountToSpend) {
      user.bonusDayLvt -= amountToSpend;
    } else {
      // Если бонусных LVT недостаточно, вычитаем из них все, что есть,
      // а затем оставшееся количество списываем из основных LVT (lvt)
      const remainingFromBonus = user.bonusDayLvt;
      user.bonusDayLvt = 0;
      user.lvt -= amountToSpend - remainingFromBonus;
    }

    // Сохраняем обновленного пользователя
    await user.save();

    return res.status(200).send({ message: "LVT spent successfully" });
  } catch (error) {
    console.error("Error in spendLvtUserController:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.adminAddLvtUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const lvt = req.query.lvt;

    // Получаем текущую дату и время
    const currentDate = new Date();

    // Форматируем дату в нужный формат (можно выбрать другой формат, если нужно)
    const formattedDate = currentDate.toISOString();

    // Находим пользователя по ID и обновляем его данные
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: {
          lvt: Number(lvt),
        },
        $push: {
          notifications: {
            message: `Вам начислено ${lvt} Lvt от администрации`,
            dateAdded: formattedDate, // Добавляем дату добавления уведомления
          },
          notificationsHistory: {
            message: `Вам начислено ${lvt} Lvt от администрации`,
            dateAdded: formattedDate, // Добавляем дату добавления уведомления
          },
        }, // Используем $inc для прибавления к существующему значению
      },
      { new: true } // Устанавливаем опцию new в true, чтобы получить обновленный объект пользователя
    );

    if (updatedUser) {
      // Если пользователь успешно обновлен, отправляем обновленные данные в ответе
      res.status(200).json(`Успешно зачисленно ${lvt} на баланс`);
    } else {
      // Если пользователь не найден, отправляем ответ с ошибкой 404 Not Found
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при добавлении Lvt пользователю:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
