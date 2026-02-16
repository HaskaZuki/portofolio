import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import CommandPalette from "./components/features/command/CommandPalette";
import CustomCursor from "./components/common/CustomCursor";
import * as Icons from "./components/Icons";
import ParticleBackground from "./components/ParticleBackground";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/layout/ScrollProgress";
import ScrollToTop from "./components/layout/ScrollToTop";
import Breadcrumb from "./components/layout/Breadcrumb";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Docs from "./pages/Docs";
import DocsInvite from "./pages/DocsInvite";
import DocsTemplate from "./pages/DocsTemplate";
import DocsMulti from "./pages/DocsMulti";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Welcome from "./pages/Welcome";
import "./styles.css";

const App = () => {
  const checkShouldShowWelcome = () => {
    const lastVisit = localStorage.getItem('lastVisitTime');
    if (!lastVisit) return true; 
    
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    const timeDiff = now - parseInt(lastVisit);
    
    return timeDiff > tenMinutes; 
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
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
  
  const isDocsPage = location.pathname.startsWith('/docs');
  
  return (
    <div className={`dashboard-layout fade-in theme-${theme}`}>
      <ParticleBackground theme={theme} />
      <ScrollProgress />
      <ScrollToTop />
      <CommandPalette />
      <CustomCursor />
      
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        language={language}
        setLanguage={setLanguage}
        languages={languages}
        currentLang={currentLang}
      />
      
      <div className="layout-container">
        <Sidebar language={language} />
        <main className="main-content">
          <div className="content-scrollable">
            <Breadcrumb />
            <PageTransition>
              <Routes location={location}>
                <Route path="/" element={<Home language={language} />} />
                <Route path="/about" element={<About language={language} />} />
                <Route path="/projects" element={<Projects language={language} />} />
                <Route path="/resources" element={<Resources language={language} />} />
                <Route path="/contact" element={<Contact language={language} />} />
                
                <Route path="/docs" element={<Docs />} />
                <Route path="/docs/invite" element={<DocsInvite />} />
                <Route path="/docs/template" element={<DocsTemplate />} />
                <Route path="/docs/multipurpose" element={<DocsMulti />} />
                
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />

              </Routes>
            </PageTransition>
            
            <div style={{ height: '20px' }}></div>
            <Footer theme={theme} toggleTheme={toggleTheme} language={language} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
