const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String },
  bonusDayLvt: { type: Number, default: 0 },
  lvt: { type: Number, default: 0 },
  lvtPresent: {
    lvtPresentRegistration: { type: Number, default: 0 },
    lvtPresentReferal: { type: Number, default: 0 },
  },
  role: { type: String, default: "user" },
  money: { type: Number, default: 0 },
  moneyHistory: { type: Number, default: 0 },
  notifications: { type: [String], default: [] },
  referal: {
    quantity: { type: Number, default: 0 },
  },
});

// Создаем виртуальное поле для суммы lvt и bonusDayLvt
userSchema.virtual("totalLvt").get(function () {
  return this.lvt + this.bonusDayLvt;
});

// Гарантируем, что виртуальное поле totalLvt включается в результаты toJSON и toObject
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
  });
  return schema.validate(data);
};

module.exports = { User, validate };
