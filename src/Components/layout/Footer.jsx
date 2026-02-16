import React from "react";
import * as Icons from "../Icons";
import { t } from "../../i18n/translations";
import Logo from "../Logo";

const Footer = ({ theme, toggleTheme, language = "en" }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t(language, "home"), href: "/" },
    { label: t(language, "about"), href: "/about" },
    { label: t(language, "projects"), href: "/projects" },
    { label: t(language, "contact"), href: "/contact" },
  ];

  const docLinks = [
    { label: "Invite Manager", href: "/docs/invite" },
    { label: "Template Bot", href: "/docs/template" },
    { label: "Multipurpose Bot", href: "/docs/multipurpose" },
  ];

  const socialLinks = [
    { Icon: Icons.GitHub, href: "https://github.com/HaskaZuki", label: "GitHub" },
    { Icon: Icons.Discord, href: "https://discord.com/users/710245394533318676", label: "Discord" },
    { Icon: Icons.Mail, href: "mailto:haskabussiness@gmail.com", label: "Email" },
  ];

  const getThemeBtnClass = (isActive) => {
    return "theme-btn" + (isActive ? " active" : "");
  };

  return (
    <footer className="global-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <Logo className="footer-logo-img" style={{ height: '28px', width: 'auto' }} />
            <span>Haska</span>
          </div>
          <p className="footer-tagline">Full Stack Developer & Discord Bot Engineer</p>
          <div className="footer-social">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label={social.label}
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-links-section">
            <h4>Navigation</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-section">
            <h4>Documentation</h4>
            <ul>
              {docLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-section">
            <h4>Theme</h4>
            <div className="theme-toggle">
              <button
                className={getThemeBtnClass(theme === "light")}
                onClick={() => toggleTheme("light")}
              >
                <Icons.Sun /> Light
              </button>
              <button
                className={getThemeBtnClass(theme === "dark")}
                onClick={() => toggleTheme("dark")}
              >
                <Icons.Moon /> Dark
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Haska. {t(language, "copyrightText")}</span>
        <div className="footer-legal">
          <a href="#">{t(language, "privacyPolicy")}</a>
          <span className="divider">·</span>
          <a href="#">{t(language, "terms")}</a>
        </div>
      </div>

      <style>{`
        .global-footer {
          margin-top: 4rem;
          padding: 3rem 2rem 2rem;
          border-top: 1px solid var(--glass-border);
          background: var(--bg-subtle);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-header);
          margin-bottom: 0.75rem;
        }

        .footer-logo svg {
          width: 28px;
          height: 28px;
          color: var(--accent-primary);
        }

        .footer-tagline {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .footer-social {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-core);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .social-link:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--bg-subtle);
        }

        .social-link svg {
          width: 18px;
          height: 18px;
        }

        .footer-links {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .footer-links-section h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-header);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-links-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links-section li {
          margin-bottom: 0.5rem;
        }

        .footer-links-section a {
          font-size: 0.875rem;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-links-section a:hover {
          color: var(--accent-primary);
        }

        .theme-toggle {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .theme-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          background: var(--bg-core);
          border: 1px solid var(--glass-border);
          border-radius: 6px;
          color: var(--text-muted);
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          text-align: left;
        }

        .theme-btn:hover {
          border-color: var(--accent-primary);
          color: var(--text-main);
        }

        .theme-btn.active {
          background: var(--accent-primary);
          border-color: var(--accent-primary);
          color: white;
        }

        .theme-btn svg {
          width: 16px;
          height: 16px;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 2rem auto 0;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-legal a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-legal a:hover {
          color: var(--accent-primary);
        }

        .divider {
          color: var(--glass-border);
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 2rem;
          }

          .footer-links {
            width: 100%;
            justify-content: space-between;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
