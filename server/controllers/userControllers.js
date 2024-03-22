const { User } = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const { validateUser } = require("../utils/validation");

exports.signUpUserController = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    debugger;

    // Валидация данных пользователя
    const { error } = validateUser(req.body);
    if (error) {
      console.log("Validation error:", error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      console.log("User already exists:", user);
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log("Hashed password:", hashPassword);

    // Создание нового пользователя
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Error in signUpUserController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
