import React from "react";
import * as Icons from "../components/Icons";

const Resources = () => (
  <div className="page-wrapper fade-in">
    <header className="page-header">
      <h1>Resources & Credits</h1>
      <p>The technologies, libraries, and assets powering this ecosystem.</p>
    </header>

    <div className="bio-clean-container">
      <h3 style={{ marginBottom: "1rem", color: "var(--accent-primary)" }}>Why this page?</h3>
      <p style={{ color: "var(--text-muted)" }}>
        Transparency is key in software engineering. Here is a comprehensive list of the tools, 
        documentation references, and open-source libraries that make my projects possible.
      </p>
    </div>

    <div className="resources-grid">
      <div className="resource-card glass-card">
        <h3><Icons.Stack /> Core Tech</h3>
        <div className="link-list">
          <a href="https://nodejs.org/" target="_blank" className="resource-link">
            <strong>Node.js</strong> <span>Runtime environment</span>
          </a>
          <a href="https://react.dev/" target="_blank" className="resource-link">
            <strong>React.js</strong> <span>Frontend library</span>
          </a>
          <a href="https://parceljs.org/" target="_blank" className="resource-link">
            <strong>Parcel</strong> <span>Zero config bundler</span>
          </a>
          <a href="https://discord.js.org/" target="_blank" className="resource-link">
            <strong>Discord.js</strong> <span>API interaction</span>
          </a>
        </div>
      </div>

      <div className="resource-card glass-card">
        <h3><Icons.Book /> References</h3>
        <div className="link-list">
          <a href="https://discordjs.guide/" target="_blank" className="resource-link">
            <strong>Discord.js Guide</strong> <span>Official Guide</span>
          </a>
          <a href="https://react.dev/" target="_blank" className="resource-link">
            <strong>React Docs</strong> <span>Framework Docs</span>
          </a>
          <a href="https://developer.mozilla.org/" target="_blank" className="resource-link">
            <strong>MDN Web Docs</strong> <span>Web Standards</span>
          </a>
        </div>
      </div>

      <div className="resource-card glass-card">
        <h3><Icons.Repo /> Assets</h3>
        <div className="link-list">
          <a href="https://lucide.dev/" target="_blank" className="resource-link">
            <strong>Lucide React</strong> <span>Icon pack</span>
          </a>
          <a href="https://fonts.google.com/" target="_blank" className="resource-link">
            <strong>Google Fonts</strong> <span>JetBrains Mono</span>
          </a>
          <a href="https://unsplash.com/" target="_blank" className="resource-link">
            <strong>Unsplash</strong> <span>Placeholder images</span>
          </a>
        </div>
      </div>
    </div>

    <style>{`
      .resources-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 3rem;
      }
      .resource-card h3 {
        display: flex; align-items: center; gap: 0.8rem;
        color: var(--accent-primary);
        font-family: var(--font-mono);
        margin-bottom: 1.5rem;
        font-size: 1.3rem;
      }
      
      .link-list {
        display: flex; flex-direction: column; gap: 0.8rem;
      }
      .resource-link {
        display: flex; justify-content: space-between; align-items: center;
        text-decoration: none;
        padding: 0.8rem;
        border: 1px solid var(--glass-border);
        background: rgba(255,255,255,0.02);
        transition: all 0.2s;
      }
      .resource-link:hover {
        border-color: var(--accent-primary);
        background: rgba(0, 240, 255, 0.05);
        transform: translateX(5px);
      }
      .resource-link strong { color: var(--text-header); font-family: var(--font-mono); font-size: 0.95rem; }
      .resource-link span { color: var(--text-muted); font-size: 0.85rem; }

      .card-subtitle { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem; }
      .tags-container { display: flex; flex-wrap: wrap; gap: 0.8rem; }
      .tech-tag {
        background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
        color: var(--text-main); padding: 0.4rem 0.8rem; font-size: 0.85rem; text-decoration: none;
        transition: all 0.2s;
      }
      .tech-tag:hover { border-color: var(--accent-secondary); color: var(--accent-secondary); }
    `}</style>
  </div>
);

export default Resources;