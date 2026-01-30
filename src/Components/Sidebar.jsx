import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "./Icons";
import { t } from "../i18n/translations";

const Sidebar = ({ language = "en" }) => {
  const location = useLocation();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/docs")) {
      setIsDocsOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path ? "active" : "";

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <button 
        className="hamburger-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
      </button>

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        
        <div className="sidebar-header">
          <h1 className="brand-logo">HZ<span className="dot">.</span></h1>
          <p className="brand-sub">Developer</p>
        </div>

        
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-item ${isActive("/")}`} onClick={closeMobileMenu}>
                <Icons.Home /> <span>{t(language, "home")}</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-item ${isActive("/about")}`} onClick={closeMobileMenu}>
                <Icons.User /> <span>{t(language, "about")}</span>
              </Link>
            </li>
            <li>
              <Link to="/projects" className={`nav-item ${isActive("/projects")}`} onClick={closeMobileMenu}>
                <Icons.GitHub /> <span>{t(language, "projects")}</span>
              </Link>
            </li>


            
            <li>
              <div className="nav-item-wrapper">
                <Link 
                  to="/docs" 
                  className={`nav-item ${location.pathname.startsWith("/docs") ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <Icons.Book /> <span>{t(language, "documentation")}</span>
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDocsOpen(!isDocsOpen);
                  }}
                  className="dropdown-toggle-btn"
                  aria-label="Toggle documentation submenu"
                >
                  <Icons.ChevronDown style={{ 
                    transform: isDocsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s"
                  }} />
                </button>
              </div>

              {isDocsOpen && (
                <ul className="submenu">
                  <li>
                    <Link to="/docs/invite" className="submenu-item" onClick={closeMobileMenu}>
                      Invite Manager
                    </Link>
                  </li>
                  <li>
                    <Link to="/docs/template" className="submenu-item" onClick={closeMobileMenu}>
                      Template Bot
                    </Link>
                  </li>
                  <li>
                    <Link to="/docs/multipurpose" className="submenu-item" onClick={closeMobileMenu}>
                      Multipurpose Bot
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/resources" className={`nav-item ${isActive("/resources")}`} onClick={closeMobileMenu}>
                <Icons.Stack /> <span>{t(language, "resources")}</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-item ${isActive("/contact")}`} onClick={closeMobileMenu}>
                <Icons.Mail /> <span>{t(language, "contact")}</span>
              </Link>
            </li>
          </ul>
        </nav>

        
        <div className="sidebar-footer">
          <div className="social-links">
            <a href="https://github.com/HaskaZuki" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Icons.GitHub />
            </a>
            <a href="https://discord.com/users/710245394533318676" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Icons.Discord />
            </a>
            <a href="mailto:haskabussiness@gmail.com" className="social-icon">
              <Icons.Mail />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;