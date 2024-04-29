const { Pay } = require("../models/PaySchema");

exports.payRobokassaController = async (req, res) => {
  try {
    const OutSum = req.query.OutSum; // Сумма счёта
    const InvId = req.query.InvId; // Номер счёта
    const userId = req.query.userId; // Id пользователя

    // Получаем текущую дату и время
    const currentDate = new Date();

    // Вычисляем смещение часового пояса (MSK)
    const timeZoneOffset = 3 * 60; // MSK - UTC+3
    const offsetInMilliseconds = timeZoneOffset * 60 * 1000;

    // Применяем смещение к текущей дате и времени
    const moscowTime = new Date(currentDate.getTime() + offsetInMilliseconds);

    // Форматируем дату и время в строку
    const formattedDate = moscowTime.toISOString();

    // Проверяем, есть ли все значения
    if (OutSum && InvId && userId) {
      // Создаем новую запись в базе данных
      const newPay = new Pay({
        OutSum: OutSum,
        InvId: InvId,
        userId: userId,
        createdAt: formattedDate, // Добавляем дату и время создания
      });

      // Сохраняем новую запись в базе данных
      await newPay.save();

      // Если запись успешно сохранена, отправляем ответ с успехом
      res
        .status(200)
        .json(
          `Успешно создан счёт на ${OutSum}, для пользователя ${userId} по счёту ${InvId}`
        );
    } else {
      // Если не все значения переданы, отправляем ответ с ошибкой
      res.status(400).json({ message: "Не все параметры переданы" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при создании счёта:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
