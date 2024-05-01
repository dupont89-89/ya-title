const { User } = require("../models/UserSchema");

// Функция для форматирования даты
const formatDate = (date) => {
  const moscowTime = new Date(date.getTime());
  return moscowTime.toISOString();
};

// Добавить пользователя в рефералы
const addUserToReferrals = (user, userNew, refUserId, userId) => {
  user.referal.push({ userId: userId, dateAdded: Date.now() });
  userNew.referalPay = { userId: refUserId, dateAdded: Date.now() };
};

exports.authRefAddUser = async (req, res) => {
  try {
    const refUserId = req.query.refUserId;
    const userId = req.query.userId;
    console.log(refUserId);
    console.log(userId);
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    const [user, userNew] = await Promise.all([
      User.findOne({ _id: refUserId }),
      User.findOne({ _id: userId }),
    ]);

    if (!user || !userNew) {
      const errorMessage = !user
        ? "Пользователь для получения выплат с данным email не найден"
        : "Пользователь для отправки выплат с данным email не найден";
      return res.status(404).send({ message: errorMessage });
    }

    addUserToReferrals(user, userNew, refUserId, userId);

    const notification = {
      message: `У вас появился реферал, теперь вы получаете 15% в виде Lvt от его пополнений`,
      dateAdded: formattedDate,
    };
    user.notifications.push(notification);
    user.notificationsHistory.push(notification);

    await Promise.all([user.save(), userNew.save()]);

    return res
      .status(200)
      .send({ message: "Пользователь успешно добавлен в рефералы" });
  } catch (error) {
    console.error("Ошибка реферала:", error);
    return res
      .status(500)
      .send({ message: "Ошибка сервера", error: error.message });
  }
};
