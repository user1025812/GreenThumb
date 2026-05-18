const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Tree = require("../models/Tree");
const Payment = require("../models/Payment");

router.get("/stats", async (req, res) => {
  try {
    const totalTrees = await Tree.countDocuments();
    const activeUsers = await User.countDocuments({
      status: "Active",
    });
    const pendingPlantings = await Tree.countDocuments({
      status: "Pending",
    });
    const payments = await Payment.find();
    const totalDonations = payments.reduce(
    (total, item) => total + (Number(item.amount) || 0),
    0
    );
    res.json({
      totalTrees,
      activeUsers,
      pendingPlantings,
      totalDonations,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;