import { Tools } from "../../models/ToolsSchema.js";

export const toolsDataController = async (req, res) => {
  try {
    const userExists = await Tools.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(409).send({
        message:
          "Пользователь с указанным адресом электронной почты уже существует",
      });
    }

    const { userId, evaluation, name } = req.body;

    await Tools.create({
      ...req.body,
    });

    res.status(201).send({ message: "Успешно" });
  } catch (error) {
    console.error("Ошибка toolsDataController:", error);
    res.status(500).send({ message: "Внутренняя ошибка сервера" });
  }
};
