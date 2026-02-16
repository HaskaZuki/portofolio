import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import { 
  Search, Home, User, FolderOpen, Mail, FileText, 
  Github, BookOpen, X, ArrowRight, Clock 
} from 'lucide-react';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const commands = [
    { id: 'home', name: 'Home', path: '/', icon: Home, category: 'Pages' },
    { id: 'about', name: 'About', path: '/about', icon: User, category: 'Pages' },
    { id: 'projects', name: 'Projects', path: '/projects', icon: FolderOpen, category: 'Pages' },
    { id: 'blog', name: 'Blog', path: '/blog', icon: FileText, category: 'Pages' },
    { id: 'resources', name: 'Resources', path: '/resources', icon: BookOpen, category: 'Pages' },
    { id: 'contact', name: 'Contact', path: '/contact', icon: Mail, category: 'Pages' },
    { id: 'docs', name: 'Documentation', path: '/docs', icon: FileText, category: 'Pages' },
    { id: 'docs-invite', name: 'Invite Manager Docs', path: '/docs/invite', icon: FileText, category: 'Documentation' },
    { id: 'docs-template', name: 'Template Bot Docs', path: '/docs/template', icon: FileText, category: 'Documentation' },
    { id: 'docs-multi', name: 'Multipurpose Bot Docs', path: '/docs/multipurpose', icon: FileText, category: 'Documentation' },
  ];

  const fuse = new Fuse(commands, {
    keys: ['name', 'category'],
    threshold: 0.4,
    includeScore: true,
  });

  const getFilteredCommands = useCallback(() => {
    if (!searchQuery.trim()) {
      return commands;
    }
    const results = fuse.search(searchQuery);
    return results.map(result => result.item);
  }, [searchQuery]);

  const filteredCommands = getFilteredCommands();

  const [recentPages, setRecentPages] = useState([]);

  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem('recentPages') || '[]');
    setRecentPages(recent);
  }, [isOpen]);

  const openPalette = useCallback(() => {
    setIsOpen(true);
    setSearchQuery('');
    setSelectedIndex(0);
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openPalette();
      } else if (e.key === '/' && !isOpen) {
        const activeElement = document.activeElement;
        const isInputFocused = activeElement && (
          activeElement.tagName === 'INPUT' || 
          activeElement.tagName === 'TEXTAREA'
        );
        if (!isInputFocused) {
          e.preventDefault();
          openPalette();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, openPalette]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          handleSelectCommand(filteredCommands[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closePalette();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, closePalette]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleSelectCommand = (command) => {
    const recent = JSON.parse(localStorage.getItem('recentPages') || '[]');
    const updated = [
      { ...command, timestamp: Date.now() },
      ...recent.filter(p => p.id !== command.id)
    ].slice(0, 5);
    localStorage.setItem('recentPages', JSON.stringify(updated));

    navigate(command.path);
    closePalette();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '10vh 20px 20px',
        }}
        onClick={closePalette}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '640px',
            background: 'var(--bg-elevated)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <Search size={20} style={{ color: 'var(--text-secondary)' }} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages and commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontFamily: 'inherit',
              }}
            />
            <button
              onClick={closePalette}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '8px',
          }}>
            {!searchQuery && recentPages.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  padding: '8px 12px 4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  Recent
                </div>
                {recentPages.map((page) => {
                  const Icon = page.icon;
                  return (
                    <div
                      key={page.id}
                      onClick={() => handleSelectCommand(page)}
                      style={{
                        padding: '10px 12px',
                        margin: '2px 0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: 'transparent',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--bg-subtle)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Clock size={18} style={{ color: 'var(--text-secondary)' }} />
                      <span style={{ flex: 1, color: 'var(--text-primary)' }}>{page.name}</span>
                      <ArrowRight size={16} style={{ color: 'var(--text-secondary)' }} />
                    </div>
                  );
                })}
              </div>
            )}

            {filteredCommands.length > 0 ? (
              <div>
                {!searchQuery && (
                  <div style={{
                    padding: '8px 12px 4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    All Pages
                  </div>
                )}
                {filteredCommands.map((command, index) => {
                  const Icon = command.icon;
                  const isSelected = index === selectedIndex;
                  
                  return (
                    <div
                      key={command.id}
                      onClick={() => handleSelectCommand(command)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      style={{
                        padding: '10px 12px',
                        margin: '2px 0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        background: isSelected ? 'var(--bg-subtle)' : 'transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      <Icon size={18} style={{ color: 'var(--accent-primary)' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                          {command.name}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: 'var(--text-secondary)',
                          marginTop: '2px'
                        }}>
                          {command.category}
                        </div>
                      </div>
                      {isSelected && (
                        <ArrowRight size={16} style={{ color: 'var(--accent-primary)' }} />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
              }}>
                No results found for "{searchQuery}"
              </div>
            )}
          </div>

          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{
                padding: '2px 6px',
                background: 'var(--bg-subtle)',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
              }}>↑↓</kbd>
              Navigate
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{
                padding: '2px 6px',
                background: 'var(--bg-subtle)',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
              }}>↵</kbd>
              Select
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{
                padding: '2px 6px',
                background: 'var(--bg-subtle)',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
              }}>Esc</kbd>
              Close
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CommandPalette;
