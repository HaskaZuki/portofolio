 import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Cache configuration
const CACHE_KEY = 'github_stats_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const GitHubStats = ({ username = 'HaskaZuki' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // Language color mapping
  const languageColors = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python: '#3776AB',
    HTML: '#E34F26',
    CSS: '#1572B6',
    'C#': '#239120',
    'C++': '#00599C',
    C: '#A8B9CC',
    Java: '#007396',
    Go: '#00ADD8',
    Rust: '#DEA584',
    Ruby: '#CC342D',
    PHP: '#777BB4',
    Swift: '#FA7343',
    Kotlin: '#0095D5',
    Luau: '#00A2FF',
    Lua: '#000080',
    Shell: '#89E051',
    Dockerfile: '#384D54',
    Vue: '#4FC08D',
    React: '#61DAFB',
    'Jupyter Notebook': '#DA5B0B',
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

  const fetchGitHubStats = async () => {
    setLoading(true);
    setError(null);

    // Check cache first
    const cached = getCache();
    if (cached) {
      setStats(cached);
      setLoading(false);
      return;
    }

    try {
      // Fetch user data
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      const userData = await userResponse.json();

      // Fetch repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
      );
      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`);
      }
      const reposData = await reposResponse.json();

      // Calculate statistics
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);

      // Calculate language statistics
      const languageStats = {};
      reposData.forEach((repo) => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      });

      // Convert to percentage
      const totalLangRepos = Object.values(languageStats).reduce((a, b) => a + b, 0);
      const topLanguages = Object.entries(languageStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          percentage: Math.round((count / totalLangRepos) * 100),
          color: languageColors[name] || '#999999',
        }));

      // Fetch recent events (limited public events)
      const eventsResponse = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=10`
      );
      let recentActivity = [];
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        recentActivity = eventsData.slice(0, 4).map((event) => {
          const repoName = event.repo.name.split('/')[1] || event.repo.name;
          const timeAgo = getTimeAgo(new Date(event.created_at));
          
          switch (event.type) {
            case 'PushEvent':
              return {
                type: 'push',
                repo: repoName,
                message: event.payload.commits?.[0]?.message || 'Pushed commits',
                time: timeAgo,
              };
            case 'PullRequestEvent':
              return {
                type: 'pr',
                repo: repoName,
                message: `${event.payload.action} PR #${event.payload.number}`,
                time: timeAgo,
              };
            case 'WatchEvent':
              return {
                type: 'star',
                repo: repoName,
                time: timeAgo,
              };
            case 'CreateEvent':
              return {
                type: 'commit',
                repo: repoName,
                message: `Created ${event.payload.ref_type}`,
                time: timeAgo,
              };
            default:
              return {
                type: 'commit',
                repo: repoName,
                message: event.type.replace('Event', ''),
                time: timeAgo,
              };
          }
        });
      }

      // If no activity, add placeholder
      if (recentActivity.length === 0) {
        recentActivity = [
          { type: 'commit', repo: 'Loading...', message: 'Recent activity unavailable', time: 'now' },
        ];
      }

      const statsData = {
        repos: userData.public_repos,
        stars: totalStars,
        forks: totalForks,
        contributions: userData.public_repos * 12 + totalStars, // Estimated contributions
        followers: userData.followers,
        following: userData.following,
        topLanguages,
        recentActivity,
        avatar: userData.avatar_url,
        bio: userData.bio,
        location: userData.location,
        company: userData.company,
      };

      setStats(statsData);
      setCache(statsData);
    } catch (err) {
      console.error('Error fetching GitHub stats:', err);
      setError(err.message);
      
      // Fallback to mock data on error
      setStats({
        repos: 0,
        stars: 0,
        forks: 0,
        contributions: 0,
        followers: 0,
        following: 0,
        topLanguages: [],
        recentActivity: [
          { type: 'commit', repo: 'Error', message: 'Failed to load data', time: 'now' },
        ],
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'just now';
  };

  useEffect(() => {
    if (inView) {
      fetchGitHubStats();
    }
  }, [inView, username]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div ref={ref} className="github-stats-skeleton">
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.section
      ref={ref}
      className="github-stats-section"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {error && (
        <div className="error-banner">
          <span>⚠️ Using cached data. {error}</span>
          <button onClick={fetchGitHubStats} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="stats-grid">
        <motion.div className="stat-card glass-card" variants={itemVariants}>
          <div className="stat-icon">📦</div>
          <div className="stat-value">{stats.repos}</div>
          <div className="stat-label">Repositories</div>
        </motion.div>

        <motion.div className="stat-card glass-card" variants={itemVariants}>
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{stats.stars}</div>
          <div className="stat-label">Total Stars</div>
        </motion.div>

        <motion.div className="stat-card glass-card" variants={itemVariants}>
          <div className="stat-icon">🍴</div>
          <div className="stat-value">{stats.forks}</div>
          <div className="stat-label">Forks</div>
        </motion.div>

        <motion.div className="stat-card glass-card highlight" variants={itemVariants}>
          <div className="stat-icon">📊</div>
          <div className="stat-value">{stats.contributions}</div>
          <div className="stat-label">Contributions</div>
        </motion.div>
      </div>

      {/* Languages & Activity */}
      <div className="stats-details">
        <motion.div className="languages-card glass-card" variants={itemVariants}>
          <h3>Top Languages</h3>
          <div className="language-bars">
            {stats.topLanguages.length > 0 ? (
              stats.topLanguages.map((lang) => (
                <div key={lang.name} className="language-item">
                  <div className="language-header">
                    <span
                      className="language-dot"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="language-name">{lang.name}</span>
                    <span className="language-percent">{lang.percentage}%</span>
                  </div>
                  <div className="language-bar">
                    <motion.div
                      className="language-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No language data available</p>
            )}
          </div>
        </motion.div>

        <motion.div className="activity-card glass-card" variants={itemVariants}>
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {stats.recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <span className={`activity-icon ${activity.type}`}>
                  {activity.type === 'push' && '🚀'}
                  {activity.type === 'pr' && '🔀'}
                  {activity.type === 'star' && '⭐'}
                  {activity.type === 'commit' && '💾'}
                </span>
                <div className="activity-content">
                  <span className="activity-repo">{activity.repo}</span>
                  {activity.message && (
                    <span className="activity-message">{activity.message}</span>
                  )}
                  <span className="activity-time">{activity.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="view-profile-btn"
          >
            View Full Profile →
          </a>
        </motion.div>
      </div>

      <style>{`
        .github-stats-section {
          margin: 4rem 0;
        }

        .github-stats-skeleton {
          margin: 4rem 0;
        }

        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .skeleton-card {
          height: 120px;
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

        .error-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 100, 100, 0.1);
          border: 1px solid rgba(255, 100, 100, 0.3);
          border-radius: 8px;
          margin-bottom: 1.5rem;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-primary);
        }

        .stat-card.highlight {
          border-color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
        }

        .stat-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--accent-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stats-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .languages-card,
        .activity-card {
          padding: 1.5rem;
        }

        .languages-card h3,
        .activity-card h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--accent-primary);
        }

        .language-bars {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .language-item {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .language-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .language-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .language-name {
          flex: 1;
          color: var(--text-main);
        }

        .language-percent {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .language-bar {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .language-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 1s ease;
        }

        .no-data {
          color: var(--text-muted);
          font-style: italic;
          text-align: center;
          padding: 2rem 0;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 6px;
          transition: background 0.2s;
        }

        .activity-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .activity-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .activity-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .activity-repo {
          font-weight: 600;
          color: var(--accent-primary);
          font-size: 0.9rem;
        }

        .activity-message {
          color: var(--text-main);
          font-size: 0.85rem;
        }

        .activity-time {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .view-profile-btn {
          display: block;
          text-align: center;
          margin-top: 1.5rem;
          padding: 0.75rem;
          background: var(--bg-subtle);
          border: 1px solid var(--glass-border);
          color: var(--accent-primary);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.2s;
        }

        .view-profile-btn:hover {
          border-color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-value {
            font-size: 2rem;
          }

          .stats-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default GitHubStats;
