// const mongoose = require("mongoose");


// const paymentSchema = new mongoose.Schema({
//   transactionId: {
//     type: String,
//   },

//   donationId: {
//     type: String,
//   },

//   donor: {
//     type: String,
//   },

//   amount: {
//     type: String,
//   },

//   method: {
//     type: String,
//   },

//   reference: {
//     type: String,
//   },

//   tree: {
//     type: String,
//   },

//   datePaid: {
//     type: String,
//   },

// });

// module.exports =
//   mongoose.model(
//     "Payment",
//     paymentSchema
//   );

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  transactionId: { type: String },
  donationId:    { type: String },
  donor:         { type: String },
  amount:        { type: String },
  method:        { type: String },
  reference:     { type: String },
  paymongoId:    { type: String },
  tree:          { type: String },
  species:       { type: String },
  datePaid:      { type: String },
});

module.exports = mongoose.model("Payment", paymentSchema);