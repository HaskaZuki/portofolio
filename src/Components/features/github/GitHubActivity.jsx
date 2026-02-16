import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GitCommit, GitPullRequest, Star, GitFork, 
  AlertCircle, Package, ExternalLink, Calendar 
} from 'lucide-react';
import { getActivity } from '../services/githubService';

const GitHubActivity = ({ username = 'HaskaZuki', maxEvents = 10 }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchActivity = async () => {
      const cached = localStorage.getItem('githubActivity');
      const cachedTime = localStorage.getItem('githubActivityTime');
      
      if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 600000) {
        setEvents(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const data = await getActivity(username);
      
      if (data.success) {
        setEvents(data.events.slice(0, maxEvents));
        localStorage.setItem('githubActivity', JSON.stringify(data.events));
        localStorage.setItem('githubActivityTime', Date.now().toString());
      } else {
        setError(true);
      }
      
      setLoading(false);
    };

    fetchActivity();
  }, [username, maxEvents]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit size={16} />;
      case 'PullRequestEvent':
        return <GitPullRequest size={16} />;
      case 'WatchEvent':
        return <Star size={16} />;
      case 'ForkEvent':
        return <GitFork size={16} />;
      case 'IssuesEvent':
        return <AlertCircle size={16} />;
      case 'CreateEvent':
        return <Package size={16} />;
      default:
        return <GitCommit size={16} />;
    }
  };

  const formatEventDescription = (event) => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed ${event.payload.commits || 1} commit${event.payload.commits !== 1 ? 's' : ''}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request`;
      case 'WatchEvent':
        return 'Starred repository';
      case 'ForkEvent':
        return 'Forked repository';
      case 'IssuesEvent':
        return `${event.payload.action} issue`;
      case 'CreateEvent':
        return `Created ${event.payload.refType || 'repository'}`;
      default:
        return event.type.replace('Event', '');
    }
  };

  const getRelativeTime = (timestamp) => {
    const now = Date.now();
    const diff = now - new Date(timestamp).getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              padding: '12px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              height: '60px',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
        ))}
      </div>
    );
  }

  if (error || events.length === 0) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '8px',
      }}>
        No recent activity
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          style={{
            padding: '12px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
            e.currentTarget.style.transform = 'translateX(4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-subtle)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
            <div style={{ 
              color: 'var(--accent-primary)', 
              marginTop: '2px',
              flexShrink: 0,
            }}>
              {getEventIcon(event.type)}
            </div>
            
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '13px',
                fontWeight: '500',
                color: 'var(--text-primary)',
                marginBottom: '4px',
              }}>
                {formatEventDescription(event)}
              </div>
              
              <a
                href={event.repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {event.repo.name}
                <ExternalLink size={10} />
              </a>
              
              {event.payload.message && (
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {event.payload.message}
                </div>
              )}
            </div>
            
            <div style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              {getRelativeTime(event.createdAt)}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GitHubActivity;
