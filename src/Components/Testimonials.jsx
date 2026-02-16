import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { translations } from '../i18n/translations';

const Testimonials = ({ language = 'en' }) => {
  const defaultTestimonials = {
    title: 'Testimonials',
    items: [
      { quote: 'Haska built an incredible Discord bot for our community of 50k+ members. The invite tracking and moderation features exceeded our expectations.', author: 'Alex Rivera', role: 'Community Manager' },
      { quote: 'Extremely professional and detail-oriented. Our React dashboard was delivered ahead of schedule with clean, maintainable code.', author: 'Sarah Chen', role: 'Startup Founder' },
      { quote: 'One of the best developers I\'ve worked with. Great communication, quick turnaround, and the final product was polished and bug-free.', author: 'Marcus Thompson', role: 'Project Lead' },
    ],
  };
  const t = translations[language]?.testimonials || translations.en?.testimonials || defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote: t.items?.[0]?.quote || defaultTestimonials.items[0].quote,
      author: t.items?.[0]?.author || defaultTestimonials.items[0].author,
      role: t.items?.[0]?.role || defaultTestimonials.items[0].role,
      avatar: '👤',
    },
    {
      quote: t.items?.[1]?.quote || defaultTestimonials.items[1].quote,
      author: t.items?.[1]?.author || defaultTestimonials.items[1].author,
      role: t.items?.[1]?.role || defaultTestimonials.items[1].role,
      avatar: '👤',
    },
    {
      quote: t.items?.[2]?.quote || defaultTestimonials.items[2].quote,
      author: t.items?.[2]?.author || defaultTestimonials.items[2].author,
      role: t.items?.[2]?.role || defaultTestimonials.items[2].role,
      avatar: '👤',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section" style={{ padding: '4rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h2 className="section-title">{t.title}</h2>
        </motion.div>

        <div className="testimonials-slider" style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="testimonial-card"
              style={{
                padding: '2rem',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <div style={{ 
                color: 'var(--accent-primary)', 
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Quote size={32} />
              </div>
              
              <p style={{
                fontSize: '1.125rem',
                color: 'var(--text-primary)',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                fontStyle: 'italic'
              }}>
                "{testimonials[currentIndex].quote}"
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {testimonials[currentIndex].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{
                    fontWeight: '600',
                    color: 'var(--text-primary)'
                  }}>
                    {testimonials[currentIndex].author}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem'
          }}>
            <button
              onClick={prevTestimonial}
              className="btn-icon"
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    background: index === currentIndex ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="btn-icon"
              style={{
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
