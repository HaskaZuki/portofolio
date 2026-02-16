import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Calendar, Clock, Search, Tag } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  React.useEffect(() => {
    updateMetaTags({
      title: 'Blog | Haska Portfolio',
      description: 'Articles, tutorials, and insights on web development, Discord bots, and modern technologies.',
      keywords: 'blog, web development, discord.js, react, tutorials',
    });
  }, []);

  const posts = [
    {
      slug: 'building-discord-bot-2024',
      title: 'Building a Modern Discord Bot in 2024',
      excerpt: 'A comprehensive guide to creating feature-rich Discord bots using Discord.js v14 with slash commands, modals, buttons, and advanced event handling.',
      date: '2024-02-01',
      readTime: '8 min read',
      category: 'Discord',
      tags: ['Discord.js', 'Node.js', 'Tutorial'],
    },
    {
      slug: 'react-best-practices',
      title: 'React Best Practices for 2024',
      excerpt: 'Essential patterns and practices for building scalable React applications — from custom hooks and memoization to state management strategies.',
      date: '2024-01-25',
      readTime: '6 min read',
      category: 'React',
      tags: ['React', 'JavaScript', 'Best Practices'],
    },
    {
      slug: 'nodejs-performance',
      title: 'Optimizing Node.js Performance',
      excerpt: 'Deep dive into Node.js performance optimization: understanding the event loop, worker threads, clustering, and profiling techniques.',
      date: '2024-01-18',
      readTime: '10 min read',
      category: 'Node.js',
      tags: ['Node.js', 'Performance', 'Backend'],
    },
    {
      slug: 'deploy-vercel-guide',
      title: 'Deploying React Apps to Vercel',
      excerpt: 'Step-by-step guide to deploying React and Next.js applications on Vercel with custom domains, environment variables, and CI/CD pipelines.',
      date: '2024-01-10',
      readTime: '5 min read',
      category: 'DevOps',
      tags: ['Vercel', 'Deployment', 'React'],
    },
    {
      slug: 'mongodb-discord-bot',
      title: 'Using MongoDB with Discord Bots',
      excerpt: 'Learn how to integrate MongoDB with your Discord bot for persistent data storage — guild settings, user profiles, economy systems, and more.',
      date: '2024-01-05',
      readTime: '7 min read',
      category: 'Discord',
      tags: ['MongoDB', 'Discord.js', 'Database'],
    },
    {
      slug: 'css-modern-layouts',
      title: 'Modern CSS Layout Techniques',
      excerpt: 'Master CSS Grid, Flexbox, Container Queries, and the latest CSS features for building responsive, pixel-perfect layouts without frameworks.',
      date: '2023-12-20',
      readTime: '9 min read',
      category: 'CSS',
      tags: ['CSS', 'Layout', 'Frontend'],
    },
  ];

  const categories = ['All', ...new Set(posts.map(p => p.category))];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '2rem 0' }}
    >
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}>
            Blog & Articles
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Insights, tutorials, and thoughts on web development
          </p>
        </div>

        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <div style={{
            flex: 1,
            position: 'relative',
            width: '100%',
          }}>
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-secondary)',
              }}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 12px 12px 40px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                outline: 'none',
                fontSize: '14px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '8px 16px',
                  background: selectedCategory === category ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                  color: selectedCategory === category ? 'white' : 'var(--text-primary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '1rem',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                }}>
                  <span style={{
                    padding: '4px 10px',
                    background: 'var(--bg-subtle)',
                    borderRadius: '4px',
                    color: 'var(--accent-primary)',
                    fontWeight: '600',
                    fontSize: '12px',
                  }}>
                    {post.category}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {post.readTime}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4',
                }}>
                  {post.title}
                </h3>

                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                }}>
                  {post.excerpt}
                </p>

                <div style={{
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap',
                }}>
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        background: 'var(--bg-subtle)',
                        borderRadius: '4px',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div style={{
            padding: '3rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
          }}>
            <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No articles found matching your search.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
