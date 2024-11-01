import React from "react";

function GameStart() {
  const startGame = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/leaderboard/start-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Game started:", data.message);
      } else {
        console.error("Error starting game:", data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return <button onClick={startGame}>Start Game</button>;
}

export default GameStart;
