const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Tree = require("../models/Tree");
const Payment = require("../models/Payment");

/* DASHBOARD STATS */
router.get("/stats", async (req, res) => {
  try {
    /* TOTAL TREES */
    const totalTrees =
      await Tree.countDocuments();
      /* ACTIVE USERS */
    const activeUsers =
      await User.countDocuments({
        status: "Active",
      });
    /* PENDING PLANTINGS */
    const pendingPlantings =
      await Tree.countDocuments({
        status: "Pending",
      });
    const payments =
      await Payment.find();
    const totalDonations =
      payments.reduce((total, item) => {
        const amount =
          Number(
            String(item.amount)
              .replace("₱", "")
              .replace(/,/g, "")
              .trim()
          ) || 0;
        return total + amount;
      }, 0);
    res.json({
      totalTrees,
      activeUsers,
      pendingPlantings,
      totalDonations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});
/* DASHBOARD DATA */
router.get("/dashboard-data", async (req, res) => {
  try {
    const payments =
      await Payment.find();
        console.log(payments);
    /* LATEST DONATIONS */
    const latestDonations =
      payments.slice(-5).reverse();
    /* TREE POPULARITY */
    const treeMap = {};
    payments.forEach((payment) => {
     const tree = String(payment.tree).trim();
      if (!treeMap[tree]) {
        treeMap[tree] = 0;
      }
      treeMap[tree] += 1;
    });
    const treePopularity =
      Object.keys(treeMap).map((tree) => ({
        _id: tree,
        value: treeMap[tree],
      }));
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const contributionData =
    months.map((month) => {
    const monthData = {
      month,
    };
    Object.keys(treeMap).forEach((tree) => {
      monthData[tree] = 0;
    });
    return monthData;
  });
    payments.forEach((payment) => {
      if (!payment.datePaid) return;
      const parsedDate =
        new Date(payment.datePaid);
      if (isNaN(parsedDate)) return;
      const monthIndex =
        parsedDate.getMonth();
      const tree = String(payment.tree).trim();
      if (
        contributionData[monthIndex] &&
        contributionData[monthIndex][tree] !== undefined
      ) {
        contributionData[monthIndex][tree] += 1;
      }
    });
    res.json({
      latestDonations,
      treePopularity,
      contributionData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;