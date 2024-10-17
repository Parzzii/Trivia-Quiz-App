const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  gameMode: { type: String, default: "easy" },
});

const Leaderboard = mongoose.model("leaderboard", leaderboardSchema);
module.exports = Leaderboard;
