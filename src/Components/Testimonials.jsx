import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const testimonials = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Community Manager',
      company: 'GamingHub Discord',
      avatar: '👨‍💼',
      content: 'Haska built an incredible invite tracking bot for our 50K+ member server. The bot is fast, reliable, and the leaderboard feature keeps our community engaged!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Miller',
      role: 'Server Owner',
      company: 'Tech Community',
      avatar: '👩‍💻',
      content: 'The multipurpose bot exceeded all expectations. Music, moderation, and custom commands all work flawlessly. Best investment for our server!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Developer',
      company: 'StartupXYZ',
      avatar: '👨‍🚀',
      content: 'Used the TemplateBot as a foundation for our company bot. Clean code, excellent documentation, and great architecture. Saved us weeks of development!',
      rating: 5,
    },
    {
      id: 4,
      name: 'Emily Wong',
      role: 'Product Manager',
      company: 'Digital Agency',
      avatar: '👩‍🎨',
      content: 'Professional, responsive, and incredibly skilled. Haska delivered a custom bot solution that perfectly matched our requirements. Highly recommended!',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <motion.section 
      ref={ref}
      className="testimonials-section"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="testimonials-header">
        <h2>What Clients Say</h2>
        <p>Feedback from Discord server owners and developers</p>
      </div>

      <div className="testimonials-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="testimonial-card glass-card"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <div className="testimonial-content">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">{testimonials[currentIndex].content}</p>
              
              <div className="testimonial-author">
                <div className="author-avatar">{testimonials[currentIndex].avatar}</div>
                <div className="author-info">
                  <h4>{testimonials[currentIndex].name}</h4>
                  <p>{testimonials[currentIndex].role}</p>
                  <span>{testimonials[currentIndex].company}</span>
                </div>
              </div>

              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="testimonial-navigation">
          <button className="nav-btn" onClick={prevTestimonial}>
            ←
          </button>
          
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
          
          <button className="nav-btn" onClick={nextTestimonial}>
            →
          </button>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          margin: 4rem 0;
        }

        .testimonials-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .testimonials-header h2 {
          font-size: 2rem;
          color: var(--text-header);
          margin-bottom: 0.5rem;
        }

        .testimonials-header p {
          color: var(--text-muted);
        }

        .testimonials-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-card {
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        .testimonial-content {
          position: relative;
          z-index: 1;
        }

        .quote-icon {
          font-size: 6rem;
          color: var(--accent-primary);
          opacity: 0.2;
          position: absolute;
          top: -1rem;
          left: 0;
          font-family: Georgia, serif;
          line-height: 1;
        }

        .testimonial-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-main);
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--bg-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border: 2px solid var(--accent-primary);
        }

        .author-info h4 {
          font-size: 1.1rem;
          color: var(--text-header);
          margin-bottom: 0.25rem;
        }

        .author-info p {
          font-size: 0.9rem;
          color: var(--accent-primary);
          margin-bottom: 0.25rem;
        }

        .author-info span {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
        }

        .star {
          font-size: 1.2rem;
        }

        .testimonial-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
        }

        .nav-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 1px solid var(--glass-border);
          background: var(--bg-card);
          color: var(--accent-primary);
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-btn:hover {
          border-color: var(--accent-primary);
          background: var(--accent-primary);
          color: #000;
          transform: scale(1.1);
        }

        .testimonial-dots {
          display: flex;
          gap: 0.5rem;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: var(--glass-border);
          cursor: pointer;
          transition: all 0.3s;
        }

        .dot.active {
          background: var(--accent-primary);
          transform: scale(1.3);
        }

        .dot:hover {
          background: var(--accent-primary);
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 2rem;
          }

          .testimonial-text {
            font-size: 1rem;
          }

          .quote-icon {
            font-size: 4rem;
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Testimonials;
