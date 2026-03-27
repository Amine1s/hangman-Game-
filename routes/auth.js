const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check user exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    res.json({ msg: "Login success" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
