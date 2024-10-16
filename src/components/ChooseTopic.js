import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  
import "./ChooseTopic.css"; // Ensure your CSS file path is correct
import Header from "./Header";
import Footer from "./Footer";

function ChooseTopic() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [difficulty, setDifficulty] = useState("easy"); // Default difficulty
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();

        if (data.trivia_categories) {
          setCategories(data.trivia_categories);
          setFilteredCategories(data.trivia_categories); // Initialize filtered categories
        } else {
          throw new Error("No categories found");
        }
      } catch (error) {
        setError("Failed to fetch categories. Please try again.");
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleTopicSelect = (topicId) => {
    navigate("/question-page", {
      state: { topicId, difficulty },
    });
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = categories.filter((category) => decodeURIComponent(category.name).toLowerCase().includes(term));
    setFilteredCategories(filtered);
  };

  return (
    <div className="choose-topic-container">
      <Header />
      <main className="choose-topic-main">
        <h1>{t("choose_a_topic")}</h1>

        {/* Difficulty Selector */}
        <div className="difficulty">
          <label htmlFor="difficulty-select">{t("select_difficulty")}:</label>
          <select id="difficulty-select" value={difficulty} onChange={handleDifficultyChange}>
            <option value="easy">{t("easy")}</option>
            <option value="medium">{t("medium")}</option>
            <option value="hard"> {t("hard")}</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="search-bar">
          <input type="text" placeholder= {t("search_topics")} value={searchTerm} onChange={handleSearchChange} />
        </div>

        {/* Topic Grid */}
        {loading && <p>{t("loading_categories")}...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && filteredCategories.length > 0 ? (
          <div className="topic-grid">
            {filteredCategories.map((category) => (
              <div key={category.id} className="topic-box" onClick={() => handleTopicSelect(category.id)}>
                {decodeURIComponent(category.name)}
              </div>
            ))}
          </div>
        ) : (
          <p>{t("no_categories")}</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default ChooseTopic;
