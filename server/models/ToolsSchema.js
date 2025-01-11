import mongoose from "mongoose"; // Заменяем require на import

const toolsSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: Boolean, default: true }, // Добавлено явное указание типа
  userEvaluation: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }, // Ссылка на пользователя, если есть отдельная модель User
      evaluation: { type: Number, min: 1, max: 5, required: true }, // Добавлены ограничения на допустимые значения оценки
    },
  ],
});

// Опционально: добавить метод для расчета среднего рейтинга
toolsSchema.methods.getAverageEvaluation = function () {
  if (this.userEvaluation.length === 0) return 0;
  const sum = this.userEvaluation.reduce(
    (total, review) => total + review.evaluation,
    0
  );
  return sum / this.userEvaluation.length;
};

const Tools = mongoose.model("Tools", toolsSchema);

export { Tools }; // Экспорт для ES-модулей
