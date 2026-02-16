import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from '../../Icons';
import { translations } from '../../../i18n/translations';

const BlogSection = ({ language = 'en' }) => {
  const t = translations[language]?.blog || translations.en.blog || {};
  
  const defaultPosts = [
    {
      title: 'Building a Modern Discord Bot in 2024',
      excerpt: 'A comprehensive guide to creating feature-rich Discord bots using Discord.js v14 with slash commands, buttons, and modals.',
      date: '2024-02-01',
      readTime: '8 min read',
      category: 'Discord',
    },
    {
      title: 'React Best Practices for 2024',
      excerpt: 'Essential patterns for building scalable React applications — custom hooks, memoization, and state management strategies.',
      date: '2024-01-25',
      readTime: '6 min read',
      category: 'React',
    },
    {
      title: 'Optimizing Node.js Performance',
      excerpt: 'Deep dive into Node.js performance: event loop understanding, worker threads, clustering, and profiling techniques.',
      date: '2024-01-18',
      readTime: '10 min read',
      category: 'Node.js',
    },
  ];
  
  const posts = t.posts || defaultPosts;

  return (
    <section className="blog-section" style={{ padding: '4rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h2 className="section-title">{t.title || 'Latest Articles'}</h2>
          <p className="section-description" style={{ 
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {t.description || 'Insights and tutorials on web development.'}
          </p>
        </motion.div>

        <div className="blog-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              className="blog-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              <div style={{ padding: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  fontSize: '0.75rem',
                  color: 'var(--text-secondary)'
                }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    background: 'var(--bg-subtle)',
                    borderRadius: '4px',
                    color: 'var(--accent-primary)',
                    fontWeight: '500'
                  }}>
                    {post.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Icons.Calendar size={12} />
                    {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Icons.Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {post.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent-primary)',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {t.readMore || 'Read More'}
                  <Icons.ArrowRight size={16} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
