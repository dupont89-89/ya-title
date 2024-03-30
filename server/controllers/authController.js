const { User, validate } = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

exports.authUserController = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();

    // Создайте объект с данными пользователя
    const userData = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName, // Другие данные, которые вы хотите добавить
    };

    // Отправьте объект userData вместе с токеном в ответе
    res.status(200).send({
      data: { token, user: userData },
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
