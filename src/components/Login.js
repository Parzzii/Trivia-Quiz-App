import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import "./Login.css";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const response = await axios.post("/api/user/login", { username, password });
      // Save token and username to local storage and navigate to the home page
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      navigate("/"); // Redirect to home page
    } catch (error) {
      // Set an error message if login fails
      setError(t("Invalid Username or Password"));
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-form">
        <h1>{t("login")}</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">{t("username")}:</label>
            <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("enter_username_placeholder")} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t("password")}:</label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t("enter_password_placeholder")} required />
          </div>

          {error && <p className="error-message">{error}</p>}

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
