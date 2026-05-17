const mongoose = require("mongoose");

const treeSchema = new mongoose.Schema({

  donationId: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  species: {
    type: String,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  date: {
    type: String,
  },

  status: {
    type: String,
    default: "Pending",
  },

});

module.exports = mongoose.model("Tree", treeSchema);