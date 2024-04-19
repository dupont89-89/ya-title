const { User } = require("../models/UserSchema");

exports.payRobokassaController = async (req, res) => {
  try {
    const paymentAmount = req.query.paymentAmount;
    const invoiceId = req.query.lvt;

    // Получаем текущую дату и время

    if (invoiceId) {
      // Если пользователь успешно обновлен, отправляем обновленные данные в ответе
      res.status(200).json(`Успешно зачисленно ${paymentAmount} на баланс`);
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
