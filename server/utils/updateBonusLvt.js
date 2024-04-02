const mongoose = require("mongoose");

const updateBonusLvt = async (io) => {
  try {
    const User = mongoose.model("user"); // Используем mongoose.model для получения модели пользователя
    const bonusLvt = 3;
    await User.updateMany(
      {},
      {
        $set: { bonusDayLvt: bonusLvt },
        $push: {
          notifications: `Вам начислено ${bonusLvt} Lvt ежедневный`,
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
