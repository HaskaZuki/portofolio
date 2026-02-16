import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../i18n/translations';
import TiltCard from './TiltCard';

const defaultSkills = {
  title: "Skills & Technologies",
  description: "Technologies and tools I work with to build modern applications.",
  categories: {
    all: "All",
    languages: "Languages",
    frameworks: "Frameworks",
    tools: "Tools",
  },
};

const SkillsSection = ({ language = 'en' }) => {
  const t = translations[language]?.skills || translations.en?.skills || defaultSkills;
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t.categories?.all || 'All' },
    { id: 'languages', label: t.categories?.languages || 'Languages' },
    { id: 'frameworks', label: t.categories?.frameworks || 'Frameworks' },
    { id: 'tools', label: t.categories?.tools || 'Tools' },
  ];

  const skills = [
    { name: 'JavaScript', level: 90, category: 'languages', icon: '⚡' },
    { name: 'TypeScript', level: 85, category: 'languages', icon: '📘' },
    { name: 'Python', level: 80, category: 'languages', icon: '🐍' },
    { name: 'Java', level: 75, category: 'languages', icon: '☕' },
    { name: 'React', level: 88, category: 'frameworks', icon: '⚛️' },
    { name: 'Node.js', level: 82, category: 'frameworks', icon: '🟢' },
    { name: 'Next.js', level: 78, category: 'frameworks', icon: '▲' },
    { name: 'Express', level: 80, category: 'frameworks', icon: '🚂' },
    { name: 'Git', level: 85, category: 'tools', icon: '🌿' },
    { name: 'Docker', level: 70, category: 'tools', icon: '🐳' },
    { name: 'AWS', level: 65, category: 'tools', icon: '☁️' },
    { name: 'MongoDB', level: 75, category: 'tools', icon: '🍃' },
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section className="skills-section" style={{ padding: '4rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
            {t.title}
          </h2>
          <p className="section-description" style={{ 
            textAlign: 'center', 
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            {t.description}
          </p>
        </motion.div>

        <div className="skills-filter" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.5rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                background: activeCategory === category.id ? 'var(--accent-primary)' : 'transparent',
                color: activeCategory === category.id ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem'
        }}>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <TiltCard tiltAmount={3}>
                <div className="skill-card" style={{
                  padding: '1.25rem',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  transition: 'all 0.2s'
                }}>
                  <div className="skill-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <span className="skill-icon" style={{ fontSize: '1.5rem' }}>
                      {skill.icon}
                    </span>
                    <span className="skill-name" style={{
                      fontWeight: '600',
                      color: 'var(--text-primary)'
                    }}>
                      {skill.name}
                    </span>
                  </div>
                  
                  <div className="skill-bar-container" style={{
                    height: '6px',
                    background: 'var(--bg-subtle)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      className="skill-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                  
                  <div className="skill-level" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.5rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
