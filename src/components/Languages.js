import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  
import "./Languages.css";
import Header from "./Header";
import Footer from "./Footer";

const Languages = () => {
  const { i18n } = useTranslation(); 
  const { t } = useTranslation(); 
  const navigate = useNavigate();

  // Change the language based on the button clicked
  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);  
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="languages-page">
      <Header />
      <div className="languages-content">
        <h1 className="languages-title"> {t("available")}</h1>
        <p className="languages-text"> {t("currently_support")}</p>
        <ul className="languages-list">
          <li>
            {/* Button to switch the site language to English */}
            <button 
              className={`language-button ${i18n.language === "en" ? "active-language" : ""}`} 
              onClick={() => handleLanguageChange("en")}>
                {t("english")}
            </button>
          </li>
          <li>
            {/* Button to switch the site language to Russian */}
            <button 
              className={`language-button ${i18n.language === "ru" ? "active-language" : ""}`} 
              onClick={() => handleLanguageChange("ru")}>
                {t("russian")}
            </button>
          </li>
        </ul>

        <button className="back-button" onClick={handleBackClick}>
          &larr; {t("back")}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Languages;