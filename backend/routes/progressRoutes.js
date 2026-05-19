const express  = require("express");
const router   = express.Router();
const Progress = require("../models/Progress");
const Tree     = require("../models/Tree");
const Payment  = require("../models/Payment");
const User     = require("../models/User");

// TRACK BY EMAIL + DONATION ID — must be before /:id
router.get("/track", async (req, res) => {
  try {
    const { email, userId } = req.query;

    if (!email || !userId) {
      return res.status(400).json({ message: "Email and User ID are required." });
    }

    // Escape special regex characters in email (. @ + etc)
    const escapedEmail = email.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Step 1 — Check if email exists at all
    const emailExists = await User.findOne({
      email: { $regex: new RegExp(`^${escapedEmail}$`, "i") },
    });

    if (!emailExists) {
      return res.status(404).json({ message: "No account found with that email address." });
    }

    // Step 2 — Check if userId matches that email
    if (emailExists.userId !== userId.trim()) {
      return res.status(404).json({ message: "User ID does not match this email address." });
    }

    // Step 3 — Find progress records (userId in Progress stores the email)
    const progress = await Progress.find({
      userId: { $regex: new RegExp(`^${escapedEmail}$`, "i") },
    });

    if (!progress.length) {
      return res.status(404).json({ message: "No trees found yet. Trees appear after payment is completed." });
    }

    // Step 4 — Enrich with tree data
    const trees = await Tree.find({
      email: { $regex: new RegExp(`^${escapedEmail}$`, "i") },
    });

    const treeMap = {};
    trees.forEach(t => { if (t.donationId) treeMap[t.donationId] = t; });

    const enriched = progress.map(p => {
      const obj  = p.toObject();
      const tree = treeMap[p.donationId];
      return {
        ...obj,
        species:      (obj.species && obj.species !== "Multiple Species") ? obj.species : (tree?.species || "Unknown"),
        location:     (obj.location && obj.location !== "To be assigned") ? obj.location : (tree?.location || "N/A"),
        specificSite: obj.specificSite || tree?.specificSite || "N/A",
        quantity:     obj.quantity     || tree?.quantity     || 1,
        donorName:    emailExists.name,
      };
    });

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const progress = await Progress.find();
    const trees    = await Tree.find();
    const payments = await Payment.find();
    const users    = await User.find();

    const treeByDonation = {};
    trees.forEach(t => { if (t.donationId) treeByDonation[t.donationId] = t; });

    const paymentByDonation = {};
    payments.forEach(p => { if (p.donationId) paymentByDonation[p.donationId] = p; });

    const userMap = {};
    users.forEach(u => {
      if (u.email)  userMap[u.email.toLowerCase().trim()] = u;
      if (u.userId) userMap[u.userId] = u;
    });

    const enriched = progress.map(p => {
      const obj      = p.toObject();
      const tree     = treeByDonation[p.donationId];
      const payment  = paymentByDonation[p.donationId];
      const userData = userMap[p.userId?.toLowerCase?.().trim()] || userMap[p.userId];

      const location = (obj.location && obj.location !== "To be assigned" && obj.location !== "")
        ? obj.location : (tree?.location || "N/A");
      const specificSite = (obj.specificSite && obj.specificSite !== "")
        ? obj.specificSite : (tree?.specificSite || "N/A");
      const species = (obj.species && obj.species !== "Multiple Species" && obj.species !== "")
        ? obj.species : (tree?.species || "Unknown");

      return {
        ...obj,
        species, location, specificSite,
        quantity:   tree?.quantity  || obj.quantity || 1,
        amount:     payment?.amount || null,
        userId:     userData?.userId || obj.userId  || "N/A",
        donorName:  userData?.name   || p.userId    || "N/A",
      };
    });

    res.json(enriched);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const saved = await new Progress(req.body).save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;