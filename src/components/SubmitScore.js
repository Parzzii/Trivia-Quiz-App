import React from "react";

function SubmitScore({ score }) {
  const submitScore = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("/api/leaderboard/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Score submitted:", data.message);
      } else {
        console.error("Error updating score:", data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return <button onClick={submitScore}>Submit Score</button>;
}

export default SubmitScore;
