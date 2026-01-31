import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { t } from "../i18n/translations";
import BlogSection from "../components/BlogSection";
import { MagneticButton } from "../components/TiltCard";

const Home = ({ language = "en" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="page-wrapper">
      <section className="hero-section">
        <motion.div 
          className="content-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="intro-text" variants={itemVariants}>
            <span className="status-indicator">●</span>
            System Online. Welcome, I'm <span className="highlight-text">Haska</span>
          </motion.p>
          
          <motion.h1 className="main-headline" variants={itemVariants}>
            <span className="headline-line">Engineering Logic.</span>
            <span className="headline-line highlight">Creative Software.</span>
            <span className="headline-line">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Developer.
              </motion.span>
              <motion.span 
                className="cursor-blink"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </span>
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            {t(language, "subHeadline")}
          </motion.p>
          
          <motion.div className="cta-group" variants={itemVariants}>
            <MagneticButton className="btn btn-primary">
              <Link to="/about" className="btn-link">{t(language, "viewProjects")}</Link>
            </MagneticButton>
            <MagneticButton className="btn btn-secondary">
              <Link to="/docs" className="btn-link">{t(language, "viewDocs")}</Link>
            </MagneticButton>
          </motion.div>

          <motion.div className="hero-stats" variants={itemVariants}>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Years Exp</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Bot Users</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="hero-bg-effects">
          <motion.div 
            className="glow-orb orb-1"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="glow-orb orb-2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </section>

      {/* Blog Section */}
      <section className="home-blog-section">
        <div className="section-header">
          <h2>Latest Articles</h2>
          <p>Thoughts, tutorials, and insights</p>
        </div>
        <BlogSection />
      </section>

      <style>{`
        .hero-section {
          position: relative;
          min-height: calc(100vh - 100px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .content-container {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          padding: 2rem;
        }

        .status-indicator {
          color: var(--accent-primary);
          animation: pulse 2s infinite;
          margin-right: 0.5rem;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .main-headline {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .headline-line {
          display: block;
        }

        .headline-line.highlight {
          color: var(--accent-primary);
        }

        .cursor-blink {
          color: var(--accent-primary);
          font-weight: 100;
          margin-left: 2px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-muted);
          max-width: 600px;
          margin: 1.5rem auto;
          line-height: 1.6;
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 2.5rem;
        }

        .btn-link {
          color: inherit;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .stat-number {
          font-family: var(--font-mono);
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent-primary);
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-divider {
          width: 1px;
          height: 40px;
          background: var(--glass-border);
        }

        .hero-bg-effects {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: var(--accent-primary);
          top: 10%;
          right: 10%;
          opacity: 0.1;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: var(--accent-secondary);
          bottom: 20%;
          left: 10%;
          opacity: 0.08;
        }

        .home-blog-section {
          margin-top: 0;
          padding: 4rem 2rem;
        }

        .home-blog-section .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .home-blog-section .section-header h2 {
          font-size: 2rem;
          color: var(--text-header);
          margin-bottom: 0.5rem;
        }

        .home-blog-section .section-header p {
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .main-headline {
            font-size: 2.2rem !important;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1.5rem;
          }

          .stat-divider {
            width: 60px;
            height: 1px;
          }

          .cta-group {
            flex-direction: column;
            align-items: center;
          }

          .glow-orb {
            filter: blur(60px);
          }

          .orb-1 {
            width: 250px;
            height: 250px;
          }

          .orb-2 {
            width: 200px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
