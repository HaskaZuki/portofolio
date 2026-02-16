import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { updateMetaTags } from '../utils/seo';
import CopyCodeButton from '../components/common/CopyCodeButton';

const BlogPost = () => {
  const { slug } = useParams();

  const post = {
    title: 'Building a Modern Discord Bot in 2024',
    date: '2024-02-01',
    readTime: '8 min read',
    category: 'Discord',
    tags: ['Discord.js', 'Node.js', 'Tutorial'],
    content: `
This is a comprehensive guide to building a modern Discord bot using Discord.js v14.

## Getting Started

First, initialize your project:

\`\`\`bash
npm init -y
npm install discord.js dotenv
\`\`\`

## Basic Bot Setup

Create your main bot file:

\`\`\`javascript
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.login(process.env.TOKEN);
\`\`\`

## Creating Slash Commands

Modern Discord bots use slash commands for better UX.

This would continue with actual content...
    `,
  };

  React.useEffect(() => {
    updateMetaTags({
      title: `${post.title} | Haska Blog`,
      description: 'Learn how to build a modern Discord bot using Discord.js v14.',
      keywords: post.tags.join(', '),
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '2rem 0' }}
    >
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            marginBottom: '2rem',
            fontSize: '14px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <article>
          <header style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '1rem',
              fontSize: '14px',
              color: 'var(--text-secondary)',
            }}>
              <span style={{
                padding: '4px 12px',
                background: 'var(--bg-subtle)',
                borderRadius: '4px',
                color: 'var(--accent-primary)',
                fontWeight: '600',
              }}>
                {post.category}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '1rem',
              lineHeight: '1.2',
            }}>
              {post.title}
            </h1>

            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    background: 'var(--bg-subtle)',
                    borderRadius: '4px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="blog-content"
            style={{
              fontSize: '1.0625rem',
              lineHeight: '1.8',
              color: 'var(--text-primary)',
            }}
          >
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} style={{
                    fontSize: '1.75rem',
                    fontWeight: '600',
                    marginTop: '2rem',
                    marginBottom: '1rem',
                  }}>
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```[\w]*\n?/g, '');
                return (
                  <div key={index} style={{
                    position: 'relative',
                    marginBottom: '1.5rem',
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      zIndex: 1,
                    }}>
                      <CopyCodeButton code={code} />
                    </div>
                    <pre style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      overflow: 'auto',
                      fontSize: '0.9375rem',
                    }}>
                      <code>{code}</code>
                    </pre>
                  </div>
                );
              }

              return (
                <p key={index} style={{ marginBottom: '1.5rem' }}>
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}>
            Found this helpful?
          </p>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
          }}>
            Share this article with your network
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            style={{
              padding: '10px 20px',
              background: 'var(--accent-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            <Share2 size={16} />
            Share Link
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPost;
