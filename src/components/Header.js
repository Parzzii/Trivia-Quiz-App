import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.css";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="icon" onClick={() => navigate("/")}>
        {/* Future icon will go here */}
      </div>

      {/* Translatable site title */}
      <div className="know-it-all" onClick={() => navigate("/")}>
        {t("know_it_all")} {/* Translation key for "Know It All" */}
      </div>

      <div className="login-register">
        {/* Translatable Login button */}
        <button className="login-button" onClick={() => navigate("/login")}>
          {t("login")} {/* Translation key for "Login" */}
        </button>

        {/* Translatable Register button */}
        <button className="register-button" onClick={() => navigate("/register")}>
          {t("register")} {/* Translation key for "Register" */}
        </button>
        <button className="random-button" onClick={() => navigate("/random")}>
          {t("random")} {/* Translation key for "Register" */}
        </button>
        <button className="friends-button" onClick={() => navigate("/friends")}>
          {t("friends")} {/* Translation key for "Register" */}
        </button>
      </div>
    </header>
  );
};

export default Header;
