const mongoose = require("mongoose");

const updateBonusLvt = async (io) => {
  const currentDate = new Date();
  // Применяем смещение к текущей дате и времени
  const moscowTime = new Date(currentDate.getTime());
  // Форматируем дату и время в строку
  const formattedDate = moscowTime.toISOString();
  try {
    const User = mongoose.model("user"); // Используем mongoose.model для получения модели пользователя
    const bonusLvt = 3;
    const notification = {
      message: `Вам начислено ${bonusLvt} Lvt ежедневный.`,
      dateAdded: formattedDate,
    };
    await User.updateMany(
      {},
      {
        $set: { bonusDayLvt: bonusLvt },
        $push: {
          notifications: notification,
          notificationsHistory: notification,
        },
      }
    );
    console.log("Ежедневное начисление бонусов выполнено.");
    io.emit("dailyUpdate");
  } catch (error) {
    console.error(
      "Ошибка при выполнении ежедневного начисления бонусов:",
      error
    );
  }
};

module.exports = { updateBonusLvt };
