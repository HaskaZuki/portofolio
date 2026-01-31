import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPost, setExpandedPost] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = ['all', 'tutorial', 'discord', 'webdev', 'career'];

  const blogPosts = [
    {
      id: 1,
      title: 'Building Scalable Discord Bots with Discord.js v14',
      excerpt: 'Learn the best practices for creating production-ready Discord bots that can handle thousands of servers.',
      category: 'discord',
      date: 'Jan 15, 2024',
      readTime: '8 min read',
      tags: ['Discord.js', 'Node.js', 'JavaScript'],
      content: `Discord.js v14 brought significant changes to how we build bots. In this comprehensive guide, we'll explore:

1. **Setting up your project structure** - Learn how to organize your code for scalability
2. **Command handling** - Implementing slash commands and context menus
3. **Database integration** - Using MongoDB for persistent data storage
4. **Error handling** - Building robust error recovery systems
5. **Performance optimization** - Techniques for handling high-traffic servers

Whether you're building your first bot or scaling an existing one, these patterns will help you create maintainable, efficient Discord bots.`,
      featured: true,
    },
    {
      id: 2,
      title: 'Modern React Patterns for Portfolio Websites',
      excerpt: 'Explore advanced React techniques to make your portfolio stand out with smooth animations and interactions.',
      category: 'webdev',
      date: 'Jan 10, 2024',
      readTime: '6 min read',
      tags: ['React', 'Framer Motion', 'CSS'],
      content: `Creating an impressive portfolio requires more than just good projects. Let's dive into modern React patterns:

- **Custom Hooks** - Reusable logic for animations and data fetching
- **Performance Optimization** - Lazy loading and code splitting
- **Animation Libraries** - Using Framer Motion for smooth transitions
- **Responsive Design** - Mobile-first approach with Tailwind CSS`,
      featured: false,
    },
    {
      id: 3,
      title: 'From Mechanical Engineer to Developer: My Journey',
      excerpt: 'How I transitioned from engineering to software development and the lessons learned along the way.',
      category: 'career',
      date: 'Dec 28, 2023',
      readTime: '10 min read',
      tags: ['Career', 'Learning', 'Motivation'],
      content: `The transition wasn't easy, but it was worth it. Here's my story and advice for anyone considering a similar path...`,
      featured: false,
    },
    {
      id: 4,
      title: 'Advanced MongoDB Queries for Bot Development',
      excerpt: 'Optimize your database queries for better performance in high-traffic Discord bots.',
      category: 'tutorial',
      date: 'Dec 20, 2023',
      readTime: '7 min read',
      tags: ['MongoDB', 'Database', 'Performance'],
      content: `Database performance is crucial for bot responsiveness. Learn about indexing, aggregation pipelines, and more...`,
      featured: false,
    },
    {
      id: 5,
      title: 'Creating Custom Discord Bot Dashboards',
      excerpt: 'Build web dashboards to manage your Discord bots with real-time statistics and controls.',
      category: 'discord',
      date: 'Dec 15, 2023',
      readTime: '12 min read',
      tags: ['Discord.js', 'React', 'Socket.io'],
      content: `A web dashboard can greatly enhance your bot's usability. This tutorial covers authentication, real-time updates, and more...`,
      featured: true,
    },
    {
      id: 6,
      title: 'TypeScript Best Practices for Node.js Projects',
      excerpt: 'Write cleaner, more maintainable code with TypeScript in your Node.js applications.',
      category: 'tutorial',
      date: 'Dec 5, 2023',
      readTime: '9 min read',
      tags: ['TypeScript', 'Node.js', 'Best Practices'],
      content: `TypeScript has become essential for serious Node.js development. Learn configuration, typing strategies, and common patterns...`,
      featured: false,
    },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <motion.section 
      ref={ref}
      className="blog-section"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Posts */}
      <div className="featured-posts">
        <h3>Featured Articles</h3>
        <div className="featured-grid">
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="featured-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              onClick={() => setExpandedPost(post)}
            >
              <div className="featured-content">
                <span className="post-category">{post.category}</span>
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="blog-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="blog-grid">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="blog-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setExpandedPost(post)}
              layout
            >
              <div className="blog-card-header">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
              </div>
              <h4 className="blog-title">{post.title}</h4>
              <p className="blog-excerpt">{post.excerpt}</p>
              <div className="blog-footer">
                <div className="blog-tags">
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
                <span className="read-time">{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded Post Modal */}
      <AnimatePresence>
        {expandedPost && (
          <motion.div
            className="blog-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedPost(null)}
          >
            <motion.article
              className="blog-modal glass-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-btn" onClick={() => setExpandedPost(null)}>×</button>
              <div className="modal-header">
                <span className="modal-category">{expandedPost.category}</span>
                <h2>{expandedPost.title}</h2>
                <div className="modal-meta">
                  <span>{expandedPost.date}</span>
                  <span>•</span>
                  <span>{expandedPost.readTime}</span>
                </div>
              </div>
              <div className="modal-content">
                <p className="modal-excerpt">{expandedPost.excerpt}</p>
                <div className="modal-body">
                  {expandedPost.content.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="modal-tags">
                  {expandedPost.tags.map(tag => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .blog-section {
          margin: 4rem 0;
        }

        .featured-posts {
          margin-bottom: 3rem;
        }

        .featured-posts h3 {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .featured-card {
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s;
          border-left: 3px solid var(--accent-primary);
        }

        .featured-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-secondary);
        }

        .post-category {
          display: inline-block;
          padding: 0.3rem 0.8rem;
          background: rgba(0, 255, 204, 0.1);
          color: var(--accent-primary);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .featured-card h4 {
          font-size: 1.25rem;
          color: var(--text-header);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .featured-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .post-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .blog-filters {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .filter-pill {
          padding: 0.5rem 1.25rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
          font-family: var(--font-main);
        }

        .filter-pill:hover,
        .filter-pill.active {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
        }

        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .blog-card {
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .blog-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent-primary);
        }

        .blog-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .blog-category {
          font-size: 0.75rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .blog-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .blog-title {
          font-size: 1.1rem;
          color: var(--text-header);
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }

        .blog-excerpt {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .blog-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .blog-tag {
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
        }

        .read-time {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .blog-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 2rem;
        }

        .blog-modal {
          max-width: 800px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          padding: 3rem;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 2rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .close-btn:hover {
          color: var(--accent-primary);
        }

        .modal-header {
          margin-bottom: 2rem;
        }

        .modal-category {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: rgba(0, 255, 204, 0.1);
          color: var(--accent-primary);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1rem;
        }

        .modal-header h2 {
          font-size: 1.75rem;
          color: var(--text-header);
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .modal-meta {
          display: flex;
          gap: 0.75rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.9rem;
        }

        .modal-content {
          color: var(--text-main);
          line-height: 1.8;
        }

        .modal-excerpt {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--glass-border);
        }

        .modal-body p {
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        .modal-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid var(--glass-border);
        }

        .modal-tag {
          padding: 0.4rem 0.8rem;
          background: rgba(0, 255, 204, 0.1);
          color: var(--accent-primary);
          font-size: 0.8rem;
        }

        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }

          .blog-modal {
            padding: 2rem 1.5rem;
            max-height: 90vh;
          }

          .modal-header h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default BlogSection;
