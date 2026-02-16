import React, { useState, useEffect } from "react";
import * as Icons from "../components/Icons";
import { SlideUp, StaggerContainer, StaggerItem } from "../components/AnimatedSection";
import Testimonials from "../components/Testimonials";

const CACHE_KEY = 'github_projects_cache';
const CACHE_DURATION = 5 * 60 * 1000;

const Projects = ({ language = 'en' }) => {
  const [filter, setFilter] = useState('all');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'HaskaZuki';

  const getCategoryFromLanguage = (language, topics = []) => {
    const topicMap = {
      'discord-bot': 'discord',
      'discord': 'discord',
      'bot': 'discord',
      'discord-js': 'discord',
      'discordjs': 'discord',
      'roblox': 'game',
      'luau': 'game',
      'game': 'game',
      'unity': 'game',
      'unreal': 'game',
      'godot': 'game',
      'gamedev': 'game',
      'automation': 'automation',
      'scraper': 'automation',
      'api': 'backend',
      'backend': 'backend',
      'rest-api': 'backend',
      'graphql': 'backend',
      'express': 'backend',
      'nodejs': 'backend',
      'fastapi': 'backend',
      'django': 'backend',
      'flask': 'backend',
      'next': 'web',
      'nextjs': 'web',
      'react': 'web',
      'vue': 'web',
      'website': 'web',
      'frontend': 'web',
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
      'C#': 'game',
      'Python': 'backend',
      'Go': 'backend',
      'Rust': 'backend',
      'Java': 'backend',
      'PHP': 'backend',
      'Ruby': 'backend',
      'C++': 'backend',
      'C': 'backend',
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
            <h1>Projects</h1>
            <p>Loading repositories...</p>
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
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 1.5rem;
          }
          .skeleton-card {
            height: 200px;
            background: var(--bg-subtle);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            animation: pulse 1.5s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <SlideUp>
        <header className="page-header">
          <h1>Projects</h1>
          <p>Open source repositories and applications.</p>
          {error && (
            <div className="error-banner">
              <span>Failed to load from GitHub API. Showing cached data.</span>
              <button onClick={fetchRepositories} className="retry-btn">
                Retry
              </button>
            </div>
          )}
        </header>
      </SlideUp>

      {featuredRepos.length > 0 && (
        <SlideUp delay={0.1}>
          <div className="featured-section">
            <h3 className="section-subtitle">Featured</h3>
            <div className="featured-projects-grid">
              {featuredRepos.map((repo) => (
                <a 
                  key={repo.name} 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="featured-project-card glass-card"
                >
                  <div className="featured-badge">Featured</div>
                  <div className="card-header">
                    <h3 title={repo.name}><Icons.GitHub /> {repo.name}</h3>
                  </div>
                  <p className="card-desc" title={repo.desc}>
                    {repo.desc.length > 120 ? repo.desc.substring(0, 120) + '...' : repo.desc}
                  </p>
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
              ))}
            </div>
          </div>
        </SlideUp>
      )}

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

      {filteredRepos.length > 0 ? (
        <StaggerContainer className="projects-grid" staggerDelay={0.08}>
          {filteredRepos.map((repo) => (
            <StaggerItem key={repo.name}>
              <a 
                href={repo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-card glass-card"
              >
                <div className="card-header">
                  <h3 title={repo.name}><Icons.GitHub /> {repo.name}</h3>
                </div>
                <p className="card-desc" title={repo.desc}>
                  {repo.desc.length > 120 ? repo.desc.substring(0, 120) + '...' : repo.desc}
                </p>
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
          <a 
            href={`https://github.com/${username}?tab=repositories`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
          >
            View All Repositories →
          </a>
        </div>
      </SlideUp>

      <SlideUp delay={0.1}>
        <Testimonials language={language} />
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
          border-radius: 4px;
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
          font-size: 1rem;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .featured-projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .featured-project-card {
          position: relative;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 260px;
          padding: 1.5rem;
          border: 1px solid var(--accent-primary);
          background: var(--bg-card);
          overflow: hidden;
        }

        .featured-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: var(--accent-primary);
          color: white;
          font-size: 0.7rem;
          padding: 0.3rem 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          border-bottom-left-radius: 8px;
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
          border-radius: 6px;
        }

        .filter-tab:hover,
        .filter-tab.active {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: var(--bg-subtle);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-top: 0;
          align-items: stretch;
        }

        .project-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 240px;
          padding: 1.25rem;
          transition: all 0.3s;
          overflow: hidden;
          background: var(--bg-card);
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
          font-size: 1.1rem;
          color: var(--text-header);
          margin-bottom: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .card-desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
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
          background: var(--bg-subtle);
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
          border-radius: 4px;
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
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .more-projects {
          margin-top: 3rem;
          text-align: center;
        }

        .btn-secondary {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s;
          border-radius: 6px;
          background: var(--bg-subtle);
        }

        .btn-secondary:hover {
          color: var(--accent-primary);
          border-color: var(--accent-primary);
          background: var(--bg-core);
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
