import React from "react";
import * as Icons from "../components/Icons";

const Projects = () => {
  const repositories = [
    {
      name: "InviteManagerV1",
      desc: "A dedicated Discord bot to track user invitations, join leaves, and manage server growth analytics.",
      lang: "JavaScript",
      url: "https://github.com/HaskaZuki/InviteManagerV1"
    },
    {
      name: "TemplateBot",
      desc: "A robust boilerplate for starting new Discord.js projects. Includes command handler, event handler, and basic env configuration.",
      lang: "JavaScript",
      url: "https://github.com/HaskaZuki/TemplateBot"
    },
    {
      name: "MultipurposeBot",
      desc: "An all-in-one solution featuring moderation, music, economy system, and fun commands for community servers.",
      lang: "JavaScript",
      url: "https://github.com/HaskaZuki/MultipurposeBot"
    }
  ];

  return (
    <div className="page-wrapper fade-in">
      <header className="page-header">
        <h1>System Repositories</h1>
        <p>Open source architecture and bot systems.</p>
      </header>

      <div className="projects-grid">
        {repositories.map((repo, index) => (
          <a key={index} href={repo.url} target="_blank" rel="noopener noreferrer" className="project-card glass-card">
            <div className="card-header">
              <h3><Icons.Repo /> {repo.name}</h3>
            </div>
            <p className="card-desc">{repo.desc}</p>
            <div className="card-footer">
              <span className="lang-badge">{repo.lang}</span>
              <span className="status-badge">PUBLIC</span>
            </div>
          </a>
        ))}
      </div>
      
      <div className="more-projects">
        <a href="https://github.com/HaskaZuki?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn-secondary">
          ACCESS ALL REPOSITORIES →
        </a>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .project-card {
          text-decoration: none;
          display: flex; flex-direction: column;
          height: 100%;
          border-left: 1px solid var(--glass-border); /* Explicit border logic if needed */
        }
        .project-card:hover h3 { color: var(--accent-primary); }
        
        .card-header h3 {
          display: flex; align-items: center; gap: 0.8rem;
          font-size: 1.4rem; color: var(--text-header);
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          letter-spacing: -0.5px;
        }
        .card-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          flex-grow: 1;
        }
        .card-footer {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: auto;
          border-top: 1px solid var(--glass-border);
          padding-top: 1rem;
        }
        .lang-badge {
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          font-size: 0.8rem; font-weight: 700;
        }
        .status-badge {
          font-size: 0.7rem; color: var(--text-muted); border: 1px solid var(--glass-border);
          padding: 2px 6px; 
        }
        .more-projects { margin-top: 4rem; text-align: center; }
        .btn-secondary {
          color: var(--text-muted); text-decoration: none; font-family: var(--font-mono);
          border-bottom: 1px solid transparent; transition: all 0.2s;
        }
        .btn-secondary:hover {
          color: var(--accent-primary); border-bottom-color: var(--accent-primary);
        }
      `}</style>
    </div>
  );
};

export default Projects;