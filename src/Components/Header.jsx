import React from "react";
import * as Icons from "./Icons";
import { useLocation } from "react-router-dom";

const Header = ({ theme, toggleTheme }) => {
  const location = useLocation();

  const getPageInfo = (path) => {
    switch (path) {
      case "/": return { title: "DASHBOARD", subtitle: "Overview of system status and metrics." };
      case "/about": return { title: "ABOUT DEVELOPER", subtitle: "The logic behind the systems." };
      case "/projects": return { title: "SYSTEM REPOSITORIES", subtitle: "Archived mission-critical applications." };
      case "/resources": return { title: "SYSTEM RESOURCES", subtitle: "Tools and libraries for development." };
      case "/contact": return { title: "CONTACT US", subtitle: "Direct line to the developer." };
      case "/docs/invite": return { title: "DOCS INVITEMANAGER", subtitle: "Documentation for InviteManager Bot." };
      case "/docs/template": return { title: "DOCS TEMPLATEBOT", subtitle: "Documentation for TemplateBot." };
      case "/docs/multipurpose": return { title: "DOCS MULTIPURPOSE", subtitle: "Documentation for Multipurpose Bot." };
      default: return { title: "Developer Portfolio", subtitle: "Welcome to the system." };
    }
  };

  const pageInfo = getPageInfo(location.pathname);

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="header-title-group">
          <h2 className="header-title">
            {pageInfo.title}
          </h2>
          <p className="header-subtitle">
            {pageInfo.subtitle}
          </p>
        </div>

        <div className="header-controls">
          <div className="theme-toggle-wrapper">
            <button 
              className="btn-theme-toggle"
              onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
              title="Toggle System Theme"
            >
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
      
.main-header {
  min-height: var(--header-height);
  padding: 2rem; /* Add vertical padding for breathing room */
  display: flex; 
  align-items: center; 
  justify-content: center;
  position: relative;
  z-index: 10;
  margin-bottom: 2rem;
  background: var(--bg-core);
  border-bottom: 1px solid var(--glass-border);
}
        .header-content {
          width: 100%;

          display: flex; 
          align-items: center;
          justify-content: space-between;
        }
        .header-title-group {
          display: flex; flex-direction: column; align-items: flex-start;
          text-align: left;
          white-space: nowrap;
          margin-right: auto; /* Push everything else to right */
        }
        .header-controls {
          display: flex;
        }
        .header-title {
          font-family: var(--font-sans); /* Clean, modern font */
          font-weight: 700;
          font-size: 3rem; /* "Gedein" - much bigger */
          letter-spacing: -0.5px;
          line-height: 1.1;
          color: var(--text-main);
        }
        .header-subtitle {
          font-family: var(--font-sans);
          font-size: 1.1rem; /* Slightly bigger subtitle */
          color: var(--text-muted);
          margin-top: 0.5rem;
          font-weight: 400;
        }
        .header-badge {
          font-size: 0.75rem;
          color: var(--accent-primary);
          letter-spacing: 2px;
        }
        
        .theme-toggle-wrapper {
          border: 1px solid var(--glass-border);
          padding: 5px;
          background: rgba(255,255,255,0.02);
        }
        .btn-theme-toggle {
          background: var(--bg-subtle);
          border: 1px solid var(--accent-secondary);
          color: var(--text-main);
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-theme-toggle:hover {
          background: var(--accent-secondary);
          color: white;
          box-shadow: 0 0 10px var(--accent-secondary);
        }
      `}</style>
    </header>
  );
};

export default Header;
