import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button className="footer-button" onClick={() => navigate("/languages")}>
        {t("languages")}
      </button>
      <button className="footer-button" onClick={() => navigate("/support")}>
        {t("support")}
      </button>
      <button className="footer-button" onClick={() => navigate("/contact")}>
        {t("contact_us")}
      </button>
    </footer>
  );
};

export default Footer;
