import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./Register.css";
import Header from "./Header";
import Footer from "./Footer";

function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setError(t("passwords_do_not_match"));
      return;
    }

    try {
      // Make registration request to backend
      const response = await axios.post("/api/user/register", { username, password });
      setSuccess(t("registration_successful"));
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (error) {
      setError(error.response?.data?.message || t("registration_error"));
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="register-container">
      <Header />
      <main className="register-form">
        <h1>{t("register")}</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">{t("username")}:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("username_placeholder")} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("password_placeholder")} required />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">{t("confirm_password")}:</label>
            <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder={t("confirm_password_placeholder")} required />
          </div>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

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
