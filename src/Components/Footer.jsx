import React from "react";
import * as Icons from "./Icons";
import { t } from "../i18n/translations";

const Footer = ({ theme, toggleTheme, language = "en" }) => {
  return (
    <footer className="global-footer fade-in">
      <h2 className="footer-main-heading">Help and support</h2>
      <div className="footer-grid">
        <div className="footer-section">
          <h4 className="footer-subheading">Did you find what you needed?</h4>
          <div className="feedback-buttons">
            <button className="btn btn-secondary btn-sm">Yes</button>
            <button className="btn btn-secondary btn-sm">No</button>
          </div>
          <a href="#" className="footer-link-small">Privacy policy</a>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subheading">Help us make this portfolio great!</h4>
          <p className="footer-text">Always open to feedback and contributions.</p>
          <a href="https://github.com/HaskaZuki" target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
            <Icons.Repo /> Make a contribution
          </a>
          <a href="#" className="footer-link-small">Learn how to contribute</a>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subheading">Still need help?</h4>
          <div className="footer-links-vertical">
             <a href="https://discord.com/users/710245394533318676" target="_blank" rel="noopener noreferrer" className="footer-link-icon">
               <Icons.Discord /> Ask the community
             </a>
             <a href="mailto:haskabussiness@gmail.com" className="footer-link-icon">
               <Icons.Mail /> Contact support
             </a>
          </div>
        </div>
      </div>
      
      <div className="copyright-bar">
        
        <div className="theme-switcher" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center", gap: "0.5rem" }}>
          <button
            className={`theme-btn btn-sm ${theme === "light" ? "active" : ""}`}
            onClick={() => toggleTheme("light")}
          >
            Light
          </button>
          <div className="theme-divider"></div>
          <button
            className={`theme-btn btn-sm ${theme === "dark" ? "active" : ""}`}
            onClick={() => toggleTheme("dark")}
          >
            Dark
          </button>
        </div>

        <div className="legal-links">
          <span>© 2025 Haska. {t(language, "copyrightText")}</span>
          <a href="#">{t(language, "privacyPolicy")}</a>
          <a href="#">{t(language, "terms")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
