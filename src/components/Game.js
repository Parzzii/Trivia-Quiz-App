import React from "react";
import axios from "axios";

function Game({ onScoreSubmit }) {
  const [score, setScore] = React.useState(0);

  const handleSubmitScore = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5002/api/leaderboard/update",
        { score },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onScoreSubmit(); // Call the refresh function after successful score submission
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  };

  return (
    <div>
      <h2>Game Component</h2>
      {/* Game logic goes here */}
      <button onClick={handleSubmitScore}>Submit Score</button>
    </div>
  );
}

export default Game;
