import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const TimelineItem = ({ item, index, isLeft }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${isLeft ? 'left' : 'right'}`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="timeline-content glass-card">
        <div className="timeline-header">
          <span className="timeline-date">{item.date}</span>
          <span className={`timeline-type ${item.type}`}>{item.type}</span>
        </div>
        
        <h3 className="timeline-title">{item.title}</h3>
        <p className="timeline-company">{item.company}</p>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="timeline-details"
            >
              <p className="timeline-description">{item.description}</p>
              {item.achievements && (
                <ul className="timeline-achievements">
                  {item.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              )}
              {item.technologies && (
                <div className="timeline-tech">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          className="timeline-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>
      
      <div className="timeline-dot">
        <motion.div 
          className="dot-inner"
          animate={{ 
            scale: [1, 1.2, 1],
            boxShadow: [
              '0 0 0 0 rgba(0, 255, 204, 0.4)',
              '0 0 0 10px rgba(0, 255, 204, 0)',
              '0 0 0 0 rgba(0, 255, 204, 0)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const experiences = [
    {
      date: '2024 - Present',
      type: 'work',
      title: 'Senior Discord Bot Developer',
      company: 'Freelance / Self-employed',
      description: 'Developing advanced Discord bots for various communities and businesses.',
      achievements: [
        'Built InviteManagerV1 with 10K+ active servers',
        'Created MultipurposeBot with 50+ commands',
        'Developed custom bot solutions for 20+ clients',
      ],
      technologies: ['Discord.js', 'Node.js', 'MongoDB', 'Redis']
    },
    {
      date: '2023 - 2024',
      type: 'work',
      title: 'Frontend Developer',
      company: 'Tech Startup',
      description: 'Built responsive web applications and dashboard interfaces.',
      achievements: [
        'Developed 5+ production web applications',
        'Improved site performance by 40%',
        'Implemented CI/CD pipelines',
      ],
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
    },
    {
      date: '2022 - 2023',
      type: 'education',
      title: 'Full Stack Web Development',
      company: 'Online Bootcamp',
      description: 'Intensive program covering modern web development stack.',
      achievements: [
        'Completed 15+ portfolio projects',
        'Learned MERN stack development',
        'Achieved top 5% in class',
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB']
    },
    {
      date: '2020 - 2022',
      type: 'education',
      title: 'Mechanical Engineering',
      company: 'University',
      description: 'Studied mechanical engineering with focus on automation.',
      achievements: [
        'GPA: 3.8/4.0',
        'Led robotics club projects',
        'Published research paper on automation',
      ],
      technologies: ['Python', 'MATLAB', 'AutoCAD', 'SolidWorks']
    },
    {
      date: '2019 - 2020',
      type: 'project',
      title: 'First Discord Bot',
      company: 'Personal Project',
      description: 'Started learning programming by building Discord bots.',
      achievements: [
        'Learned JavaScript fundamentals',
        'Built first working bot',
        'Joined developer communities',
      ],
      technologies: ['JavaScript', 'Discord.js', 'Node.js']
    }
  ];

  const [filter, setFilter] = useState('all');

  const filteredExperiences = filter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === filter);

  return (
    <section className="timeline-section">
      <div className="timeline-filters">
        {['all', 'work', 'education', 'project'].map((type) => (
          <button
            key={type}
            className={`filter-btn ${filter === type ? 'active' : ''}`}
            onClick={() => setFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="timeline-container">
        <div className="timeline-line" />
        
        <AnimatePresence mode="wait">
          {filteredExperiences.map((item, index) => (
            <TimelineItem
              key={item.title}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .timeline-section {
          margin: 4rem 0;
        }

        .timeline-filters {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 0.6rem 1.5rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .filter-btn:hover,
        .filter-btn.active {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          background: rgba(0, 255, 204, 0.05);
        }

        .timeline-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--accent-primary),
            var(--accent-primary),
            transparent
          );
          top: 0;
        }

        .timeline-item {
          position: relative;
          width: 50%;
          padding: 1rem 2rem;
          margin-bottom: 2rem;
        }

        .timeline-item.left {
          left: 0;
          text-align: right;
          padding-right: 3rem;
        }

        .timeline-item.right {
          left: 50%;
          text-align: left;
          padding-left: 3rem;
        }

        .timeline-content {
          position: relative;
          padding: 1.5rem;
          transition: all 0.3s;
        }

        .timeline-content:hover {
          border-color: var(--accent-primary);
          transform: translateY(-3px);
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .timeline-item.left .timeline-header {
          flex-direction: row-reverse;
        }

        .timeline-date {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--accent-primary);
        }

        .timeline-type {
          font-size: 0.7rem;
          padding: 0.2rem 0.6rem;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .timeline-type.work {
          background: rgba(0, 255, 204, 0.15);
          color: var(--accent-primary);
        }

        .timeline-type.education {
          background: rgba(255, 0, 255, 0.15);
          color: var(--accent-secondary);
        }

        .timeline-type.project {
          background: rgba(255, 204, 0, 0.15);
          color: var(--accent-tertiary);
        }

        .timeline-title {
          font-size: 1.2rem;
          color: var(--text-header);
          margin-bottom: 0.25rem;
        }

        .timeline-company {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .timeline-toggle {
          background: transparent;
          border: none;
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.8rem;
          cursor: pointer;
          text-decoration: underline;
          margin-top: 0.75rem;
          padding: 0;
        }

        .timeline-details {
          overflow: hidden;
          margin-top: 1rem;
        }

        .timeline-description {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .timeline-achievements {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem 0;
        }

        .timeline-achievements li {
          position: relative;
          padding-left: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-main);
          font-size: 0.9rem;
        }

        .timeline-achievements li::before {
          content: '→';
          position: absolute;
          left: 0;
          color: var(--accent-primary);
        }

        .timeline-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-badge {
          font-size: 0.75rem;
          padding: 0.3rem 0.6rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
        }

        .timeline-dot {
          position: absolute;
          top: 2rem;
          width: 20px;
          height: 20px;
          background: var(--bg-core);
          border: 2px solid var(--accent-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-item.left .timeline-dot {
          right: -10px;
        }

        .timeline-item.right .timeline-dot {
          left: -10px;
        }

        .dot-inner {
          width: 8px;
          height: 8px;
          background: var(--accent-primary);
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .timeline-line {
            left: 20px;
          }

          .timeline-item {
            width: 100%;
            left: 0 !important;
            padding-left: 3rem !important;
            padding-right: 1rem !important;
            text-align: left !important;
          }

          .timeline-item .timeline-header {
            flex-direction: row !important;
          }

          .timeline-dot {
            left: 10px !important;
            right: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Timeline;
