# Haska's Portfolio

> Modern portfolio website showcasing my projects and skills as a Full Stack Developer & Discord Bot Engineer

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://zukistudio.web.id/)
[![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-purple?style=for-the-badge)](https://www.framer.com/motion/)
[![GitHub](https://img.shields.io/badge/GitHub-HaskaZuki-black?style=for-the-badge&logo=github)](https://github.com/HaskaZuki)

---

## ✨ Features

### 🎨 Visual Design
- **Dual Theme System**: Cyberpunk Dark Mode with neon cyan accents & Premium Light Mode
- **Particle Background**: Interactive animated particles with mouse tracking
- **Glassmorphism UI**: Modern frosted glass cards with backdrop blur
- **Custom Cursor**: Animated cursor with hover states (desktop only)
- **Scroll Progress**: Visual progress indicator with back-to-top button

### 🚀 Advanced Components
- **3D Tilt Cards**: Interactive cards with 3D hover effects
- **Animated Sections**: Scroll-triggered animations with Framer Motion
- **Page Transitions**: Smooth route transitions with AnimatePresence
- **Skills Visualization**: Animated progress bars with real-time data
- **Timeline**: Interactive experience timeline with expandable details
- **GitHub Stats**: Live GitHub statistics and contribution graphs
- **Blog Section**: Featured articles with category filtering
- **Testimonials**: Client feedback carousel

### 🌍 Internationalization
- **Multi-Language UI**: 7 languages supported
  - 🇬🇧 English
  - 🇮🇩 Indonesia
  - 🇪🇸 Español
  - 🇮🇹 Italiano
  - 🇫🇷 Français
  - 🇨🇳 中文
  - 🇯🇵 日本語

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Hamburger Menu**: Mobile navigation with smooth animations
- **Touch-Friendly**: Optimized touch interactions

---

## 🛠️ Tech Stack

### Core Technologies
- **Frontend**: React 18.2, React Router v6
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **Build Tool**: Parcel 2.7
- **Deployment**: GitHub Pages

### Advanced Features
- **Real GitHub API Integration**: Live repository and stats data
- **LocalStorage Caching**: 5-minute cache for API responses
- **Service Worker**: PWA support with offline capabilities
- **Error Boundaries**: Graceful error handling
- **SEO Optimized**: Meta tags, Open Graph, structured data

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

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ParticleBackground.jsx    # Animated particle system
│   │   ├── CustomCursor.jsx          # Custom animated cursor
│   │   ├── AnimatedSection.jsx       # Scroll-triggered animations
│   │   ├── TiltCard.jsx              # 3D tilt effect cards
│   │   ├── SkillsSection.jsx         # Animated skill bars
│   │   ├── Timeline.jsx              # Experience timeline
│   │   ├── GitHubStats.jsx           # Live GitHub statistics
│   │   ├── Testimonials.jsx          # Client testimonials
│   │   ├── BlogSection.jsx           # Blog posts showcase
│   │   ├── PageTransition.jsx        # Route transitions
│   │   ├── ScrollProgress.jsx        # Scroll indicator
│   │   ├── Sidebar.jsx               # Navigation sidebar
│   │   └── Footer.jsx                # Page footer
│   ├── pages/                # Page components
│   │   ├── Home.jsx          # Hero section + blog preview
│   │   ├── About.jsx         # Bio + skills + timeline + GitHub
│   │   ├── Projects.jsx      # Repository showcase (GitHub API)
│   │   ├── Resources.jsx     # Developer resources
│   │   ├── Contact.jsx       # Contact form
│   │   ├── Docs.jsx          # Documentation hub
│   │   └── Welcome.jsx       # Animated welcome screen
│   ├── i18n/                 # Translations
│   │   └── translations.js   # 7 language translations
│   ├── styles.css            # Global styles + design system
│   ├── App.jsx               # Main app component
│   ├── index.html            # HTML entry with SEO meta tags
│   └── service-worker.js     # PWA service worker
├── plans/                    # Enhancement plans
│   └── portfolio-enhancement-plan.md
├── dist/                     # Production build
├── manifest.json             # PWA manifest
└── package.json
```

---

## 🎨 Design System

### Color Palette
| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| Primary | `#00ffcc` (Electric Cyan) | `#1a1a1a` (Charcoal) |
| Secondary | `#ff00ff` (Neon Magenta) | `#4a4a4a` (Grey) |
| Background | `#000000` (Pure Black) | `#fafafa` (Off-white) |
| Surface | `#0d0d0d` | `#ffffff` |
| Text | `#e8e8e8` | `#2a2a2a` |

### Typography
- **Primary Font**: Inter, system-ui
- **Monospace**: JetBrains Mono, Fira Code
- **Scale**: Responsive type scale with viewport units

### Animation Timing
- **Fast**: 200ms (micro-interactions)
- **Normal**: 300ms (standard transitions)
- **Slow**: 600ms (page transitions)
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out)

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

### Rate Limiting
- Unauthenticated: 60 requests/hour
- Cache reduces API calls significantly
- Graceful fallback on API errors

---

## 📱 PWA Features

- **Installable**: Add to home screen on mobile
- **Offline Support**: Service worker caching
- **Manifest**: Custom icons and theme colors
- **Responsive**: Works on all devices

---

## 🎯 Performance

- **Build Time**: ~600ms
- **Bundle Size**: ~450KB (gzipped)
- **Lighthouse Score**: 90+ (Performance, Accessibility, SEO)
- **First Paint**: < 1.5s

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

## 📄 License

This project is licensed under the UNLICENSED License - see the source for details.

---

## 👤 Author

**Haska (HaskaZuki)**
- GitHub: [@HaskaZuki](https://github.com/HaskaZuki)
- Portfolio: [zukistudio.web.id](https://zukistudio.web.id/)

---

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for icons
- [Parcel](https://parceljs.org/) for bundling
- [React](https://reactjs.org/) for the UI library
