import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StaggerContainer, StaggerItem } from './AnimatedSection';

const SkillBar = ({ name, percentage, color = 'var(--accent-primary)', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="skill-bar-container">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <motion.span 
          className="skill-percentage"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ backgroundColor: color }}
        />
        <motion.div
          className="skill-glow"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: `${percentage}%`, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{ 
            background: `linear-gradient(90deg, ${color}40, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

const SkillCategory = ({ title, skills, delay = 0 }) => {
  return (
    <motion.div 
      className="skill-category glass-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <h3 className="skill-category-title">{title}</h3>
      <div className="skill-list">
        {skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            percentage={skill.level}
            color={skill.color}
            delay={delay + index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', level: 95, color: '#61DAFB' },
        { name: 'JavaScript (ES6+)', level: 92, color: '#F7DF1E' },
        { name: 'HTML5 & CSS3', level: 90, color: '#E34F26' },
        { name: 'TypeScript', level: 80, color: '#3178C6' },
        { name: 'Tailwind CSS', level: 88, color: '#06B6D4' },
      ]
    },
    {
      title: 'Backend & Database',
      skills: [
        { name: 'Node.js', level: 85, color: '#339933' },
        { name: 'Discord.js', level: 90, color: '#5865F2' },
        { name: 'MongoDB', level: 82, color: '#47A248' },
        { name: 'PostgreSQL', level: 75, color: '#336791' },
        { name: 'Redis', level: 70, color: '#DC382D' },
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'Git & GitHub', level: 88, color: '#F05032' },
        { name: 'Docker', level: 75, color: '#2496ED' },
        { name: 'AWS', level: 70, color: '#FF9900' },
        { name: 'CI/CD', level: 72, color: '#00FFCC' },
        { name: 'Linux', level: 78, color: '#FCC624' },
      ]
    },
    {
      title: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 95, color: '#F7DF1E' },
        { name: 'Python', level: 85, color: '#3776AB' },
        { name: 'Luau (Roblox)', level: 80, color: '#00A2FF' },
        { name: 'SQL', level: 78, color: '#4479A1' },
        { name: 'Bash/Shell', level: 72, color: '#4EAA25' },
      ]
    }
  ];

  return (
    <section className="skills-section">
      <StaggerContainer className="skills-grid" staggerDelay={0.15}>
        {skillCategories.map((category, index) => (
          <StaggerItem key={category.title}>
            <SkillCategory
              title={category.title}
              skills={category.skills}
              delay={index * 0.1}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>

      <style>{`
        .skills-section {
          margin: 4rem 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }

        .skill-category {
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .skill-category:hover {
          transform: translateY(-5px);
          border-color: var(--accent-primary);
        }

        .skill-category-title {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .skill-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .skill-bar-container {
          width: 100%;
        }

        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .skill-name {
          font-size: 0.95rem;
          color: var(--text-main);
          font-weight: 500;
        }

        .skill-percentage {
          font-family: var(--font-mono);
          font-size: 0.85rem;
          color: var(--accent-primary);
          font-weight: 600;
        }

        .skill-track {
          position: relative;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
        }

        .skill-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 4px;
          box-shadow: 0 0 10px currentColor;
        }

        .skill-glow {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          filter: blur(8px);
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
