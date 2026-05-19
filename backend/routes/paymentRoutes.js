const express = require("express");
const router = express.Router();
const axios = require("axios");
const Payment = require("../models/Payment");

/* GET ALL PAYMENTS */
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ADD PAYMENT / INITIALIZE INTENT */
router.post("/", async (req, res) => {
  try {
    const { amount, userId, treeId, description } = req.body;

    // 1. Check if amount exists and is a valid number
    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "A valid Peso amount is required." });
    }

    const pesoAmount = parseFloat(amount);

    // 2. PayMongo requires amounts in centavos (ints)
    const amountInCents = Math.round(pesoAmount * 100);

    // 3. Request payment intent from PayMongo
    const paymongoResponse = await axios.post(
      "https://api.paymongo.com/v1/payment_intents",
      {
        data: {
          attributes: {
            amount: amountInCents,
            payment_method_allowed: ["gcash", "paymaya", "card", "qrph"],
            currency: "PHP",
            description: description || "Tree Project Contribution / Payment",
          },
        },
      },
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
        },
      }
    );

    const intentId = paymongoResponse.data.data.id;
    const clientKey = paymongoResponse.data.data.attributes.client_key;

    // 4. Create local DB log entry safely handling optional treeId variations
    const newPayment = new Payment({
      transactionId: intentId,       
      donationId: `DN-${Math.floor(100000 + Math.random() * 900000)}`,
      donor: userId,                   
      amount: pesoAmount.toFixed(2),    
      method: "GCash",                  
      reference: intentId,              
      tree: treeId || "Multiple Species",
      datePaid: "Pending"              
    });

    const savedPayment = await newPayment.save();

    // 5. Response explicitly back to your Join.js component destructured keys
    res.status(201).json({
      success: true,
      payment: savedPayment,
      clientKey: clientKey, 
      intentId: intentId 
    });

  } catch (error) {
    // This logs the exact error reason from PayMongo directly into your terminal
    console.error("================ PAYMONGO REJECTION DETAILS ================");
    console.error(error.response?.data || error.message);
    console.error("==========================================================");

    res.status(500).json({
      message: "Failed to initialize payment process.",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;