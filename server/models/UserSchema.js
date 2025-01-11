import mongoose from "mongoose"; // Заменяем require на import
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  vkid: { type: String, unique: true },
  avatar: { type: String },
  tools: [
    {
      nameTools: { type: String },
      fileTools: { type: String },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
  bonusDayLvt: { type: Number, default: 0 },
  lvt: { type: Number, default: 0 },
  lvtPresent: {
    lvtPresentRegistration: { type: Number, default: 0 },
    moneyPresentReferal: { type: Number, default: 0 },
  },
  role: { type: String, default: "user" },
  money: { type: Number, default: 0 },
  moneyHistory: { type: Number, default: 0 },
  notifications: [
    {
      message: { type: String },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
  notificationsHistory: [
    {
      message: { type: String },
      dateAdded: { type: Date, default: Date.now },
    },
  ],
  referal: [
    {
      userId: { type: String }, // Идентификатор приглашенного пользователя
      dateAdded: { type: Date, default: Date.now }, // Дата добавления
    },
  ],
  referalPay: {
    userId: { type: String }, // Идентификатор приглашенного пользователя
    dateAdded: { type: Date }, // Дата добавления
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  apiKeys: [
    {
      key: { type: String, required: true },
      domain: { type: String, required: true },
      isPaid: { type: Boolean, default: false },
      dateAdded: { type: Date, default: Date.now },
      expiryDate: { type: Date }, // Дата окончания оплаченного периода
    },
  ],
  currentTariff: {
    type: String,
    enum: ["Старт", "PRO", "PRO Бизнес +"],
    default: "Старт",
  },
  tariffEndDate: { type: Date },
  tariffHistory: [
    {
      tariff: { type: String, enum: ["Старт", "PRO", "PRO Бизнес +"] },
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
  lvtPurchaseHistory: [
    {
      points: { type: Number },
      purchaseDate: { type: Date, default: Date.now },
    },
  ],
});

// Создаем виртуальное поле для суммы lvt и bonusDayLvt
userSchema.virtual("totalLvt").get(function () {
  return Number((this.lvt + this.bonusDayLvt).toFixed(1));
});

// Включение виртуального поля в JSON и объектное представление
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    currentTariff: Joi.string()
      .valid("Старт", "PRO", "PRO Бизнес +")
      .required()
      .label("Current Tariff"),
    tariffEndDate: Joi.date().required().label("Tariff End Date"),
  });
  return schema.validate(data);
};

export { User, validate }; // Экспорт для ES-модулей
