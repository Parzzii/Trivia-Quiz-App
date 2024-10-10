import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  
import "./Register.css";
import Header from "./Header";
import Footer from "./Footer";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <div className="register-container">
      <Header />
      <main className="register-form">
        <h1>{t("register")}</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">{t("username")}:</label>
            <input type="text" id="username" name="username" placeholder={t("username_placeholder")} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}:</label>
            <input type="password" id="password" name="password" placeholder={t("password_placeholder")} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">{t("confirm_password")}:</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder={t("confirm_password_placeholder")} required />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              {t("register")}
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

export default Register;
