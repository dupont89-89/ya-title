const { User } = require("../models/UserSchema");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Настройка места сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/avatar"));
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Опции загрузки
const upload = multer({ storage: storage }).single("avatar");

exports.uploadAvatarUserController = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // Ошибка загрузки multer
        console.error("Multer upload error:", err);
        return res.status(400).send({ message: "Error uploading avatar" });
      } else if (err) {
        // Другие ошибки
        console.error("Error uploading avatar:", err);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      const userId = req.query.userId;
      console.log(userId);
      if (!userId) {
        // Проверка на наличие userId
        return res.status(400).send({ message: "User ID is required" });
      }

      const user = await User.findOne({ _id: userId });
      if (!user) {
        // Пользователь не найден
        return res.status(404).send({ message: "User not found" });
      }

      if (!req.file) {
        // Файл не загружен
        return res.status(400).send({ message: "Avatar file is required" });
      }

      // Обновляем информацию о пользователе
      user.avatar = `/uploads/avatar/${req.file.filename}`;
      await user.save();

      return res
        .status(200)
        .send({ message: "Avatar uploaded successfully", avatar: user.avatar });
    });
  } catch (error) {
    console.error("Error in uploadAvatarUserController:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.editDataUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    // Находим пользователя по ID и обновляем его данные
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { firstName: firstName, lastName: lastName } },
      { new: true } // Устанавливаем опцию new в true, чтобы получить обновленный объект пользователя
    );

    if (updatedUser) {
      // Если пользователь успешно обновлен, отправляем обновленные данные в ответе
      res.status(200).json({ updatedUser });
    } else {
      // Если пользователь не найден, отправляем ответ с ошибкой 404 Not Found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Обрабатываем любые ошибки, возникающие во время запроса
    console.error("Ошибка при обновлении данных пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
