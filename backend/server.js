const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const treeRoutes = require("./routes/treeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const progressRoutes = require("./routes/progressRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// import models for webhook updates
const Payment = require("./models/Payment");
const Tree = require("./models/Tree");

dotenv.config();

const app = express();

app.use(cors());

/**
 * paymongo webhook route
 * must be before express.json()
*/
app.post("/api/payments/webhook", express.raw({type: "application/json"}), async (req, res) => {
  try {
    // parse it manually inside the handler
    const payload = JSON.parse(req.body.toString());
    const eventType = payload.data.attributes.type;

    if (eventType === "payment.paid") {
      const paymentData = payload.data.attributes.data;
      const amount = paymentData.attributes.amount;
      
      // PayMongo gives you the parent Payment Intent ID inside the webhook payload object
      const paymentIntentId = paymentData.attributes.payment_intent_id;

      console.log(`💰 PayMongo Webhook: Payment of ₱${amount / 100} Succeeded. Intent ID: ${paymentIntentId}`);

      try {
        // 1. Update the parent payment transaction record from "pending" to "Paid"
        const updatedPayment = await Payment.findOneAndUpdate(
          { paymentIntentId: paymentIntentId },
          { status: "Paid" },
          { new: true }
        );

        // 2. Update all corresponding individual trees logged under this transaction checkout context
        const updatedTrees = await Tree.updateMany(
          { paymentIntentId: paymentIntentId },
          { status: "Paid" }
        );

        console.log(`✅ Database Updated! Payment Status set to Paid. Trees updated: ${updatedTrees.modifiedCount}`);
      } catch (dbError) {
        console.error("❌ Failed to update Database records during Webhook processing:", dbError.message);
        // We still send 200 to PayMongo so it doesn't infinitely spam retry attempts on server script hiccups
      }
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// BODY PARSER
app.use(express.json());

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/trees", treeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);

//MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});

//SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});