import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";  
import "./Contact.css";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const handleBackClick = () => {
    navigate("/"); // Navigates back to the home page
  };

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-content">
        <h1>{t("contact_us")}</h1>
        <p>{t("contact_title")}</p>
        <p>
          {t("email")}: <a href="mailto:contact@yourdomain.com">{t("contact_email")}</a>
        </p>
        <p>
          {t("phone")}: <a href="tel:+1234567890">(123) 456-7890</a>
        </p>
        <div className="back-button-group">
          <button className="back-button" onClick={handleBackClick}>
            &larr; {t("back")}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
