const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
  },

  donationId: {
    type: String,
  },

  donor: {
    type: String,
  },

  amount: {
    type: String,
  },

  method: {
    type: String,
  },

  reference: {
    type: String,
  },

  date: {
    type: String,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);