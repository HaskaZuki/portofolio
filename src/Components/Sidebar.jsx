import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "./Icons";
import { t } from "../i18n/translations";

const Sidebar = ({ language = "en" }) => {
  const location = useLocation();
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/docs")) {
      setIsDocsOpen(true);
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <aside className="sidebar">
      
      <div className="sidebar-header">
        <h1 className="brand-logo">HZ<span className="dot">.</span></h1>
        <p className="brand-sub">Developer</p>
      </div>

      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li>
            <Link to="/" className={`nav-item ${isActive("/")}`}>
              <Icons.Home /> <span>{t(language, "home")}</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-item ${isActive("/about")}`}>
              <Icons.User /> <span>{t(language, "about")}</span>
            </Link>
          </li>
          <li>
            <Link to="/projects" className={`nav-item ${isActive("/projects")}`}>
              <Icons.GitHub /> <span>{t(language, "projects")}</span>
            </Link>
          </li>

          
          <li>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Link 
                to="/docs" 
                className={`nav-item ${location.pathname.startsWith("/docs") ? "active" : ""}`}
                style={{ flex: 1, justifyContent: "flex-start" }}
              >
                <Icons.Book /> <span>{t(language, "docs")}</span>
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDocsOpen(!isDocsOpen);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label="Toggle docs menu"
              >
                {isDocsOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
              </button>
            </div>

            {isDocsOpen && (
              <ul className="submenu-list fade-in">
                <li><Link to="/docs/invite" className={`submenu-item ${isActive("/docs/invite")}`}>{t(language, "inviteManager")}</Link></li>
                <li><Link to="/docs/template" className={`submenu-item ${isActive("/docs/template")}`}>{t(language, "templateBot")}</Link></li>
                <li><Link to="/docs/multipurpose" className={`submenu-item ${isActive("/docs/multipurpose")}`}>{t(language, "multipurposeBot")}</Link></li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/resources" className={`nav-item ${isActive("/resources")}`}>
              <Icons.Stack /> <span>{t(language, "resources")}</span>
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-item ${isActive("/contact")}`}>
              <Icons.Mail /> <span>{t(language, "contact")}</span>
            </Link>
          </li>
        </ul>
      </nav>

      
      <div className="sidebar-footer">
        <p className="connect-label">{t(language, "connect")}</p>
        <div className="social-dock">
          <a href="https://github.com/HaskaZuki" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub"><Icons.GitHub /></a>
          <a href="https://discord.com/users/710245394533318676" target="_blank" rel="noopener noreferrer" className="social-icon" title="Discord"><Icons.Discord /></a>
          <a href="mailto:haskabussiness@gmail.com" className="social-icon" title="Email"><Icons.Mail /></a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;