const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

/* GET ALL PAYMENTS */
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

/* ADD PAYMENT */
router.post("/", async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;