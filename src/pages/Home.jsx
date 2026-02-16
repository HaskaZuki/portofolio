import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { t } from "../i18n/translations";
import BlogSection from "../components/features/blog/BlogSection";

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
            Welcome, I am <span className="highlight-text">Haska</span>
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
            <Link to="/about" className="btn btn-primary">
              {t(language, "viewProjects")}
            </Link>
            <Link to="/docs" className="btn btn-secondary">
              {t(language, "viewDocs")}
            </Link>
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
      </section>

      <section className="home-blog-section">
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
          padding-bottom: 12vh; /* Lift content visually */
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
          color: var(--text-header);
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

        .intro-text {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .highlight-text {
          color: var(--accent-primary);
          font-weight: 600;
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

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: var(--accent-primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--accent-secondary);
        }

        .btn-secondary {
          background: var(--bg-subtle);
          color: var(--text-main);
          border: 1px solid var(--glass-border);
        }

        .btn-secondary:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
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

        .home-blog-section {
          margin-top: 0;
          padding: 0 2rem;
        }



        @media (max-width: 768px) {
          .main-headline {
            font-size: 2.2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .cta-group {
            flex-direction: column;
            align-items: center;
          }

          .hero-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .stat-divider {
            width: 40px;
            height: 1px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
