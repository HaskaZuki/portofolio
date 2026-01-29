import React from "react";

const About = () => {
  const stacks = [
    { category: "Language Core", items: ["Python", "JavaScript", "Luau", "SQL"] },
    { category: "Backend Systems", items: ["Node.js", "Discord.js", "MongoDB", "Redis"] },
    { category: "DevOps & Tools", items: ["Git", "Docker", "AWS", "VS Code"] },
  ];

  return (
    <div className="page-wrapper fade-in">
      <header className="page-header">
        <h1>About & Architecture</h1>
        <p>The logic behind the systems.</p>
      </header>

      <div className="about-grid">
        
        <div className="about-card glass-card bio-section">
          <h3>The Engineering Mindset</h3>
          <p>
            I bridge the gap between <strong>functional engineering</strong> and <strong>digital innovation</strong>. 
            With a rigorous background in Mechanical Engineering, I bring a structured, 
            analytical approach to software development.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Whether it's optimizing a Discord bot's latency or scripting complex game mechanics in Roblox, 
            <strong> logic is my core driver</strong>.
          </p>
        </div>

        
        {stacks.map((stack, index) => (
          <div key={index} className="about-card glass-card">
            <h3>{stack.category}</h3>
            <div className="tags-container">
              {stack.items.map((item, idx) => (
                <span key={idx} className="tech-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .bio-section {
          grid-column: 1 / -1; /* Full width for bio */
          text-align: left;
        }
        .about-card {
           display: flex; flex-direction: column;
        }
        .about-card h3 {
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .about-card p {
          color: var(--text-muted);
          line-height: 1.8;
        }
        .tags-container {
          display: flex; flex-wrap: wrap; gap: 0.8rem;
        }
        .tech-tag {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          padding: 0.4rem 0.8rem;
          font-size: 0.85rem;
          color: var(--text-main);
          transition: all 0.2s;
        }
        .tech-tag:hover {
          border-color: var(--accent-secondary);
          color: var(--accent-secondary);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default About;