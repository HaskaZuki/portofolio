import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const docsPages = [
  { path: '/docs', label: 'Introduction' },
  { path: '/docs/invite', label: 'InviteManager' },
  { path: '/docs/template', label: 'TemplateBot' },
  { path: '/docs/multipurpose', label: 'MultipurposeBot' },
];

const DocsNavigation = ({ currentPath }) => {
  const currentIndex = docsPages.findIndex(page => page.path === currentPath);
  const prevPage = currentIndex > 0 ? docsPages[currentIndex - 1] : null;
  const nextPage = currentIndex < docsPages.length - 1 ? docsPages[currentIndex + 1] : null;

  return (
    <div className="docs-navigation" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '3rem',
      paddingTop: '2rem',
      borderTop: '1px solid var(--border-subtle)',
      gap: '1rem',
    }}>
      {prevPage ? (
        <Link
          to={prevPage.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            transition: 'all 0.2s',
          }}
        >
          <ChevronLeft size={18} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Previous</div>
            <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{prevPage.label}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextPage ? (
        <Link
          to={nextPage.path}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            transition: 'all 0.2s',
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Next</div>
            <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{nextPage.label}</div>
          </div>
          <ChevronRight size={18} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default DocsNavigation;
