const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/auth");

const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));

// connect DB
mongoose
  .connect("mongodb://127.0.0.1:27017/hangman")
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
// route رئيسي
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "test.html"));
});
// routes
app.use("/api/auth", authRoutes);

// run server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
