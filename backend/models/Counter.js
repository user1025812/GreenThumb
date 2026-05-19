const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // 'userId' or 'treeId'
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model("Counter", counterSchema);