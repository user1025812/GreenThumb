const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const treeRoutes = require("./routes/treeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const progressRoutes = require("./routes/progressRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/api/users", userRoutes);
app.use("/api/trees", treeRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/progress", progressRoutes);

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