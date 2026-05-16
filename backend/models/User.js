const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  treesDonated: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    default: "Active",
  },

  joinedDate: {
    type: String,
  },

  profileImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);