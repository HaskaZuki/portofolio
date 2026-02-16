import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Book, Code, Zap, Shield } from 'lucide-react';
import DocsNavigation from '../components/DocsNavigation';

const Docs = () => {
  const features = [
    {
      icon: <Book size={24} />,
      title: 'Comprehensive Guides',
      description: 'Step-by-step tutorials for every feature',
    },
    {
      icon: <Code size={24} />,
      title: 'API Reference',
      description: 'Detailed documentation for developers',
    },
    {
      icon: <Zap size={24} />,
      title: 'Quick Start',
      description: 'Get up and running in minutes',
    },
    {
      icon: <Shield size={24} />,
      title: 'Best Practices',
      description: 'Learn recommended patterns',
    },
  ];

  const docModules = [
    { path: '/docs/invite', label: 'InviteManager', desc: 'Discord invite tracking and management' },
    { path: '/docs/template', label: 'TemplateBot', desc: 'Pre-built bot templates' },
    { path: '/docs/multipurpose', label: 'MultipurposeBot', desc: 'All-in-one Discord bot' },
  ];

  return (
    <div className="page-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className="page-header">
          <h1>Documentation</h1>
          <p>Welcome to the documentation. Here you will find everything you need to build amazing Discord bots.</p>
        </header>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '3rem',
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-card"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: 'var(--text-header)',
                marginBottom: '0.5rem',
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                margin: 0,
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--text-header)',
        }}>
          Modules
        </h2>

        <div style={{
          display: 'grid',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          {docModules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className="glass-card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem',
                textDecoration: 'none',
              }}
            >
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'var(--text-header)',
                  marginBottom: '0.25rem',
                }}>
                  {module.label}
                </h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}>
                  {module.desc}
                </p>
              </div>
              <ChevronRight size={20} style={{ color: 'var(--text-muted)' }} />
            </Link>
          ))}
        </div>

        <div style={{
          padding: '1.25rem',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--glass-border)',
          borderRadius: '8px',
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
          }}>
            <strong style={{ color: 'var(--text-header)' }}>Need help?</strong>{' '}
            Join our community Discord server for support and discussions.
          </p>
        </div>

        <DocsNavigation currentPath="/docs" />
      </motion.div>
    </div>
  );
};

export default Docs;
