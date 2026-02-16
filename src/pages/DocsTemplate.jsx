import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Loader } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { fetchReadme } from '../utils/githubReadme';
import DocsNavigation from '../components/DocsNavigation';

marked.setOptions({
  breaks: true,
  gfm: true,
});

const DocsTemplate = () => {
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReadme = async () => {
      const content = await fetchReadme('HaskaZuki', 'TemplateBot');
      if (content) {
        const html = marked.parse(content);
        const sanitizedHtml = DOMPurify.sanitize(html);
        setReadme(sanitizedHtml);
      }
      setLoading(false);
    };
    loadReadme();
  }, []);

  return (
    <div className="page-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <header className="page-header" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1>TemplateBot</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>Simple Discord bot template for quick development</p>
            </div>
            <a 
              href="https://github.com/HaskaZuki/TemplateBot" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                background: 'var(--accent-primary)',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500',
              }}
            >
              <ExternalLink size={16} />
              View on GitHub
            </a>
          </div>
        </header>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        ) : readme ? (
          <div 
            className="markdown-content" 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px',
              padding: '2rem',
            }}
            dangerouslySetInnerHTML={{ __html: readme }}
          />
        ) : (
          <div style={{ 
            padding: '2rem', 
            textAlign: 'center', 
            color: 'var(--text-muted)',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--glass-border)',
          }}>
            <p>Unable to load README. Please check the repository on GitHub.</p>
          </div>
        )}

        <DocsNavigation currentPath="/docs/template" />
      </motion.div>
    </div>
  );
};

export default DocsTemplate;
