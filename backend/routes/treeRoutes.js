const express = require("express");
const router = express.Router();

const Tree = require("../models/Tree");

//GET TREES
router.get("/", async (req, res) => {
  try {
    const trees = await Tree.find();
    res.json(trees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//CREATE TREE
router.post("/", async (req, res) => {
  try {
    const tree = new Tree(req.body);
    const savedTree = await tree.save();
    res.status(201).json(savedTree);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//UPDATE TREE
router.put("/:id", async (req, res) => {
  try {
    const updatedTree =
      await Tree.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
    res.json(updatedTree);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;