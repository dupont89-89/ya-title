const { Tools } = require("../../models/ToolsSchema");

exports.toolsDataController = async (req, res) => {
  try {
    const userExists = await Tools.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).send({
        message:
          "Пользователь с указанным адресом электронной почты уже существует",
      });
    }

    const userId = req.body.userId;
    const evaluation = req.body.evaluation;
    const name = req.body.name;

    await Tools.create({
      ...req.body,
    });

    res.status(201).send({ message: "Успешно" });
  } catch (error) {
    console.error("Ошибка toolsDataController:", error);
    res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
