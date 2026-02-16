import React from "react";
import SkillsSection from "../components/SkillsSection";
import GitHubStats from "../components/features/github/GitHubStats";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/AnimatedSection";

const About = ({ language = 'en' }) => {
  const stacks = [
    { category: "Language Core", items: ["Python", "JavaScript", "Luau", "SQL"] },
    { category: "Backend Systems", items: ["Node.js", "Discord.js", "MongoDB", "Redis"] },
    { category: "DevOps & Tools", items: ["Git", "Docker", "AWS", "VS Code"] },
  ];

  return (
    <div className="page-wrapper">
      <SlideUp>
        <header className="page-header">
          <h1>About</h1>
          <p>The logic behind the systems.</p>
        </header>
      </SlideUp>

      <SlideUp delay={0.1}>
        <div className="about-grid">
          <div className="bio-section-wrapper">
            <div className="about-card glass-card bio-section">
              <h3>The Developer Behind The Code</h3>
              <p>
                I am a <strong>self-taught developer</strong> with a passion for building scalable, 
                production-ready applications. My journey started with a curiosity about how things work, 
                which led me from mechanical engineering concepts to software architecture.
              </p>
              <p style={{ marginTop: '1rem' }}>
                I specialize in <strong>Discord bot development</strong> using Discord.js, creating 
                systems that serve thousands of users daily. My approach combines clean code principles, 
                efficient database design, and user-centric interfaces.
              </p>
              <p style={{ marginTop: '1rem' }}>
                When I am not coding, you will find me exploring new technologies, contributing to open source, 
                or optimizing my development workflow. I believe in <strong>continuous learning</strong> and 
                the power of community-driven development.
              </p>
              <div className="quick-facts">
                <div className="fact">
                  <span className="fact-number">3+</span>
                  <span className="fact-label">Years Coding</span>
                </div>
                <div className="fact">
                  <span className="fact-number">25+</span>
                  <span className="fact-label">Projects Built</span>
                </div>
                <div className="fact">
                  <span className="fact-number">1M+</span>
                  <span className="fact-label">Bot Users</span>
                </div>
              </div>
            </div>
          </div>

          <StaggerContainer className="stacks-grid" staggerDelay={0.1}>
            {stacks.map((stack, index) => (
              <StaggerItem key={index}>
                <div className="about-card glass-card">
                  <h3>{stack.category}</h3>
                  <div className="tags-container">
                    {stack.items.map((item, idx) => (
                      <span key={idx} className="tech-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </SlideUp>

      <SlideUp delay={0.2}>
        <div className="section-header">
          <h2>Skills & Expertise</h2>
          <p>Technologies I work with daily</p>
        </div>
      </SlideUp>
      <SkillsSection language={language} />


      <SlideUp delay={0.1}>
        <div className="section-header">
          <h2>GitHub Activity</h2>
          <p>Open source contributions and stats</p>
        </div>
      </SlideUp>
      <GitHubStats />

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .bio-section {
          grid-column: 1 / -1;
          text-align: left;
        }
        .about-card {
           display: flex; flex-direction: column;
        }
        .about-card h3 {
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
        }
        .about-card p {
          color: var(--text-muted);
          line-height: 1.8;
        }
        .quick-facts {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }
        .fact {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .fact-number {
          font-family: var(--font-mono);
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--accent-primary);
        }
        .fact-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .tags-container {
          display: flex; flex-wrap: wrap; gap: 0.8rem;
        }
        .tech-tag {
          background: var(--bg-subtle);
          border: 1px solid var(--glass-border);
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
          color: var(--text-main);
          transition: all 0.2s;
          border-radius: 4px;
        }
        .tech-tag:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }

        .section-header {
          margin-top: 4rem;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.75rem;
          color: var(--text-header);
          margin-bottom: 0.5rem;
        }

        .section-header p {
          color: var(--text-muted);
          font-size: 1rem;
        }

        .stacks-grid {
          display: contents;
        }

        .bio-section-wrapper {
          grid-column: 1 / -1;
        }

        @media (max-width: 768px) {
          .quick-facts {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
