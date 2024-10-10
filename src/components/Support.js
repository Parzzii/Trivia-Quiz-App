import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  
import "./Support.css";
import Header from "./Header";
import Footer from "./Footer";


function Support() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBackClick = () => {
    navigate("/"); // Navigates to the home page
  };

  return (
    <div className="support-container">
      <Header />

      <div className="contact-form">
        <h1>{t("contact_form")}:</h1>
        <form>
          <input type="email" placeholder={t("contact_form_email_placeholder")} className="input-field" required />
          <input type="text" placeholder={t("contact_form_subject_placeholder")} className="input-field" required />
          <textarea  placeholder={t("contact_form_message_placeholder")}  className="message-box" required></textarea>
          <p className="note">  {t("support_note")}</p>
          <div className="button-group">
            <button type="submit" className="send-button">
              {t("send")}!
            </button>
          </div>
          <div className="back-button-group">
            <button type="button" className="back-button" onClick={handleBackClick}>
              {t("back")}
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Support;
