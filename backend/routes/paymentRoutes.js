// // const express = require("express");
// // const router = express.Router();
// // const axios = require("axios");
// // const Progress = require("../models/Progress");
// // const Payment = require("../models/Payment");

// // /* GET ALL PAYMENTS */
// // router.get("/", async (req, res) => {
// //   try {
// //     const payments = await Payment.find();
// //     res.json(payments);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// // /* ADD PAYMENT / INITIALIZE INTENT */
// // router.post("/", async (req, res) => {
// //   try {
// //     console.log("Payment request received:", req.body); // ADD THIS
// //     const { amount, userId, treeId, description } = req.body;

// //     // 1. Check if amount exists and is a valid number
// //     if (!amount || isNaN(amount)) {
// //       return res.status(400).json({ message: "A valid Peso amount is required." });
// //     }

// //     const pesoAmount = parseFloat(amount);

// //     // 2. PayMongo requires amounts in centavos (ints)
// //     const amountInCents = Math.round(pesoAmount * 100);

// //     // 3. Request payment intent from PayMongo
// //     const paymongoResponse = await axios.post(
// //       "https://api.paymongo.com/v1/payment_intents",
// //       {
// //         data: {
// //           attributes: {
// //             amount: amountInCents,
// //             payment_method_allowed: ["gcash", "paymaya", "card", "qrph"],
// //             currency: "PHP",
// //             description: description || "Tree Project Contribution / Payment",
// //           },
// //         },
// //       },
// //       {
// //         headers: {
// //           "Accept": "application/json",
// //           "Content-Type": "application/json",
// //           "Authorization": `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64")}`,
// //         },
// //       }
// //     );

// //     const intentId = paymongoResponse.data.data.id;
// //     const clientKey = paymongoResponse.data.data.attributes.client_key;

// //     // 4. Create local DB log entry safely handling optional treeId variations
// //     const newPayment = new Payment({
// //       transactionId: intentId,       
// //       donationId: `DN-${Math.floor(100000 + Math.random() * 900000)}`,
// //       donor: userId,                   
// //       amount: pesoAmount.toFixed(2),    
// //       method: "GCash",                  
// //       reference: intentId,              
// //       tree: treeId || "Multiple Species",
// //       datePaid: "Pending"              
// //     });

// //     const savedPayment = await newPayment.save();

// //     const today = new Date();
// // const nextMonth = new Date(today);
// // nextMonth.setMonth(nextMonth.getMonth() + 1);

// // const newProgress = new Progress({
// //   treeId: savedPayment.donationId,
// //   species: treeId || "Multiple Species",
// //   farmer: "Unassigned",
// //   lastUpdate: today.toISOString().split("T")[0],
// //   location: "To be assigned",
// //   stage: "Seedling",
// //   nextUpdate: nextMonth.toISOString().split("T")[0],
// //   photo: "",
// // });

// // await newProgress.save();

// //     // 5. Response explicitly back to your Join.js component destructured keys
// //     res.status(201).json({
// //       success: true,
// //       payment: savedPayment,
// //       clientKey: clientKey, 
// //       intentId: intentId 
// //     });

// //   } catch (error) {
// //     // This logs the exact error reason from PayMongo directly into your terminal
// //     console.error("================ PAYMONGO REJECTION DETAILS ================");
// //     console.error(error.response?.data || error.message);
// //     console.error("==========================================================");

// //     res.status(500).json({
// //       message: "Failed to initialize payment process.",
// //       error: error.response?.data || error.message,
// //     });
// //   }
// // });

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const Progress = require("../models/Progress");
// const Payment = require("../models/Payment");

// router.get("/", async (req, res) => {
//   try {
//     const payments = await Payment.find();
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const { amount, userId, treeId, description } = req.body;

//     if (!amount || isNaN(amount)) {
//       return res.status(400).json({ message: "A valid Peso amount is required." });
//     }

//     const pesoAmount = parseFloat(amount);
//     const amountInCents = Math.round(pesoAmount * 100);

//     const paymongoResponse = await axios.post(
//       "https://api.paymongo.com/v1/payment_intents",
//       {
//         data: {
//           attributes: {
//             amount: amountInCents,
//             payment_method_allowed: ["gcash", "paymaya", "card", "qrph"],
//             currency: "PHP",
//             description: description || "Tree Project Contribution / Payment",
//           },
//         },
//       },
//       {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Basic ${Buffer.from(
//             process.env.PAYMONGO_SECRET_KEY + ":"
//           ).toString("base64")}`,
//         },
//       }
//     );

//     const intentId = paymongoResponse.data.data.id;
//     const clientKey = paymongoResponse.data.data.attributes.client_key;

//     const donationId = `DN-${Math.floor(100000 + Math.random() * 900000)}`;
//     const transactionId = `T-${Math.floor(100000 + Math.random() * 900000)}`;

//     const newPayment = new Payment({
//       transactionId,
//       donationId,
//       donor: userId,
//       amount: pesoAmount.toFixed(2),
//       method: "GCash",
//       reference: intentId,
//       tree: treeId || "Multiple Species",
//       datePaid: "Pending",
//     });

//     const savedPayment = await newPayment.save();

//     const today = new Date();
//     const nextMonth = new Date(today);
//     nextMonth.setMonth(nextMonth.getMonth() + 1);

