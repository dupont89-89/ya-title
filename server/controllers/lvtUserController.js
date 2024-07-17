const { User } = require("../models/UserSchema");
const Decimal = require("decimal.js");

exports.spendLvtUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const sumLvt = parseFloat(req.query.sumLvt);

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Округляем сумму LVT с помощью Decimal.js
    const amountToSpend = new Decimal(sumLvt).toDecimalPlaces(2);

    // Проверяем, есть ли у пользователя достаточно LVT для списания
    if (user.totalLvt < amountToSpend.toNumber()) {
      return res.status(400).send({ message: "Недостаточно баланса Lvt" });
    }

    // Если у пользователя есть достаточно бонусных LVT (bonusDayLvt),
    // списываем из них указанное количество
    if (new Decimal(user.bonusDayLvt).gte(amountToSpend)) {
      user.bonusDayLvt = new Decimal(user.bonusDayLvt)
        .minus(amountToSpend)
        .toNumber();
    } else {
      // Если бонусных LVT недостаточно, вычитаем из них все, что есть,
      // а затем оставшееся количество списываем из основных LVT (lvt)
      const remainingFromBonus = user.bonusDayLvt;
      user.bonusDayLvt = 0;

      // Округляем каждое число до двух десятичных знаков вниз перед вычитанием
      const roundedAmountToSpend = amountToSpend.toDecimalPlaces(2);
      const roundedRemainingFromBonus = new Decimal(
        remainingFromBonus
      ).toDecimalPlaces(2);

      // Вычитаем округленные значения
      const spendAmount = roundedAmountToSpend.minus(roundedRemainingFromBonus);

      user.lvt = new Decimal(user.lvt).minus(spendAmount).toNumber();
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

    const currentDate = new Date();

    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime());

    // Форматируем дату и время в строку
    const formattedDate = moscowTime.toISOString();

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

exports.userAddLvtUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const lvt = req.query.lvt;
    const money = req.query.money;

    const currentDate = new Date();

    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime());

    // Форматируем дату и время в строку
    const formattedDate = moscowTime.toISOString();

    // Находим пользователя по ID и обновляем его данные
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $inc: {
          lvt: Number(lvt),
          money: -Number(money),
        },
        $addToSet: {
          notifications: {
            message: `С вашего баланса списано ${money} рублей и добавлено ${lvt} на баланс`,
            dateAdded: formattedDate, // Добавляем дату добавления уведомления
          },
        },
      },
      { new: true } // Устанавливаем опцию new в true, чтобы получить обновленный объект пользователя
    );

    if (updatedUser) {
      // Если пользователь успешно обновлен, отправляем обновленные данные в ответе
      res
        .status(200)
        .json(
          `Успешно списано ${money} рублей с баланса и добавлено ${lvt} на баланс`
        );
    } else {
      // Если пользователь не найден, отправляем ответ с ошибкой 404 Not Found
      res.status(404).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при списании средств у пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
