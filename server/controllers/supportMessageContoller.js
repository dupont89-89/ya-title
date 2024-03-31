const { User } = require("../models/UserSchema");

exports.supportMessageContoller = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Проверяем, что userId не равен undefined
    if (!userId) {
      return res
        .status(400)
        .send({ message: "Отсутствует идентификатор пользователя" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    const notifications = user.notifications; // Получаем уведомления от пользователя

    // Возвращаем ответ с уведомлениями
    return res
      .status(200)
      .send({ message: "Отправленны оповещения пользователя", notifications });
  } catch (error) {
    console.error("Ошибка в контроллере supportMessageContoller:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};

exports.clearSupportMessageContoller = async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "Пользователь не найден" });
    }

    // Обновляем поле notifications в базе данных
    user.notifications = [];
    await user.save();

    // Возвращаем ответ с уведомлениями
    return res.status(200).send({ message: "Оповещения успешно очищены" });
  } catch (error) {
    console.error("Ошибка в контроллере clearSupportMessageContoller:", error);
    return res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
