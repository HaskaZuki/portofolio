import React from "react";
import * as Icons from "../components/Icons";
import DocsFooter from "../components/DocsFooter";

const DocsTemplate = () => (
  <div className="page-wrapper fade-in">
    <header className="page-header">
      <h1>Docs: TemplateBot</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "var(--text-muted)" }}>
        A clean, modern starting point for your next Discord bot. Lightweight, scalable, and bloat-free.
      </p>
    </header>

    
    <div className="bio-clean-container">
      <h3 style={{ marginBottom: "1.2rem", color: "var(--accent-primary)", fontSize: "1.4rem" }}>📦 What's Inside?</h3>
      <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "1rem", lineHeight: "1.8" }}>
        We keep it simple. Here are the core packages driving this bot:
      </p>
      <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1rem" }}>
        <li><strong>discord.js (v14):</strong> The main library for interacting with the Discord API.</li>
        <li><strong>dotenv:</strong> Keeps your secrets (like tokens) safe and out of your code.</li>
        <li><strong>nodemon (Dev):</strong> Automatically restarts your bot whenever you save a file.</li>
      </ul>
    </div>

    
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-secondary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}>⚡ How to Get Started</h2>
      
      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>1. Grab the Code</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p style={{ color: "#a5d6ff" }}>git clone https://github.com/HaskaZuki/TemplateBot.git</p>
        <p style={{ color: "#a5d6ff" }}>cd TemplateBot</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>2. Install Dependencies</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", fontSize: "0.95rem" }}>
        <p style={{ color: "#7ee787" }}>npm install</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>3. Set Your Secrets</h4>
      <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
        Rename <code>.env.example</code> to <code>.env</code> and fill in:
      </p>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", borderLeft: "4px solid #ffbd2e", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p>DISCORD_TOKEN=your_token_goes_here</p>
        <p>CLIENT_ID=your_client_id_goes_here</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>4. Register & Launch 🚀</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p style={{ color: "#79c0ff" }}>npm run deploy <span style={{color: "#555"}}># Register Slash Commands</span></p>
        <p style={{ color: "#7ee787" }}>npm start <span style={{color: "#555"}}># Launch Bot</span></p>
        <p style={{ color: "#a5d6ff" }}>npm run dev <span style={{color: "#555"}}># Auto-restart mode</span></p>
      </div>
    </div>

    
    <div className="doc-section glass-panel" style={{ padding: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-primary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}>📂 Where things live</h2>
      <ul style={{ listStyle: "none", color: "var(--text-muted)", fontSize: "1rem", lineHeight: "2.2", fontFamily: "var(--font-mono)" }}>
        <li><strong style={{ color: "#79c0ff" }}>commands/</strong> &rarr; Drop new command files here. Subfolders supported.</li>
        <li><strong style={{ color: "#79c0ff" }}>events/</strong> &rarr; Listen for `ready` or `interactionCreate` here.</li>
        <li><strong style={{ color: "#79c0ff" }}>index.js</strong> &rarr; The entry point. Handles dynamic loading magic.</li>
      </ul>
    </div>

    <DocsFooter 
      prev={{ title: "Invite Manager", link: "/docs/invite" }}
      next={{ title: "Multipurpose Bot", link: "/docs/multipurpose" }}
    />
  </div>
);
export default DocsTemplate;