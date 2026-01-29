import React from "react";
import { Link } from "react-router-dom";
import * as Icons from "../components/Icons";

const Docs = () => {
  return (
    <div className="page-wrapper fade-in">
      <header className="page-header">
        <h1>Documentation Hub</h1>
        <p>Comprehensive guides for all my Discord bot projects</p>
      </header>

      <div className="bio-clean-container">
        <h3 style={{ marginBottom: "1rem", color: "var(--accent-primary)" }}>About My Projects</h3>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          I specialize in building scalable, production-ready Discord bots using Discord.js v14. 
          Each project is designed with modularity, clean code architecture, and comprehensive documentation 
          to help developers learn and implement features quickly.
        </p>
      </div>

      
      <div className="docs-grid">
        
        <Link to="/docs/invite" className="doc-card glass-card">
          <div className="doc-card-header">
            <div className="doc-icon" style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
              <Icons.User />
            </div>
            <div>
              <h3>Invite Manager Bot</h3>
              <span className="doc-badge">Discord.js v14</span>
            </div>
          </div>
          <p className="doc-description">
            Advanced invite tracking system with welcome/leave messages, invite roles, 
            and giveaway integration. Tracks who invited whom with accurate cache management.
          </p>
          <div className="doc-features">
            <span className="feature-tag">Invite Tracking</span>
            <span className="feature-tag">Welcome System</span>
            <span className="feature-tag">Giveaways</span>
            <span className="feature-tag">Auto Roles</span>
          </div>
          <div className="doc-link-arrow">
            View Documentation <Icons.ChevronRight />
          </div>
        </Link>

        
        <Link to="/docs/template" className="doc-card glass-card">
          <div className="doc-card-header">
            <div className="doc-icon" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
              <Icons.Book />
            </div>
            <div>
              <h3>Template Bot</h3>
              <span className="doc-badge">Beginner Friendly</span>
            </div>
          </div>
          <p className="doc-description">
            Clean and simple Discord bot template designed for easy deployment and learning. 
            Perfect starting point for beginners with modular command structure.
          </p>
          <div className="doc-features">
            <span className="feature-tag">Slash Commands</span>
            <span className="feature-tag">Event Handler</span>
            <span className="feature-tag">MongoDB Ready</span>
            <span className="feature-tag">MIT License</span>
          </div>
          <div className="doc-link-arrow">
            View Documentation <Icons.ChevronRight />
          </div>
        </Link>

        
        <Link to="/docs/multipurpose" className="doc-card glass-card">
          <div className="doc-card-header">
            <div className="doc-icon" style={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }}>
              <Icons.Stack />
            </div>
            <div>
              <h3>Multipurpose Bot</h3>
              <span className="doc-badge">Feature Rich</span>
            </div>
          </div>
          <p className="doc-description">
            All-in-one Discord bot with moderation, utility, fun commands, music player (DisTube), 
            reaction roles, and customizable welcome/leave messages.
          </p>
          <div className="doc-features">
            <span className="feature-tag">Moderation</span>
            <span className="feature-tag">Music Player</span>
            <span className="feature-tag">Reaction Roles</span>
            <span className="feature-tag">Admin Panel</span>
          </div>
          <div className="doc-link-arrow">
            View Documentation <Icons.ChevronRight />
          </div>
        </Link>
      </div>

      
      <div className="docs-quickstart glass-panel">
        <h3>Quick Start Guide</h3>
        <div className="quickstart-steps">
          <div className="step-item">
            <div className="step-number">1</div>
            <div>
              <h4>Choose Your Project</h4>
              <p>Select the bot documentation that matches your needs</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">2</div>
            <div>
              <h4>Follow Setup Instructions</h4>
              <p>Each guide includes detailed installation and configuration steps</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-number">3</div>
            <div>
              <h4>Deploy & Customize</h4>
              <p>Run your bot and modify features to fit your server's requirements</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="tech-stack-section">
        <h3>Technologies Used</h3>
        <div className="tech-grid">
          <div className="tech-item">
            <span className="tech-icon">⚛️</span>
            <span>Discord.js v14</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🍃</span>
            <span>MongoDB</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">🎵</span>
            <span>DisTube</span>
          </div>
          <div className="tech-item">
            <span className="tech-icon">📦</span>
            <span>Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;