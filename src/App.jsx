import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import * as Icons from "./components/Icons";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Docs from "./pages/Docs";
import DocsInvite from "./pages/DocsInvite";
import DocsTemplate from "./pages/DocsTemplate";
import DocsMulti from "./pages/DocsMulti";
import Welcome from "./pages/Welcome";
import "./styles.css";

const App = () => {
  const checkShouldShowWelcome = () => {
    const lastVisit = localStorage.getItem('lastVisitTime');
    if (!lastVisit) return true; // First visit
    
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds
    const timeDiff = now - parseInt(lastVisit);
    
    return timeDiff > tenMinutes; // Show if more than 10 minutes passed
  };

  const [showWelcome, setShowWelcome] = useState(checkShouldShowWelcome());
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleWelcomeComplete = () => {
    localStorage.setItem('lastVisitTime', Date.now().toString());
    setShowWelcome(false);
  };

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "id", name: "Indonesia", flag: "🇮🇩" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "cn", name: "中文", flag: "🇨🇳" },
    { code: "jp", name: "日本語", flag: "🇯🇵" },
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  if (showWelcome) {
    return <Welcome onEnter={handleWelcomeComplete} />;
  }

  return (
    <Router>
      <AppContent 
        theme={theme} 
        toggleTheme={toggleTheme}
        language={language}
        setLanguage={setLanguage}
        setShowLangMenu={setShowLangMenu}
        showLangMenu={showLangMenu}
        languages={languages}
        currentLang={currentLang}
      />
    </Router>
  );
};

const AppContent = ({ theme, toggleTheme, language, setLanguage, setShowLangMenu, showLangMenu, languages, currentLang }) => {
  const location = useLocation();
  
  return (
    <div className={`dashboard-layout fade-in theme-${theme}`}>
      <Sidebar language={language} />
      <main className="main-content">
        
        <div className="content-scrollable">
          <Routes>
            <Route path="/" element={<Home language={language} />} />
            <Route path="/about" element={<About language={language} />} />
            <Route path="/projects" element={<Projects language={language} />} />
            <Route path="/resources" element={<Resources language={language} />} />
            <Route path="/contact" element={<Contact language={language} />} />
            
            <Route path="/docs" element={<Docs />} />
            <Route path="/docs/invite" element={<DocsInvite />} />
            <Route path="/docs/template" element={<DocsTemplate />} />
            <Route path="/docs/multipurpose" element={<DocsMulti />} />
          </Routes>
          
          
          {location.pathname !== "/" && (
            <>
              <Footer theme={theme} toggleTheme={toggleTheme} language={language} />
              <div style={{ height: '20px' }}></div>
            </>
          )}
          
          
          <div 
            className="language-selector"
            style={{ position: 'absolute', top: '2rem', right: '3rem', zIndex: 1000 }}
          >
            <button 
              className="btn-secondary btn-sm lang-trigger"
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              <Icons.Globe />
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                {currentLang.flag} {currentLang.code.toUpperCase()}
              </span>
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
                      <span className="lang-flag">{lang.flag}</span>
                      <span className="lang-name">{lang.name}</span>
                      {language === lang.code && <span className="check-mark">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;