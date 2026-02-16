const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

export const fetchReadme = async (owner, repo) => {
  try {
    const rawUrl = `${GITHUB_RAW_BASE}/${owner}/${repo}/main/README.md`;
    const response = await fetch(rawUrl);
    
    if (response.ok) {
      return await response.text();
    }
    
    const masterUrl = `${GITHUB_RAW_BASE}/${owner}/${repo}/master/README.md`;
    const masterResponse = await fetch(masterUrl);
    
    if (masterResponse.ok) {
      return await masterResponse.text();
    }
    
    throw new Error('README not found');
  } catch (error) {
    console.warn(`Error fetching README for ${owner}/${repo}:`, error);
    return null;
  }
};

export const parseMarkdown = (markdown) => {
  if (!markdown) return [];
  
  const lines = markdown.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeContent = '';
  let codeLanguage = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push({ type: 'code', content: codeContent.trim(), language: codeLanguage });
        codeContent = '';
        codeLanguage = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim();
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }
    
    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', content: line.slice(2) });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', content: line.slice(3) });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', content: line.slice(4) });
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push({ type: 'li', content: line.slice(2) });
    } else if (line.trim() !== '') {
      elements.push({ type: 'p', content: line });
    }
  }
  
  return elements;
};

export default { fetchReadme, parseMarkdown };
