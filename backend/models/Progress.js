const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    treeId: {
      type: String,
    },

    species: {
      type: String,
    },

    farmer: {
      type: String,
    },

    lastUpdate: {
      type: String,
    },

    location: {
      type: String,
    },

    stage: {
      type: String,
    },

    nextUpdate: {
      type: String,
    },

    photo: {
      type: String,
    },
  },
  {
    collection: "progress",
  }
);

module.exports = mongoose.model("Progress", progressSchema);