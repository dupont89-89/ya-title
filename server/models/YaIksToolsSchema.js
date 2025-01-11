import mongoose from "mongoose"; // Заменяем require на import

const iksToolsSchema = new mongoose.Schema({
  domen: { type: String, required: true }, // Имя домена
  checks: [
    // Массив проверок
    {
      iksValue: { type: Number, required: true }, // Значение ИКС
      date: { type: Date, default: Date.now }, // Дата проверки
    },
  ],
});

// Создание модели
const Iks = mongoose.model("Iks", iksToolsSchema);

export { Iks }; // Заменяем module.exports на export
