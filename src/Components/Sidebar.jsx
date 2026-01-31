import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "./Icons";
import { t } from "../i18n/translations";

const Sidebar = ({ language = "en" }) => {
  const location = useLocation();
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (location.pathname.startsWith("/docs")) {
      setIsDocsOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const isDocsActive = location.pathname.startsWith("/docs");

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { path: "/", icon: Icons.Home, label: t(language, "home") },
    { path: "/about", icon: Icons.User, label: t(language, "about") },
    { path: "/projects", icon: Icons.GitHub, label: t(language, "projects") },
    { path: "/resources", icon: Icons.Stack, label: t(language, "resources") },
    { path: "/contact", icon: Icons.Mail, label: t(language, "contact") },
  ];

  const docItems = [
    { path: "/docs/invite", label: "Invite Manager" },
    { path: "/docs/template", label: "Template Bot" },
    { path: "/docs/multipurpose", label: "Multipurpose Bot" },
  ];

  return (
    <>
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <motion.button 
        className="hamburger-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
        whileTap={{ scale: 0.95 }}
      >
        {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
      </motion.button>

      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-header">
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <span className="logo-bracket">&lt;</span>
              <span className="logo-text">HZ</span>
              <span className="logo-bracket">/&gt;</span>
            </div>
            <div className="logo-underline">
              <motion.div 
                className="logo-line"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </Link>
          <p className="brand-tagline">Full Stack Developer</p>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link 
                  to={item.path} 
                  className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <motion.div 
                    className="nav-icon-wrapper"
                    animate={{ 
                      scale: hoveredItem === item.path || isActive(item.path) ? 1.1 : 1,
                      rotate: hoveredItem === item.path ? 5 : 0
                    }}
                  >
                    <item.icon />
                  </motion.div>
                  <span className="nav-label">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div 
                      className="active-indicator"
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}

            {/* Documentation with Dropdown */}
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <div 
                className={`nav-item docs-toggle ${isDocsActive ? "active" : ""}`}
                onClick={() => setIsDocsOpen(!isDocsOpen)}
              >
                <motion.div className="nav-icon-wrapper">
                  <Icons.Book />
                </motion.div>
                <span className="nav-label">{t(language, "Documentation")}</span>
                <motion.div 
                  className="dropdown-arrow"
                  animate={{ rotate: isDocsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icons.ChevronDown />
                </motion.div>
              </div>

              <AnimatePresence>
                {isDocsOpen && (
                  <motion.ul 
                    className="submenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <li>
                      <Link to="/docs" className="submenu-header" onClick={closeMobileMenu}>
                        All Documentation
                      </Link>
                    </li>
                    {docItems.map((doc, idx) => (
                      <motion.li 
                        key={doc.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link 
                          to={doc.path} 
                          className={`submenu-item ${location.pathname === doc.path ? "active" : ""}`}
                          onClick={closeMobileMenu}
                        >
                          <span className="submenu-dot">•</span>
                          {doc.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          </ul>
        </nav>

        {/* Social Links */}
        <div className="sidebar-footer">
          <div className="social-links">
            <motion.a 
              href="https://github.com/HaskaZuki" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icons.GitHub />
            </motion.a>
            <motion.a 
              href="https://discord.com/users/710245394533318676" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icons.Discord />
            </motion.a>
            <motion.a 
              href="mailto:haskabussiness@gmail.com" 
              className="social-icon"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icons.Mail />
            </motion.a>
          </div>
          <p className="copyright">© 2025 Haska</p>
        </div>
      </aside>

      <style>{`
        .sidebar {
          position: sticky;
          top: 0;
          width: 260px;
          height: 100vh;
          background: linear-gradient(180deg, var(--bg-sidebar) 0%, rgba(0,0,0,0.95) 100%);
          border-right: 1px solid var(--glass-border);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
        }

        .sidebar-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .logo-link {
          text-decoration: none;
          display: inline-block;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: 700;
        }

        .logo-bracket {
          color: var(--accent-primary);
          opacity: 0.8;
        }

        .logo-text {
          background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-underline {
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin-top: 0.5rem;
          border-radius: 1px;
        }

        .logo-line {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          border-radius: 1px;
        }

        .brand-tagline {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.75rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .sidebar-nav {
          flex-grow: 1;
        }

        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.875rem 1rem;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s ease;
          position: relative;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-item:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.03);
        }

        .nav-item.active {
          color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.08);
        }

        .nav-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .nav-icon-wrapper svg {
          width: 20px;
          height: 20px;
        }

        .active-indicator {
          display: none;
        }

        .docs-toggle {
          cursor: pointer;
        }

        .dropdown-arrow {
          margin-left: auto;
          display: flex;
          align-items: center;
        }

        .dropdown-arrow svg {
          width: 16px;
          height: 16px;
        }

        .submenu {
          list-style: none;
          margin-left: 1rem;
          padding-left: 1rem;
          border-left: 1px solid var(--glass-border);
          overflow: hidden;
        }

        .submenu-header {
          display: block;
          padding: 0.6rem 0.75rem;
          color: var(--accent-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .submenu-header:hover {
          background: rgba(255, 0, 255, 0.05);
        }

        .submenu-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 0.75rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .submenu-item:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.03);
          padding-left: 1rem;
        }

        .submenu-item.active {
          color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
        }

        .submenu-dot {
          color: var(--accent-primary);
          font-size: 1.2rem;
          line-height: 0;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .social-icon:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.08);
          box-shadow: 0 4px 12px rgba(0, 255, 204, 0.15);
        }

        .social-icon svg {
          width: 18px;
          height: 18px;
        }

        .copyright {
          text-align: center;
          font-size: 0.7rem;
          color: var(--text-muted);
          opacity: 0.6;
        }

        @media (max-width: 1024px) {
          .sidebar {
            position: fixed;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
