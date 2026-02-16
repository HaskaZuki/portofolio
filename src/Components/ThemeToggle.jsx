import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const themes = [
    { id: 'light', icon: <Sun size={16} />, label: 'Light' },
    { id: 'dark', icon: <Moon size={16} />, label: 'Dark' },
    { id: 'system', icon: <Monitor size={16} />, label: 'System' },
  ];

  return (
    <div className="theme-toggle" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem',
      padding: '0.25rem',
      background: 'var(--bg-subtle)',
      borderRadius: '6px',
      border: '1px solid var(--border-subtle)',
    }}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => toggleTheme(t.id)}
          className={`theme-btn ${theme === t.id ? 'active' : ''}`}
          title={t.label}
          style={{
            padding: '0.375rem',
            borderRadius: '4px',
            border: 'none',
            background: theme === t.id ? 'var(--bg-elevated)' : 'transparent',
            color: theme === t.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
