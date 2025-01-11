import { model } from "mongoose"; // Подключение модели

const updateBonusLvt = async (io) => {
  try {
    const currentDate = new Date();
    const moscowTime = new Date(currentDate.getTime());
    const formattedDate = moscowTime.toISOString(); // Форматируем дату и время

    const User = model("user"); // Получаем модель пользователя
    const bonusLvt = 3;
    const notification = {
      message: `Обновлен ежедневный бонус. На баланс восстановлено ${bonusLvt} Lvt.`,
      dateAdded: formattedDate,
    };

    // Обновляем всех пользователей
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

export { updateBonusLvt };
