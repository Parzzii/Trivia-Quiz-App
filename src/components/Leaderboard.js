import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("http://localhost:5002/api/leaderboard");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // Sort scores in descending order based on the score property
        const sortedData = data.sort((a, b) => b.score - a.score);
        setScores(sortedData);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇"; // Gold medal
    if (index === 1) return "🥈"; // Silver medal
    if (index === 2) return "🥉"; // Bronze medal
    return "👤"; // Default player icon for others
  };

  return (
    <div className="leaderboard-container">
      <Header />
      <div className="leaderboard-card">
        <h1 className="leaderboard-title">🏆 Leaderboard 🏆</h1>
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Game Mode</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={score._id}>
                  <td>{getMedal(index)}</td>
                  <td>{score.name}</td>
                  <td>{score.score}</td>
                  <td>{score.gameMode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
