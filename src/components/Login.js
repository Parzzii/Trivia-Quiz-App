import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  
import "./Login.css";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-form">
        <h1>{t("login")}</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">{t("username")}:</label>
            <input type="text" id="username" name="username" placeholder={t("enter_username_placeholder")} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}:</label>
            <input type="password" id="password" name="password" placeholder={t("enter_password_placeholder")} required />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              {t("login")}
            </button>
            <button className="back-button" onClick={handleBackClick}>
              {t("back")}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
