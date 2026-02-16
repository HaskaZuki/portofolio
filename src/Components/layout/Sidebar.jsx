import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "../Icons";
import { t } from "../../i18n/translations";



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

  const isActive = (path) => location.pathname === path;
  const isDocsActive = location.pathname.startsWith("/docs");

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { path: "/", icon: Icons.Home, label: t(language, "home") },
    { path: "/about", icon: Icons.User, label: t(language, "about") },
    { path: "/projects",      icon: Icons.GitHub, label: t(language, "projects") },
    { path: "/blog", icon: Icons.FileText, label: "Blog" },
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

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <motion.li 
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={item.path} 
                  className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  <motion.div className="nav-icon-wrapper">
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
                <span className="nav-label">{t(language, "docs")}</span>
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

        <div className="sidebar-footer">
          <div className="social-links">
            <motion.a 
              href="https://github.com/HaskaZuki" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub"
            >
              <Icons.GitHub />
            </motion.a>
            <motion.a 
              href="https://discord.com/users/710245394533318676" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Discord"
            >
              <Icons.Discord />
            </motion.a>
            <motion.a 
              href="mailto:haskabussiness@gmail.com" 
              className="social-icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Email"
            >
              <Icons.Mail />
            </motion.a>
          </div>
          <p className="copyright">© 2025 Haska</p>
        </div>
      </aside>

      <style>{`
        .sidebar {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 260px;
          height: calc(100vh - var(--header-height));
          background: var(--bg-sidebar);
          border-right: 1px solid var(--glass-border);
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .sidebar-nav {
          flex-grow: 1;
        }

        .nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 0.75rem 1rem;
          color: var(--text-muted);
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s ease;
          position: relative;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
        }

        .nav-item:hover {
          color: var(--text-main);
          background: var(--bg-subtle);
        }

        .nav-item.active {
          color: var(--accent-primary);
          background: var(--bg-subtle);
        }

        .nav-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
        }

        .nav-icon-wrapper svg {
          width: 18px;
          height: 18px;
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
          margin-top: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .submenu-header {
          display: block;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          color: var(--text-header);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s;
          position: relative;
        }
        
        .submenu-header::before {
             content: '';
             position: absolute;
             left: 1.25rem;
             top: 50%;
             transform: translateY(-50%);
             width: 4px;
             height: 4px;
             border-radius: 50%;
             background: var(--text-muted);
        }

        .submenu-header:hover {
          background: var(--bg-subtle);
          color: var(--accent-primary);
        }

        .submenu-item {
          display: flex;
          align-items: center;
          padding: 0.5rem 0.75rem 0.5rem 2.5rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s;
          position: relative;
          border-left: 2px solid transparent;
          margin-left: 0.5rem;
        }
        
        .submenu-item::before {
             content: '';
             position: absolute;
             left: 0;
             top: 0;
             bottom: 0;
             width: 1px;
             background: var(--glass-border);
        }

        .submenu-item:hover {
          color: var(--text-main);
          background: var(--bg-subtle);
        }

        .submenu-item.active {
          color: var(--accent-primary);
          background: var(--bg-subtle);
          font-weight: 500;
          border-left-color: var(--accent-primary);
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          background: var(--bg-subtle);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .social-icon:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: var(--bg-core);
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

        .hamburger-btn {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1001;
          width: 40px;
          height: 40px;
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: var(--text-main);
          cursor: pointer;
          align-items: center;
          justify-content: center;
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (max-width: 1024px) {
          .hamburger-btn {
            display: flex;
          }

          .sidebar {
            position: fixed;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .sidebar.mobile-open {
            transform: translateX(0);
          }

          .mobile-overlay {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
