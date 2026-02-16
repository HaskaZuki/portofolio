import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, GitBranch, Star, Users } from 'lucide-react';

const GitHubStats = ({ username = 'HaskaZuki' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const cached = localStorage.getItem('githubStats');
        const cachedTime = localStorage.getItem('githubStatsTime');
        
        if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 3600000) {
          setStats(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const repos = await reposResponse.json();
        
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

        const statsData = {
          followers: data.followers,
          following: data.following,
          publicRepos: data.public_repos,
          totalStars,
          totalForks,
        };

        localStorage.setItem('githubStats', JSON.stringify(statsData));
        localStorage.setItem('githubStatsTime', Date.now().toString());
        
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  const statItems = [
    { icon: <GitCommit size={20} />, label: 'Repositories', value: stats?.publicRepos || 0 },
    { icon: <Star size={20} />, label: 'Total Stars', value: stats?.totalStars || 0 },
    { icon: <GitBranch size={20} />, label: 'Total Forks', value: stats?.totalForks || 0 },
    { icon: <Users size={20} />, label: 'Followers', value: stats?.followers || 0 },
  ];

  if (loading) {
    return (
      <div className="github-stats-skeleton" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '1rem'
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{
            padding: '1.25rem',
            background: 'var(--bg-elevated)',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            height: '80px'
          }} />
        ))}
      </div>
    );
  }

  if (error) return null;

  return (
    <div className="github-stats" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: '1rem'
    }}>
      {statItems.map((item, index) => (
        <motion.div
          key={item.label}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          style={{
            padding: '1.25rem',
            background: 'var(--bg-elevated)',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{
            color: 'var(--accent-primary)',
            marginBottom: '0.5rem'
          }}>
            {item.icon}
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.25rem'
          }}>
            {item.value}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GitHubStats;
