const { User } = require("../models/UserSchema");

exports.supportMessageContoller = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    const notifications = user.notifications; // Получаем уведомления от пользователя

    // Возвращаем ответ с уведомлениями
    return res
      .status(200)
      .send({ message: "LVT успешно потрачено", notifications });
  } catch (error) {
    console.error("Ошибка в контроллере supportMessageContoller:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
