const axios = require("axios");
const md5 = require("md5");
const fs = require("fs");
const dotenv = require("dotenv");

// Определение пути к файлу .env в зависимости от режима работы
const envFilePath = fs.existsSync(".env.local") ? ".env.local" : ".env";
const envContent = fs.readFileSync(envFilePath);
const parsedEnv = dotenv.parse(envContent);

// Перезаписываем значения переменных окружения
Object.assign(process.env, parsedEnv);

exports.payRobokassaController = async (req, res) => {
  const merchant_login = process.env.ROBOKASSA_SHOP_NAME;
  const password_1 = process.env.ROBOKASSA_PASSWORD_1;
  const IsTest = process.env.ROBOKASSA_TEST;
  const { paymentAmount, invoiceId, description } = req.body;

  const signatureValue = md5(
    `${merchant_login}:${paymentAmount}:${invoiceId}:${password_1}`
  );

  try {
    const response = await axios.get(
      `https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=${merchant_login}&OutSum=${paymentAmount}&InvoiceID=${invoiceId}&Description=${description}&SignatureValue=${signatureValue}&IsTest=${IsTest}`
    );

    // Пересылаем ответ Robokassa обратно клиенту
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    // Отправляем обратно ошибку клиенту
    res.status(500).json({ error: "Ошибка при выполнении платежа" });
  }
};
