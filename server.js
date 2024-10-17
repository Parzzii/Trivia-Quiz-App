const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const leaderboardRoutes = require("./src/routes/leaderboardRoutes");

require("dotenv").config();
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors({ origin: "*" }));

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

mongoose
  .connect("mongodb+srv://Rhedaoo:Qwerty123@triviaapp.d3n7l.mongodb.net/Trivia?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connected"); // Add this to confirm connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/leaderboard", leaderboardRoutes);