//     const newProgress = new Progress({
//       treeId: donationId,
//       donationId,
//       userId,
//       species: treeId || "Multiple Species",
//       farmer: "Unassigned",
//       lastUpdate: today.toISOString().split("T")[0],
//       location: "To be assigned",
//       stage: "Seedling",
//       nextUpdate: nextMonth.toISOString().split("T")[0],
//       photo: "",
//     });

//     await newProgress.save();

//     res.status(201).json({
//       success: true,
//       payment: savedPayment,
//       clientKey,
//       intentId,
//     });
//   } catch (error) {
//     console.error("PAYMONGO ERROR:", error.response?.data || error.message);
//     res.status(500).json({
//       message: "Failed to initialize payment process.",
//       error: error.response?.data || error.message,
//     });
//   }
// });

// // ADD THIS — needed for marking payments as paid
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedPayment = await Payment.findByIdAndUpdate(
//       req.params.id, req.body, { new: true }
//     );
//     res.json(updatedPayment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const axios = require("axios");
const Payment  = require("../models/Payment");
const Progress = require("../models/Progress");
const Tree     = require("../models/Tree");
const User     = require("../models/User");

/* GET ALL PAYMENTS — enriched with tree species, location, and donor name */
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find();
    const trees    = await Tree.find();
    const users    = await User.find();

    const treeByDonation = {};
    const treeByEmail    = {};
    trees.forEach(t => {
      if (t.donationId) treeByDonation[t.donationId] = t;
      if (t.email)      treeByEmail[t.email.toLowerCase().trim()] = t;
    });

    const userMap = {};
    users.forEach(u => {
      if (u.email)  userMap[u.email.toLowerCase().trim()] = u.name;
      if (u.userId) userMap[u.userId] = u.name;
    });

    const enriched = payments.map(p => {
      const tree = treeByDonation[p.donationId] || treeByEmail[p.donor?.toLowerCase?.().trim()];
      return {
        ...p.toObject(),
        donor:        userMap[p.donor?.toLowerCase?.().trim()] || p.donor,
        tree:         tree?.species      || p.tree    || "Unknown",
        location:     tree?.location     || "N/A",
        specificSite: tree?.specificSite || "N/A",
        quantity:     tree?.quantity     || 1,
      };
    });

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* POST — Create payment intent + progress records */
router.post("/", async (req, res) => {
  try {
    const {
      amount,
      userId,
      donationId: incomingDonationId,
      selectedTrees,
      region,
      specificSite,
      description,
    } = req.body;

        console.log("Payment received:", { userId, region, specificSite, selectedTrees });

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ message: "A valid Peso amount is required." });
    }

    const pesoAmount    = parseFloat(amount);
    const amountInCents = Math.round(pesoAmount * 100);

    // 1. Create PayMongo payment intent
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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            process.env.PAYMONGO_SECRET_KEY + ":"
          ).toString("base64")}`,
        },
      }
    );

    const intentId  = paymongoResponse.data.data.id;
    const clientKey = paymongoResponse.data.data.attributes.client_key;

    // 2. Use shared donationId from frontend or generate one
    const donationId    = incomingDonationId || `DN-${Math.floor(100000 + Math.random() * 900000)}`;
    const transactionId = `T-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Label the payment with all species in this order
    const primarySpecies =
      selectedTrees?.length > 0
        ? selectedTrees.map(t => t.name).join(", ")
        : "Unknown";

    // 4. Save payment record
    const newPayment = new Payment({
      transactionId,
      donationId,
      donor:      userId,
      amount:     pesoAmount.toFixed(2),
      method:     "GCash",
      paymongoId: intentId,
      tree:       primarySpecies,
      datePaid:   "Pending",
    });

    await newPayment.save();

    // 5. Create one Progress record per tree type
    const today     = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (selectedTrees && selectedTrees.length > 0) {
      for (const tree of selectedTrees) {
        await new Progress({
          treeId:       donationId,
          donationId,
          userId,
          species:      tree.name,
          quantity:     tree.quantity,
          farmer:       "Unassigned",
          lastUpdate:   today.toISOString().split("T")[0],
          location:     region       || "To be assigned",
          specificSite: specificSite || "",
          stage:        "Seedling",
          nextUpdate:   nextMonth.toISOString().split("T")[0],
          photo:        "",
        }).save();
      }
    } else {
      // Fallback if selectedTrees wasn't passed
      await new Progress({
        treeId:     donationId,
        donationId,
        userId,
        species:    primarySpecies,
        quantity:   1,
        farmer:     "Unassigned",
        lastUpdate: today.toISOString().split("T")[0],
        location:   region       || "To be assigned",
        specificSite: specificSite || "",
        stage:      "Seedling",
        nextUpdate: nextMonth.toISOString().split("T")[0],
        photo:      "",
      }).save();
    }

    res.status(201).json({
      success: true,
      clientKey,
      intentId,
    });

  } catch (error) {
    console.error("================ PAYMONGO ERROR ================");
    console.error(error.response?.data || error.message);
    console.error("================================================");
    res.status(500).json({
      message: "Failed to initialize payment process.",
      error: error.response?.data || error.message,
    });
  }
});

/* PUT — Update payment (e.g. mark as paid) */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;