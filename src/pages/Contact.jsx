import React from "react";
import * as Icons from "../components/Icons";
import { t } from "../i18n/translations";

const Contact = ({ language = "en" }) => (
  <div className="page-wrapper fade-in">
    <header className="page-header">
      <h1>{t(language, "contactTitle")}</h1>
      <p>Let's discuss scalable systems, bot architecture, or coffee.</p>
    </header>

    <div className="bio-clean-container">
      <h3 style={{ marginBottom: "1rem", color: "var(--accent-primary)" }}>{t(language, "getInTouch")}</h3>
      <p style={{ color: "var(--text-muted)" }}>
        I'm currently open for Data Science, Backend Engineering, or Full-stack opportunities. 
        Whether you have a question about my documentation or want to collaborate, feel free to reach out.
      </p>
    </div>

    <div className="contact-grid">
      
      <div className="contact-card glass-card">
        <div className="card-icon"><Icons.Mail /></div>
        <div className="card-info">
          <h3>{t(language, "email")}</h3>
          <span className="role-badge">{t(language, "primaryContact")}</span>
          <a href="mailto:haskabussiness@gmail.com" className="btn-action">{t(language, "clickHere")}</a>
        </div>
      </div>

      
      <div className="contact-card glass-card">
        <div className="card-icon"><Icons.Discord /></div>
        <div className="card-info">
          <h3>{t(language, "discord")}</h3>
          <span className="role-badge">{t(language, "fastResponse")}</span>
          <a href="https://discord.com/users/710245394533318676" target="_blank" rel="noopener noreferrer" className="btn-action">{t(language, "clickHere")}</a>
        </div>
      </div>

      
      <div className="contact-card glass-card">
        <div className="card-icon"><Icons.GitHub /></div>
        <div className="card-info">
          <h3>{t(language, "github")}</h3>
          <span className="role-badge">{t(language, "codebase")}</span>
          <a href="https://github.com/HaskaZuki" target="_blank" rel="noopener noreferrer" className="btn-action">{t(language, "clickHere")}</a>
        </div>
      </div>
    </div>

    <style>{`
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
      }
      .page-header {
        text-align: left;
        margin-bottom: 3rem;
      }
      .contact-card {
        display: flex; flex-direction: column; align-items: center; text-align: center;
        padding: 2rem;
        color: var(--text-main);
        transition: all 0.3s;
        border-radius: 0; 
      }
      .contact-card:hover {
        transform: translateY(-5px);
        background: rgba(255, 255, 255, 0.05);
      }
      .card-icon {
        font-size: 3rem; margin-bottom: 1rem; color: var(--accent-primary);
      }
      .card-info {
        display: flex; flex-direction: column; align-items: center; gap: 1rem;
        width: 100%;
      }
      .card-info h3 { font-size: 1.5rem; margin: 0; color: var(--text-header); }
      .role-badge {
        display: inline-block; padding: 0.3rem 0.8rem;
        border: 1px solid var(--accent-secondary);
        color: var(--accent-secondary);
        font-size: 0.8rem; letter-spacing: 1px;
        text-transform: uppercase;
      }
      
      .btn-action {
        display: inline-block;
        padding: 0.8rem 2rem;
        background: var(--accent-primary);
        color: #000;
        font-weight: bold;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 0.9rem;
        transition: all 0.2s;
        border: none;
        cursor: pointer;
        width: 100%; /* Full width button */
        max-width: 200px;
      }
      .btn-action:hover {
        background: white;
        box-shadow: 0 0 15px var(--accent-primary);
        transform: scale(1.05);
      }
    `}</style>
  </div>
);

export default Contact;