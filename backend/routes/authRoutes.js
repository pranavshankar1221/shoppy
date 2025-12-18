const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

module.exports = router;
