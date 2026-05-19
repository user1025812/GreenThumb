// const mongoose = require("mongoose");

// const progressSchema = new mongoose.Schema(
//   {
//     treeId: {
//       type: String,
//     },

//     species: {
//       type: String,
//     },

//     farmer: {
//       type: String,
//     },

//     lastUpdate: {
//       type: String,
//     },

//     location: {
//       type: String,
//     },

//     stage: {
//       type: String,
//     },

//     nextUpdate: {
//       type: String,
//     },

//     photo: {
//       type: String,
//     },
//   },
//   {
//     collection: "progress",
//   }
// );

// module.exports = mongoose.model("Progress", progressSchema);

const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
  {
    treeId:       { type: String },
    donationId:   { type: String },
    userId:       { type: String },
    species:      { type: String },
    quantity:     { type: Number, default: 1 },
    farmer:       { type: String },
    lastUpdate:   { type: String },
    location:     { type: String },
    specificSite: { type: String },
    stage:        { type: String },
    nextUpdate:   { type: String },
    photo:        { type: String },
  },
  { collection: "progress" }
);

module.exports = mongoose.model("Progress", progressSchema);