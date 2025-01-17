import mongoose from "mongoose"; // Заменяем require на import

const whoisToolsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  email: String,
  subscriptionFreeDomen: [
    {
      domen: String,
      freeData: Date,
      dataSubscription: { type: Date, default: Date.now },
    },
  ],
});

const Whois = mongoose.model("whois", whoisToolsSchema);

export { Whois }; // Заменяем module.exports на export
