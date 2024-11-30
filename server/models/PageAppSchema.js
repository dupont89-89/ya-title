const mongoose = require("mongoose");

const pageAppSchema = new mongoose.Schema({
  pageTitle: { type: String, required: true },
  slug: { type: String, required: true },
  textContent: { type: String },
  metaTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
});

const PageApp = mongoose.model("pageApp", pageAppSchema);

module.exports = { PageApp };
