const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/LeaderboardModel");

// GET leaderboard
router.get("/", async (req, res) => {
  try {
    const scores = await Leaderboard.find();
    console.log("Fetched scores from MongoDB:", scores); // Log the fetched data
    res.json(scores);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error); // Log errors if any
    res.status(500).json({ message: "Error fetching leaderboard data" });
  }
});

// POST new score
router.post("/", async (req, res) => {
  const { name, score, gameMode } = req.body;
  const newScore = new Leaderboard({ name, score, gameMode });

  try {
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    res.status(400).json({ message: "Error saving score" });
  }
});

module.exports = router;
