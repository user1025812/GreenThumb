// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// // GET ALL USERS
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// });

// // CREATE / UPDATE USER
// router.post("/", async (req, res) => {
//   try {
//     console.log("Received body:", req.body);
//     const { name, email, treesDonated, joinedDate } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required." });
//     }

//     const savedUser = await User.findOneAndUpdate(
//       { email: email.toLowerCase().trim() },
//       {
//         $set: {
//           name: name,
//           joinedDate: joinedDate || new Date().toLocaleDateString()
//         },
//         $inc: {
//           treesDonated: treesDonated || 0
//         }
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true
//       }
//     );

//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error("Error inside POST /api/users:", error.message);
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// // UPDATE USER BY ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true
//       }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({
//       message: error.message,
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    // Find users without a userId and assign one
    const usersWithoutId = await User.find({ 
      $or: [{ userId: null }, { userId: "" }, { userId: { $exists: false } }] 
    });

    for (const user of usersWithoutId) {
      await User.findByIdAndUpdate(user._id, {
        $set: { userId: `USER-${Math.floor(100000 + Math.random() * 900000)}` }
      });
    }

    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, treesDonated, joinedDate } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required." });

    const today = new Date();
    const formattedDate = joinedDate || 
      `${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}/${today.getFullYear()}`;

    let savedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase().trim() },
      {
        $set: { name, joinedDate: formattedDate },
        $setOnInsert: {
          userId: `USER-${Math.floor(100000 + Math.random() * 900000)}`,
          status: "Active",
        },
        $inc: { treesDonated: treesDonated || 0 },
      },
      { new: true, upsert: true, runValidators: true }
    );

    // Fix existing users that don't have a userId yet
    if (!savedUser.userId) {
      savedUser = await User.findByIdAndUpdate(
        savedUser._id,
        { $set: { userId: `USER-${Math.floor(100000 + Math.random() * 900000)}` } },
        { new: true }
      );
    }

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;