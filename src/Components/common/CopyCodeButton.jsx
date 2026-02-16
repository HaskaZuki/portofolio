import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import toast from '../../utils/toast';

const CopyCodeButton = ({ code, label = 'Copy' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard!');
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error('Failed to copy code');
      console.error('Copy failed:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : label}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        background: copied ? 'var(--accent-primary)' : 'var(--bg-subtle)',
        color: copied ? 'white' : 'var(--text-primary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!copied) {
          e.currentTarget.style.background = 'var(--bg-elevated)';
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
        }
      }}
      onMouseLeave={(e) => {
        if (!copied) {
          e.currentTarget.style.background = 'var(--bg-subtle)';
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
        }
      }}
    >
      {copied ? (
        <>
          <Check size={16} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={16} />
          {label}
        </>
      )}
    </button>
  );
};

export default CopyCodeButton;
