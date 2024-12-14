const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    subject: String,
    status: { type: String, default: 'open' },
    createdAt: { type: Date, default: Date.now },
    messages: [
      {
        sender: { type: String, enum: ['user', 'support'], required: true },
        message: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  });
  
  const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);

  module.exports = { SupportTicket };