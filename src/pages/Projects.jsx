import React, { useState, useEffect } from "react";
import * as Icons from "../components/Icons";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import TiltCard from "../components/TiltCard";
import Testimonials from "../components/Testimonials";

// Cache configuration
const CACHE_KEY = 'github_projects_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'HaskaZuki';

  // Language to category mapping
  const getCategoryFromLanguage = (language, topics = []) => {
    const topicMap = {
      'discord-bot': 'discord',
      'discord': 'discord',
      'bot': 'discord',
      'roblox': 'game',
      'luau': 'game',
      'automation': 'automation',
      'scraper': 'automation',
    };

    for (const topic of topics) {
      if (topicMap[topic.toLowerCase()]) {
        return topicMap[topic.toLowerCase()];
      }
    }

    const langMap = {
      'HTML': 'web',
      'CSS': 'web',
      'JavaScript': 'web',
      'TypeScript': 'web',
      'Vue': 'web',
      'React': 'web',
      'Luau': 'game',
      'Python': 'automation',
    };

    return langMap[language] || 'backend';
  };

  const getCache = () => {
    try {
      const cached = localStorage.getItem(`${CACHE_KEY}_${username}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
    return null;
  };

  const setCache = (data) => {
    try {
      localStorage.setItem(
        `${CACHE_KEY}_${username}`,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.warn('Cache write error:', e);
    }
  };

  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    // Check cache first
    const cached = getCache();
    if (cached) {
      setRepositories(cached);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`
      );
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();

      // Filter out forks and transform data
      const transformedRepos = data
        .filter(repo => !repo.fork)
        .map(repo => ({
          name: repo.name,
          desc: repo.description || 'No description available',
          lang: repo.language || 'Unknown',
          url: repo.html_url,
          category: getCategoryFromLanguage(repo.language, repo.topics || []),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          featured: repo.stargazers_count >= 10 || repo.forks_count >= 5,
          tags: repo.topics?.slice(0, 3) || [repo.language].filter(Boolean),
          updatedAt: repo.updated_at,
          createdAt: repo.created_at,
        }));

      setRepositories(transformedRepos);
      setCache(transformedRepos);
    } catch (err) {
      console.error('Error fetching repositories:', err);
      setError(err.message);
      
      // Fallback to empty state
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'discord', label: 'Discord Bots' },
    { id: 'web', label: 'Web Apps' },
    { id: 'backend', label: 'Backend' },
    { id: 'game', label: 'Game Dev' },
    { id: 'automation', label: 'Automation' },
  ];

  const filteredRepos = filter === 'all' 
    ? repositories 
    : repositories.filter(repo => repo.category === filter);

  const featuredRepos = repositories.filter(repo => repo.featured).slice(0, 3);

  if (loading) {
    return (
      <div className="page-wrapper">
        <SlideUp>
          <header className="page-header">
            <h1>System Repositories</h1>
            <p>Loading open source architecture...</p>
          </header>
        </SlideUp>
        <div className="projects-skeleton">
          <div className="skeleton-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        </div>
        <style>{`
          .projects-skeleton {
            margin: 2rem 0;
          }
          .skeleton-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          .skeleton-card {
            height: 200px;
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 25%,
              rgba(255, 255, 255, 0.06) 50%,
              rgba(255, 255, 255, 0.03) 75%
            );
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 8px;
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <SlideUp>
        <header className="page-header">
          <h1>System Repositories</h1>
          <p>Open source architecture and bot systems.</p>
          {error && (
            <div className="error-banner">
              <span>⚠️ Failed to load from GitHub API. Showing cached data.</span>
              <button onClick={fetchRepositories} className="retry-btn">
                Retry
              </button>
            </div>
          )}
        </header>
      </SlideUp>

      {/* Featured Projects */}
      {featuredRepos.length > 0 && (
        <SlideUp delay={0.1}>
          <div className="featured-section">
            <h3 className="section-subtitle">Featured Projects</h3>
            <div className="featured-projects-grid">
              {featuredRepos.map((repo) => (
                <TiltCard key={repo.name} tiltAmount={8}>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="featured-project-card glass-card">
                    <div className="featured-badge">⭐ Featured</div>
                    <div className="card-header">
                      <h3><Icons.Repo /> {repo.name}</h3>
                    </div>
                    <p className="card-desc">{repo.desc}</p>
                    <div className="project-tags">
                      {repo.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <div className="repo-stats">
                        <span className="stat">⭐ {repo.stars}</span>
                        <span className="stat">🍴 {repo.forks}</span>
                      </div>
                      <span className="lang-badge">{repo.lang}</span>
                    </div>
                  </a>
                </TiltCard>
              ))}
            </div>
          </div>
        </SlideUp>
      )}

      {/* Filter Tabs */}
      <SlideUp delay={0.15}>
        <div className="filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-tab ${filter === cat.id ? 'active' : ''}`}
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </SlideUp>

      {/* Projects Grid */}
      {filteredRepos.length > 0 ? (
        <StaggerContainer className="projects-grid" staggerDelay={0.08}>
          {filteredRepos.map((repo) => (
            <StaggerItem key={repo.name}>
              <TiltCard tiltAmount={5}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="project-card glass-card">
                  <div className="card-header">
                    <h3><Icons.Repo /> {repo.name}</h3>
                  </div>
                  <p className="card-desc">{repo.desc}</p>
                  <div className="project-tags">
                    {repo.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <div className="repo-stats">
                      <span className="stat">⭐ {repo.stars}</span>
                      <span className="stat">🍴 {repo.forks}</span>
                    </div>
                    <span className="lang-badge">{repo.lang}</span>
                  </div>
                </a>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <div className="no-projects">
          <p>No projects found in this category.</p>
        </div>
      )}
      
      <SlideUp delay={0.2}>
        <div className="more-projects">
          <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            ACCESS ALL REPOSITORIES →
          </a>
        </div>
      </SlideUp>

      {/* Testimonials Section */}
      <SlideUp delay={0.1}>
        <Testimonials />
      </SlideUp>

      <style>{`
        .error-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 100, 100, 0.1);
          border: 1px solid rgba(255, 100, 100, 0.3);
          border-radius: 8px;
          margin-top: 1rem;
          color: #ff6464;
          font-size: 0.9rem;
        }

        .retry-btn {
          background: transparent;
          border: 1px solid #ff6464;
          color: #ff6464;
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s;
        }

        .retry-btn:hover {
          background: rgba(255, 100, 100, 0.1);
        }

        .no-projects {
          text-align: center;
          padding: 3rem;
          color: var(--text-muted);
        }

        .featured-section {
          margin-bottom: 3rem;
        }

        .section-subtitle {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .featured-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .featured-project-card {
          position: relative;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.5rem;
          border: 1px solid var(--accent-primary);
          background: rgba(0, 255, 204, 0.02);
        }

        .featured-badge {
          position: absolute;
          top: -1px;
          right: -1px;
          background: var(--accent-primary);
          color: #000;
          font-size: 0.7rem;
          padding: 0.3rem 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .filter-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 0.6rem 1.25rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
          font-family: var(--font-main);
        }

        .filter-tab:hover,
        .filter-tab.active {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 0;
        }

        .project-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .project-card:hover {
          border-color: var(--accent-primary);
        }

        .project-card:hover h3 {
          color: var(--accent-primary);
        }
        
        .card-header h3 {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.3rem;
          color: var(--text-header);
          margin-bottom: 1rem;
          font-family: var(--font-mono);
          letter-spacing: -0.5px;
        }

        .card-desc {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .project-tag {
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
          border-top: 1px solid var(--glass-border);
          padding-top: 1rem;
        }

        .repo-stats {
          display: flex;
          gap: 1rem;
        }

        .repo-stats .stat {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .lang-badge {
          color: var(--accent-secondary);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 700;
        }

        .more-projects {
          margin-top: 4rem;
          text-align: center;
        }

        .btn-secondary {
          display: inline-block;
          padding: 1rem 2rem;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.9rem;
          transition: all 0.3s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .btn-secondary:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .projects-grid,
          .featured-projects-grid {
            grid-template-columns: 1fr;
          }

          .filter-tabs {
            gap: 0.4rem;
          }

          .filter-tab {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }

          .error-banner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
