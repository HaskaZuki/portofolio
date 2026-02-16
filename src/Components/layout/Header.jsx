import React, { useState } from "react";
import * as Icons from "../Icons";
import { Link } from "react-router-dom";
import Logo from "../Logo";

const Header = ({ language, setLanguage, languages, currentLang }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `https://github.com/HaskaZuki?tab=repositories&q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="header-logo-link">
           <Logo className="header-logo-img" />
           <span className="header-logo-text">Haska</span>
        </Link>
        
        <div className="header-divider"></div>

        <form className="header-search" onSubmit={handleSearch}>
          <Icons.Search className="header-search-icon" />
          <input
            type="search"
            className="header-search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search"
          />
        </form>
      </div>

      <div className="header-right">
        {languages && currentLang && (
          <div className="language-selector" style={{ position: 'relative' }}>
            <button 
              className="btn-icon"
              onClick={() => setShowLangMenu(!showLangMenu)}
              aria-label="Change Language"
            >
              <Icons.Globe />
            </button>
            
            {showLangMenu && (
              <>
                <div 
                  className="lang-dropdown-overlay"
                  onClick={() => setShowLangMenu(false)}
                />
                <div className="lang-dropdown">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-option ${language === lang.code ? 'active' : ''}`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                    >
                      <span style={{ fontSize: '1.2em' }}>{lang.flag}</span>
                      <span>{lang.name}</span>
                      {language === lang.code && <span style={{ marginLeft: 'auto' }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
