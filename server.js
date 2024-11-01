const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const leaderboardRoutes = require("./src/routes/leaderboardRoutes");
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002; // Set a default port if PORT is not in .env

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://Rhedaoo:Qwerty123@triviaapp.d3n7l.mongodb.net/Trivia?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/user", userRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Server is running!");
});
