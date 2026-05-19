const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Tree = require("../models/Tree");
const Payment = require("../models/Payment");

/* =========================
   DASHBOARD STATS
========================= */
router.get("/stats", async (req, res) => {

  try {

    const totalTrees =
      await Tree.countDocuments();

    const activeUsers =
      await User.countDocuments({
        status: "Active",
      });

    const pendingPlantings =
      await Tree.countDocuments({
        status: "Pending",
      });

    const payments =
      await Payment.find();

    const totalDonations =
      payments.length > 0
        ? payments.reduce(
            (total, item) =>
              total +
              Number(
                String(item.amount)
                  .replace("₱", "")
                  .replace(/,/g, "")
              ),
            0
          )
        : "N/A";

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

/* =========================
   DASHBOARD DATA
========================= */
router.get("/dashboard-data", async (req, res) => {

  try {

    const payments =
      await Payment.find();

    /* =========================
       LATEST DONATIONS
    ========================= */
    const latestDonations =
      payments.slice(-5).reverse();

    /* =========================
       TREE POPULARITY
    ========================= */
    const treeMap = {};

    payments.forEach((payment) => {

      const tree =
        payment.tree || "Unknown";

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

    /* =========================
       CONTRIBUTION INSIGHTS
    ========================= */
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

        treePopularity.forEach((tree) => {

          monthData[tree._id] = 0;

        });

        return monthData;

      });

    payments.forEach((payment) => {

      if (!payment.datePaid) return;

      const date =
        new Date(payment.datePaid);

      const monthIndex =
        date.getMonth();

      const tree =
        payment.tree || "Unknown";

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