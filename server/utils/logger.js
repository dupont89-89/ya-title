const fs = require("fs");

// Функция для записи логов в файл
function writeToLog(message) {
  const logFilePath = "app.log"; // Путь к файлу логов
  const logMessage = `${new Date().toISOString()} - ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("Ошибка при записи в файл логов:", err);
    }
  });
}

// Пример использования функции для логирования
writeToLog("Начало работы сервера");

module.exports.writeToLog = writeToLog;
