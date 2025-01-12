import { User } from "../models/UserSchema.js";
import path from "path";
import multer from "multer";
import fs from "fs";
import { fetchYandexKey } from "../tools-key-info/yandex-xml.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Определяем __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Функция для проверки и создания директорий
const ensureDirectoryExistence = (dirPath) => {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true }); // Создаем директорию рекурсивно
      console.log(`Директория создана: ${dirPath}`);
    } else {
      console.log(`Директория уже существует: ${dirPath}`);
    }
  } catch (error) {
    console.error(`Ошибка при создании директории ${dirPath}:`, error);
    throw error; // Пробрасываем ошибку для обработки в вызывающем коде
  }
};

// Настройка места сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId, tools } = req.query;

    if (!userId || !tools) {
      return cb(new Error("User ID and tools are required"));
    }

    // Перемещаем сюда вычисление даты
    const currentDate = new Date();
    const moscowTime = new Date(currentDate.getTime());
    const formattedDate = moscowTime.toISOString();

    // Очищаем tools и formattedDate от недопустимых символов
    const safeTools = tools.replace(/[^a-zA-Z0-9-_]/g, "-");
    const safeFormattedDate = formattedDate.replace(/[:]/g, "-");

    const dir = path.join(
      __dirname,
      `../uploads/tools/file-user/${userId}/${safeTools}/${safeFormattedDate}`
    );

    console.log("Директория для сохранения файла:", dir); // Логируем путь

    // Проверяем и создаем директорию, если она не существует
    ensureDirectoryExistence(dir);

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Опции загрузки
const upload = multer({ storage }).single("toolFile");

export const uploadFileToolsUserController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Ошибка загрузки multer
        console.error("Multer upload error:", err);
        return res.status(400).send({ message: "Error uploading file" });
      } else if (err) {
        // Другие ошибки
        console.error("Error uploading file:", err);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      const { userId, tools } = req.query;

      if (!userId) {
        return res.status(400).send({ message: "User ID is required" });
      }

      if (!req.file) {
        return res.status(400).send({ message: "File is required" });
      }

      // Перемещаем сюда вычисление даты
      const currentDate = new Date();
      const moscowTime = new Date(currentDate.getTime());
      const formattedDate = moscowTime.toISOString();

      const filePath = `/uploads/tools/file-user/${userId}/${tools}/${formattedDate}/${req.file.filename}`;

      // Обновляем информацию о пользователе
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            tools: {
              nameTools: tools,
              fileTools: filePath,
              dateAdded: formattedDate,
            },
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }

      return res.status(200).send({
        message: "Файл отчетный инструмента добавлен",
        user: updatedUser,
      });
    });
  } catch (error) {
    console.error("Error in uploadFileToolsUserController:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const keyCommerceToolsController = async (req, res) => {
  const { query } = req.body;
  console.log(`Запрос от клиента: ${JSON.stringify(query)}`);

  try {
    const response = await fetchYandexKey(query);
    console.log(`Ответ от fetchYandexKey: ${JSON.stringify(response)}`);

    // Проверяем, что response не пустой
    if (typeof response === "string") {
      console.log("Отправка строкового ответа клиенту:", { result: response });
      res.status(200).json({ result: response });
    } else if (Array.isArray(response) && response.length > 0) {
      console.log("Отправка массива ответов клиенту:", { result: response });
      res.status(200).json({ result: response });
    } else if (typeof response === "object" && response !== null) {
      console.log("Отправка объектного ответа клиенту:", { result: response });
      res.status(200).json({ result: response });
    } else {
      console.log("Отправка ответа 'Нет данных' клиенту");
      res.status(200).json({ result: "Нет данных" });
    }
  } catch (error) {
    console.error("Error in /api/fetch-key:", error);
    res.status(500).json({ error: "Ошибка при выполнении запроса" });
  }
};
