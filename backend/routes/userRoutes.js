const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE / UPDATE USER (Refactored to handle returning donors cleanly)
router.post("/", async (req, res) => {
  try {
    const { name, email, treesDonated, joinedDate } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // findOneAndUpdate searches for the email. 
    // If it exists, it updates it. If it doesn't, 'upsert: true' creates a new record!
    const savedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() }, // Search criteria
      { 
        $set: { 
          name: name,
          joinedDate: joinedDate || new Date().toLocaleDateString()
        }, 
        $inc: { 
          treesDonated: treesDonated || 0 // $inc increments the number instead of overwriting it!
        }
      },
      { 
        new: true,       // Returns the updated/newly created document
        upsert: true,    // Instantly creates it if it doesn't exist
        runValidators: true 
      }
    );

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error inside POST /api/users:", error.message);
    res.status(400).json({
      message: error.message,
    });
  }
});

// UPDATE USER BY ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;