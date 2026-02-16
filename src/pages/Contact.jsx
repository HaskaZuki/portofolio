import React, { useState, useEffect } from "react";
import * as Icons from "../components/Icons";
import { t } from "../i18n/translations";
import emailjs from "@emailjs/browser";


const EMAILJS_SERVICE_ID = "service_tycjm3i";
const EMAILJS_TEMPLATE_ID = "template_daoimk1";
const EMAILJS_PUBLIC_KEY = "mjxBRc311HkJhJKCl";

const Contact = ({ language = "en" }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeMethod, setActiveMethod] = useState(null);
  const [userInfo, setUserInfo] = useState({
    ip: "Loading...",
    city: "Unknown",
    country: "Unknown",
    browser: "Unknown",
    os: "Unknown"
  });

  
  useEffect(() => {
    const getSystemInfo = () => {
      const n = navigator;
      const w = window;
      const s = screen;
      
      
      const conn = n.connection || n.mozConnection || n.webkitConnection || {};

      return {
        screenRes: `${s.width}x${s.height}`,
        windowSize: `${w.innerWidth}x${w.innerHeight}`,
        colorDepth: `${s.colorDepth}-bit`,
        language: n.language,
        cookiesEnabled: n.cookieEnabled ? "Yes" : "No",
        cpuCores: n.hardwareConcurrency || "Unknown",
        deviceRam: n.deviceMemory ? `~${n.deviceMemory} GB` : "Unknown",
        connectionType: conn.effectiveType || "Unknown",
        userAgent: n.userAgent,
        referrer: document.referrer || "Direct Access",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        platform: n.platform
      };
    };

    const sysInfo = getSystemInfo();

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        setUserInfo({
          ...sysInfo,
          ip: data.ip || "Unknown",   
          city: data.city || "Unknown",
          region: data.region || "Unknown",
          country: data.country_name || "Unknown",
          postal: data.postal || "Unknown",
          isp: data.org || "Unknown",
          asn: data.asn || "Unknown",
          lat: data.latitude,
          lon: data.longitude,
          browser: sysInfo.userAgent,
          os: sysInfo.platform
        });
      })
      .catch(err => {
        console.warn("Failed to fetch IP info:", err);
        setUserInfo(prev => ({ ...prev, ...sysInfo, ip: "Blocked/Unknown" }));
      });
  }, []);

  const contactMethods = [
    {
      id: 'email',
      icon: Icons.Mail,
      title: t(language, "email"),
      value: 'haskabussiness@gmail.com',
      badge: t(language, "primaryContact"),
      action: 'mailto:haskabussiness@gmail.com',
      description: 'Best for detailed inquiries and proposals'
    },
    {
      id: 'discord',
      icon: Icons.Discord,
      title: t(language, "discord"),
      value: '@haskazuki',
      badge: t(language, "fastResponse"),
      action: 'https://discord.com/users/710245394533318676',
      description: 'Quick questions and community chat'
    },
    {
      id: 'github',
      icon: Icons.GitHub,
      title: t(language, "github"),
      value: '@HaskaZuki',
      badge: t(language, "codebase"),
      action: 'https://github.com/HaskaZuki',
      description: 'View my projects and contributions'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const availability = {
    status: 'available',
    timezone: 'Asia/Jakarta (GMT+7)',
    responseTime: 'Usually within 24 hours'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

  
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      
      user_ip: userInfo.ip,
      user_isp: `${userInfo.isp} (${userInfo.asn})`,
      user_location: `${userInfo.city}, ${userInfo.region}, ${userInfo.postal}, ${userInfo.country}`,
      user_coords: `https://www.google.com/maps?q=${userInfo.lat},${userInfo.lon}`,
      
      screen_res: userInfo.screenRes,
      window_size: userInfo.windowSize,
      device_ram: userInfo.deviceRam,
      cpu_cores: userInfo.cpuCores,
      
    
      browser_lang: userInfo.language,
      connection_type: userInfo.connectionType,
      cookies_enabled: userInfo.cookiesEnabled,
      user_agent: userInfo.userAgent,
      referrer: userInfo.referrer,
      
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    };

    if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
      alert("EmailJS belum dikonfigurasi! Mohon edit file Contact.jsx dengan ID Anda.");
      setIsSubmitting(false);
      return;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log('Email sent:', result.text);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      })
      .catch((error) => {
        console.error('Email error:', error.text);
        alert(`Gagal mengirim email: ${error.text}`);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setActiveMethod('copied');
    setTimeout(() => setActiveMethod(null), 2000);
  };

  return (
    <div className="page-wrapper fade-in">
      <header className="page-header contact-header">
        <h1>{t(language, "contactTitle")}</h1>
        <p>Lets build something amazing together.</p>
        
        <div className="availability-badge">
          <span className={`status-dot ${availability.status}`}></span>
          <span className="status-text">
            {availability.status === 'available' ? 'Open for opportunities' : 'Currently busy'}
          </span>
          <span className="timezone">{availability.timezone}</span>
        </div>
      </header>

      <div className="contact-content">
        <div className="contact-methods">
          <h3>Get in Touch</h3>
          <div className="methods-grid">
            {contactMethods.map((method) => (
              <div 
                key={method.id}
                className={`contact-method-card ${activeMethod === method.id ? 'active' : ''}`}
                onClick={() => setActiveMethod(method.id)}
              >
                <div className="method-icon">
                  <method.icon />
                </div>
                <div className="method-info">
                  <div className="method-header">
                    <h4>{method.title}</h4>
                    <span className="method-badge">{method.badge}</span>
                  </div>
                  <p className="method-value">{method.value}</p>
                  <p className="method-description">{method.description}</p>
                </div>
                <div className="method-actions">
                  <a 
                    href={method.action}
                    target={method.id !== 'email' ? "_blank" : undefined}
                    rel={method.id !== 'email' ? "noopener noreferrer" : undefined}
                    className="method-btn primary"
                  >
                    {method.id === 'email' ? 'Send Email' : method.id === 'discord' ? 'Message' : 'View Profile'}
                  </a>
                  {method.id === 'email' && (
                    <button 
                      className="method-btn secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(method.value);
                      }}
                    >
                      {activeMethod === 'copied' ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-form-section">
          <h3>Send a Message</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Project collaboration inquiry"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project..."
                rows="5"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'loading' : ''} ${submitStatus === 'success' ? 'success' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="spinner"></span>
              ) : submitStatus === 'success' ? (
                <>
                  <Icons.Check /> Message Sent!
                </>
              ) : (
                <>
                  <Icons.Send /> Send Message
                </>
              )}
            </button>
          </form>

          <div className="response-time">
            <span>⏱️</span>
            <span>{availability.responseTime}</span>
          </div>
        </div>
      </div>

      <div className="contact-faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>What services do you offer?</h4>
            <p>Discord bot development, web applications, backend systems, and technical consulting.</p>
          </div>
          <div className="faq-item">
            <h4>What is your typical project timeline?</h4>
            <p>Simple bots: 1-2 weeks. Complex systems: 4-8 weeks. Rush projects available.</p>
          </div>
          <div className="faq-item">
            <h4>Do you work with international clients?</h4>
            <p>Yes! I work remotely with clients worldwide. My timezone is GMT+7.</p>
          </div>
          <div className="faq-item">
            <h4>What technologies do you specialize in?</h4>
            <p>Node.js, Discord.js, React, MongoDB, Python, and cloud deployment.</p>
          </div>
        </div>
      </div>

      <style>{`
        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-header h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .contact-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          margin-left: auto;
          margin-right: auto;
          max-width: 600px; /* Ensure generic max-width is respected/overridden if needed */
        }

        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: var(--bg-subtle);
          border: 1px solid var(--glass-border);
          font-size: 0.9rem;
          border-radius: 6px;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent-primary);
          animation: pulse 2s infinite;
        }

        .status-dot.busy {
          background: #ff6b6b;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .status-text {
          color: var(--accent-primary);
          font-weight: 600;
        }

        .timezone {
          color: var(--text-muted);
          font-size: 0.8rem;
          border-left: 1px solid var(--glass-border);
          padding-left: 0.75rem;
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .contact-methods h3,
        .contact-form-section h3 {
          font-size: 1.5rem;
          color: var(--text-header);
          margin-bottom: 1.5rem;
        }

        .methods-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .contact-method-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          transition: all 0.3s;
          cursor: pointer;
        }

        .contact-method-card:hover,
        .contact-method-card.active {
          border-color: var(--accent-primary);
          background: var(--bg-subtle);
          transform: translateX(5px);
        }

        .method-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-subtle);
          border: 1px solid var(--glass-border);
          color: var(--accent-primary);
          font-size: 1.5rem;
          flex-shrink: 0;
          border-radius: 8px;
        }

        .method-info {
          flex-grow: 1;
        }

        .method-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.25rem;
        }

        .method-header h4 {
          color: var(--text-header);
          font-size: 1.1rem;
          margin: 0;
        }

        .method-badge {
          padding: 0.2rem 0.6rem;
          background: var(--bg-subtle);
          color: var(--accent-primary);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-radius: 4px;
        }

        .method-value {
          color: var(--accent-primary);
          font-family: var(--font-mono);
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .method-description {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin: 0;
        }

        .method-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .method-btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          font-family: var(--font-main);
          border-radius: 4px;
        }

        .method-btn.primary {
          background: var(--accent-primary);
          color: white;
          font-weight: 600;
        }

        .method-btn.primary:hover {
          background: var(--accent-secondary);
        }

        .method-btn.secondary {
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
        }

        .method-btn.secondary:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .contact-form-section {
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          padding: 2rem;
          border-radius: 8px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          color: var(--text-main);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.875rem 1rem;
          background: var(--bg-subtle);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          font-family: var(--font-main);
          font-size: 0.95rem;
          transition: all 0.2s;
          border-radius: 6px;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
          background: var(--bg-core);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--text-muted);
          opacity: 0.6;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--accent-primary);
          color: white;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 0.5rem;
          border-radius: 6px;
        }

        .submit-btn:hover:not(:disabled) {
          background: var(--accent-secondary);
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.success {
          background: #22c55e;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .response-time {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .contact-faq {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid var(--glass-border);
        }

        .contact-faq h3 {
          text-align: center;
          font-size: 1.5rem;
          color: var(--text-header);
          margin-bottom: 2rem;
        }

        .faq-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .faq-item {
          padding: 1.5rem;
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          transition: all 0.3s;
        }

        .faq-item:hover {
          border-color: var(--accent-primary);
          transform: translateY(-3px);
        }

        .faq-item h4 {
          color: var(--accent-primary);
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }

        .faq-item p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-method-card {
            flex-direction: column;
            text-align: center;
          }

          .method-actions {
            flex-direction: row;
            justify-content: center;
            width: 100%;
          }

          .method-header {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
