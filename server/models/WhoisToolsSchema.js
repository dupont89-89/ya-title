const mongoose = require("mongoose");

const whoisToolsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  dataSubscription: { type: Date, default: Date.now }, // Добавляем поле createdAt
  subscriptionFreeDomen: {
    domen: { type: String, required: true },
    freeData: { type: String, required: true },
  },
});

const Whois = mongoose.model("whois", whoisToolsSchema);

module.exports = { Whois };
