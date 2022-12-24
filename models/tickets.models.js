const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  bookmark: {type: Boolean, default : false},
  
},{ timestamps: true });

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = { Ticket };
