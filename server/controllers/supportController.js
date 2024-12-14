const { SupportTicket } = require("../models/SupportTicketSchema");

exports.newAppealSupportController = async (req, res) => {
  try {


    return res.status(200).send({ message: "Создано новое обращение в поддержку" });
  } catch (error) {
    console.error("Ошибка при обращении в поддержку:", error);
    return res.status(500).send({ message: "Ошибка сервера" });
  }
};