import React from "react";
import { Link } from "react-router-dom";
import { t } from "../i18n/translations";

const Home = ({ language = "en" }) => (
  <div className="page-wrapper fade-in">
    <section className="hero-section">
      <div className="content-container">
        <p className="intro-text">System Online. Welcome, I'm <span className="highlight-text">Haska</span></p>
        <h1 className="main-headline">
          Engineering Logic.<br />
          Creative Software.<br />
          <span className="typing-effect">Developer.</span>
        </h1>
        <div className="cta-group">
          <Link to="/about" className="btn btn-primary">{t(language, "viewProjects")}</Link>
          <Link to="/docs" className="btn btn-secondary">{t(language, "viewDocs")}</Link>
        </div>
      </div>
      <div className="hero-bg-grid"></div>
    </section>
  </div>
);

export default Home;