import mongoose from "mongoose"; // Заменяем require на import

const paySchema = new mongoose.Schema({
  OutSum: { type: Number, required: true },
  InvId: { type: Number, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }, // Добавляем поле createdAt
  paymentStatus: { type: Boolean, default: false }, // Статус оплаты
});

const Pay = mongoose.model("pay", paySchema);

export { Pay }; // Экспортируем модель с помощью ES-модулей
