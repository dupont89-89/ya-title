import { User } from "../models/UserSchema.js";
import path from "path";
import multer from "multer";
import fs from "fs";
import { fetchYandexKey } from "../tools-key-info/yandex-xml.js";

// Функция для проверки и создания директорий
const ensureDirectoryExistence = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    return true;
  }
  fs.mkdirSync(dirPath, { recursive: true });
};

// Настройка места сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId, tools } = req.query;

    // Перемещаем сюда вычисление даты
    const currentDate = new Date();
    const moscowTime = new Date(currentDate.getTime());
    const formattedDate = moscowTime.toISOString();

    const dir = path.join(
      __dirname,
      `../uploads/tools/file-user/${userId}/${tools}/${formattedDate}`
    );

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

  try {
    const response = await fetchYandexKey(query);

    // Проверяем, что response не пустой массив, а строка или массив с результатами
    if (typeof response === "string") {
      res.status(200).json({ result: response });
    } else if (Array.isArray(response) && response.length > 0) {
      res.status(200).json({ result: response });
    } else {
      res.status(200).json({ result: "Нет данных" });
    }
  } catch (error) {
    console.error("Error in /api/fetch-key:", error);
    res.status(500).json({ error: "Ошибка при выполнении запроса" });
  }
};
