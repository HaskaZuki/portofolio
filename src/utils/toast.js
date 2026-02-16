let toastContainer = null;

const createToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10001;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
};

export const toast = {
  success: (message, duration = 3000) => {
    showToast(message, 'success', duration);
  },
  
  error: (message, duration = 3000) => {
    showToast(message, 'error', duration);
  },
  
  info: (message, duration = 3000) => {
    showToast(message, 'info', duration);
  },
};

const showToast = (message, type = 'info', duration = 3000) => {
  const container = createToastContainer();
  
  const toastEl = document.createElement('div');
  toastEl.className = `toast toast-${type}`;
  
  const colors = {
    success: { bg: '#10b981', icon: '✓' },
    error: { bg: '#ef4444', icon: '✕' },
    info: { bg: '#3b82f6', icon: 'ℹ' },
  };
  
  const { bg, icon } = colors[type] || colors.info;
  
  toastEl.innerHTML = `
    <div style="
      background: ${bg};
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 500;
      pointer-events: auto;
      animation: slideIn 0.3s ease;
      min-width: 200px;
      max-width: 400px;
    ">
      <span style="font-size: 18px;">${icon}</span>
      <span>${message}</span>
    </div>
  `;
  
  container.appendChild(toastEl);
  
  toastEl.style.animation = 'slideInRight 0.3s ease';
  
  setTimeout(() => {
    toastEl.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => {
      container.removeChild(toastEl);
      if (container.children.length === 0) {
        document.body.removeChild(container);
        toastContainer = null;
      }
    }, 300);
  }, duration);
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

export default toast;
