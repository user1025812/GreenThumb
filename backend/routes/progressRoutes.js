const express = require("express");
const router = express.Router();

const Progress = require("../models/Progress");

/* GET ALL PROGRESS */
router.get("/", async (req, res) => {
  try {

    const progress = await Progress.find();

    res.json(progress);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* ADD PROGRESS */
router.post("/", async (req, res) => {
  try {

    const newProgress = new Progress(req.body);

    const savedProgress = await newProgress.save();

    res.status(201).json(savedProgress);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

/* UPDATE PROGRESS */
router.put("/:id", async (req, res) => {
  try {

    const updatedProgress = await Progress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProgress);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
});

module.exports = router;