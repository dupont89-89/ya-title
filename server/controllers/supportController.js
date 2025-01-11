import { SupportTicket } from "../models/SupportTicketSchema.js";

export const newAppealSupportController = async (req, res) => {
  try {
    // Создание нового обращения в поддержку может быть добавлено здесь
    return res
      .status(200)
      .send({ message: "Создано новое обращение в поддержку" });
  } catch (error) {
    console.error("Ошибка при обращении в поддержку:", error);
    return res.status(500).send({ message: "Ошибка сервера" });
  }
};
