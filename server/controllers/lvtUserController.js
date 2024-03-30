const { User } = require("../models/UserSchema");

exports.spendLvtUserController = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Проверяем, что у пользователя есть достаточно LVT для списания
    if (user.lvt < 1) {
      return res.status(400).send({ message: "Insufficient LVT balance" });
    }

    // Вычитаем 1 из lvt пользователя
    user.lvt -= 1;

    // Сохраняем обновленного пользователя
    await user.save();

    return res.status(200).send({ message: "LVT spent successfully" });
  } catch (error) {
    console.error("Error in spendLvtUserController:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
