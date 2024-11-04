const express = require("express");
const router = express.Router();
const Leaderboard = require("../models/LeaderboardModel");
const authMiddleware = require("../middleware/authMiddleware");

// Route to start the game (protected)
router.post("/start-game", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Game started" });
});

// Protected route to update leaderboard with new score
router.post("/update", authMiddleware, async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id;
  const username = req.user.username; // Assuming username is available in req.user from authMiddleware

  try {
    // Find or create leaderboard entry for the user
    let leaderboardEntry = await Leaderboard.findOne({ userId });

    if (leaderboardEntry) {
      // Only update if the new score is higher
      if (score > leaderboardEntry.score) {
        leaderboardEntry.score = score;
        leaderboardEntry.username = username; // Update username if needed
        await leaderboardEntry.save();
        res.status(200).json({ message: "Score updated successfully", updated: true });
      } else {
        res.status(200).json({ message: "Score not updated; existing score is higher", updated: false });
      }
    } else {
      // Create new leaderboard entry if it doesn't exist
      leaderboardEntry = new Leaderboard({ userId, username, score });
      await leaderboardEntry.save();
      res.status(201).json({ message: "New score added to leaderboard", updated: true });
    }
  } catch (error) {
    console.error("Leaderboard update error:", error);
    res.status(500).json({ message: "Error updating leaderboard" });
  }
});

// GET sorted leaderboard (top 10 scores)
router.get("/", async (req, res) => {
  try {
    // Fetch top 10 scores sorted in descending order
    const scores = await Leaderboard.find().sort({ score: -1 }).limit(10); // Limit to top 10
    console.log("Fetched and sorted leaderboard data:", scores);
    res.json(scores);
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    res.status(500).json({ message: "Error fetching leaderboard data" });
  }
});

// POST new score for guest or anonymous mode
router.post("/guest", async (req, res) => {
  const { name, score, gameMode } = req.body;
  const newScore = new Leaderboard({ name, score, gameMode });

  try {
    const savedScore = await newScore.save();
    res.status(201).json(savedScore);
  } catch (error) {
    console.error("Error saving new score:", error);
    res.status(400).json({ message: "Error saving score" });
  }
});

module.exports = router;
