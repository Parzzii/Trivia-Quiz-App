import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";
import icon from "../assets/icon.png";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Retrieve username and token from localStorage
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // Clear user data from localStorage and navigate to home
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <header className="header">
      {/* Left - Icon/Logo */}
      <div className="left-content" onClick={() => navigate("/")}>
        <img
          src={icon}
          alt="Logo"
          className="header-logo"
        />
      </div>

      {/* Center - "KNOW IT ALL" text as clickable button */}
      <div className="center-content">
        <span className="home-button" onClick={() => navigate("/")}>
          {t("know_it_all")}
        </span>
      </div>

      {/* Right - Authentication and Navigation Buttons */}
      <div className="right-buttons">
        {token && username ? (
          <>
            <span className="welcome-message button-style">
              {t("welcome")}, {username}
            </span>
            <button className="random-button button-style" onClick={() => navigate("/random")}>
              {t("random")}
            </button>
            <button className="friends-button button-style" onClick={() => navigate("/Leaderboard")}>
              {t("leaderboard")}
            </button>
            <button className="logout-button button-style" onClick={handleLogout}>
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <button className="login-button button-style" onClick={() => navigate("/login")}>
              {t("login")}
            </button>
            <button className="register-button button-style" onClick={() => navigate("/register")}>
              {t("register")}
            </button>
            <button className="random-button button-style" onClick={() => navigate("/random")}>
              {t("random")}
            </button>
            <button className="friends-button button-style" onClick={() => navigate("/Leaderboard")}>
              {t("leaderboard")}
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
