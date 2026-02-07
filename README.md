# Haska's Portfolio

> Modern portfolio website showcasing my projects and skills as a Full Stack Developer & Discord Bot Engineer

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://zukistudio.web.id/)
[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple?style=for-the-badge)](https://www.framer.com/motion/)
[![GitHub](https://img.shields.io/badge/GitHub-HaskaZuki-black?style=for-the-badge&logo=github)](https://github.com/HaskaZuki)

---

### 🌍 Internationalization
- **Multi-Language UI**: 7 languages supported
  - 🇬🇧 English
  - 🇮🇩 Indonesia
  - 🇪🇸 Español
  - 🇮🇹 Italiano
  - 🇫🇷 Français
  - 🇨🇳 中文
  - 🇯🇵 日本語
---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/HaskaZuki/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The app will run on `http://localhost:1234`

### Build for Production

```bash
# Build static files
npm run build

# Build for GitHub Pages
npm run build-gh
```

### Deploy to GitHub Pages

```bash
npm run deploy
```
---

## 🔌 GitHub API Integration

The portfolio fetches real-time data from GitHub API:

### GitHubStats Component
- User statistics (repos, stars, forks, followers)
- Top programming languages with percentages
- Recent activity feed
- 5-minute localStorage cache

### Projects Page
- Live repository list from GitHub
- Auto-categorized by language/topics
- Star and fork counts
- Featured projects highlighting

---

## 📝 Environment Variables

No environment variables required for basic setup. For advanced features:

```bash
# Optional: GitHub token for higher API rate limits
GITHUB_TOKEN=your_token_here
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**Haska (HaskaZuki)**
- GitHub: [@HaskaZuki](https://github.com/HaskaZuki)
- Portfolio: [zukistudio.web.id](https://zukistudio.web.id/)
