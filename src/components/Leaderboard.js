import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Leaderboard.css";
import { useTranslation } from "react-i18next";  


const Leaderboard = ({ refresh }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation(); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5002/api/leaderboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch leaderboard data");
        const data = await response.json();
        setScores(data.sort((a, b) => b.score - a.score));
      } catch (error) {
        console.error("Error fetching scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [refresh]); // Refresh leaderboard data when `refresh` changes

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
        <h1 className="leaderboard-title">🏆 {t("leaderboard")} 🏆</h1>

        {/* Loading and Error Messages */}
        {loading && <p className="loading-message">{t("loading")}...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div className="leaderboard-table">
            <table>
              <thead>
                <tr>
                  <th>{t("rank")}</th>
                  <th>{t("name")}</th>
                  <th>{t("score")}</th>
                  <th>{t("game_mode")}</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr key={score._id} className={index < 3 ? `top-${index + 1}` : ""}>
                    <td>{getMedal(index)}</td>
                    <td>{score.name}</td>
                    <td>{score.score}</td>
                    <td>{score.gameMode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
