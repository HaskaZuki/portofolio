import React from "react";
import * as Icons from "../components/Icons";
import DocsFooter from "../components/DocsFooter";

const DocsMulti = () => (
  <div className="page-wrapper fade-in">
    <header className="page-header">
      <h1>Docs: MultipurposeBot</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "var(--text-muted)" }}>
        A complete, easy-to-use Discord bot template built with discord.js v14.
      </p>
    </header>

    
    <div className="bio-clean-container">
      <h3 style={{ marginBottom: "1.2rem", color: "var(--accent-primary)", fontSize: "1.4rem" }}>✨ Features</h3>
      <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "1rem", lineHeight: "1.8" }}>
        Designed for beginners and advanced users. Features a <strong>modular handler</strong>, <strong>slash commands</strong>, and built-in systems like Music (DisTube), Moderation, and Fun.
      </p>
      <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1rem" }}>
        <li><strong>Modular Handler:</strong> Easy to maintain and expand.</li>
        <li><strong>Music System:</strong> High-quality playback using DisTube.</li>
        <li><strong>Admin Tools:</strong> Reaction Roles, Custom Welcome/Leave.</li>
        <li><strong>No Database Required:</strong> Uses simple JSON files out of the box.</li>
      </ul>
    </div>

    
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-secondary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}>🚀 Installation & Setup</h2>
      
      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>1. Clone & Install</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p style={{ color: "#a5d6ff" }}>git clone https://github.com/yourusername/SimpleMultipurposeBot.git</p>
        <p style={{ color: "#a5d6ff" }}>cd SimpleMultipurposeBot</p>
        <p style={{ color: "#7ee787" }}>npm install</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>2. Configuration</h4>
      <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
        Rename <code>.env.example</code> to <code>.env</code> and fill in your details:
      </p>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", borderLeft: "4px solid #ffbd2e", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p>TOKEN=your_super_secret_token_here</p>
        <p>CLIENT_ID=your_bot_client_id_here</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>3. Start</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
        <p style={{ color: "#a5d6ff" }}>npm run dev <span style={{color: "#555"}}># Auto-restart mode</span></p>
      </div>
    </div>

    
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-secondary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}>📖 Usage Guide: Admin Features</h2>
      
      <div style={{ marginBottom: "2.5rem" }}>
        <h4 style={{ color: "#ffbd2e", marginBottom: "0.8rem", fontSize: "1.2rem" }}>🎭 Reaction Roles</h4>
        <ol style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "0.8rem" }}>
          <li>Ensure bot role is ABOVE the target role.</li>
          <li>Run command:</li>
        </ol>
        <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.2rem", borderRadius: "8px", fontSize: "0.95rem", fontFamily: "var(--font-mono)", color: "#a5d6ff" }}>
          /reactionrole role:@RoleName emoji:🎉 description:Click to get role!
        </div>
      </div>

      <div>
        <h4 style={{ color: "#79c0ff", marginBottom: "0.8rem", fontSize: "1.2rem" }}>👋 Welcome & Leave Messages</h4>
        <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "1fr" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <strong style={{ color: "#fff", display: "block", marginBottom: "0.8rem" }}>Welcome Config:</strong>
            <ul style={{ listStyle: "none", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "2", fontFamily: "var(--font-mono)" }}>
              <li>/setwelcome channel channel:#general</li>
              <li>/setwelcome message text:Welcome &#123;user&#125; to &#123;server&#125;!</li>
              <li>/setwelcome dm enabled:true</li>
            </ul>
          </div>
          <div style={{ background: "rgba(255,255,255,0.03)", padding: "1.5rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <strong style={{ color: "#fff", display: "block", marginBottom: "0.8rem" }}>Leave Config:</strong>
            <ul style={{ listStyle: "none", fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: "2", fontFamily: "var(--font-mono)" }}>
              <li>/setleave channel channel:#general</li>
              <li>/setleave message text:Goodbye &#123;user&#125;!</li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: "1.2rem", fontSize: "1rem", color: "var(--text-muted)" }}>
          <strong>Variables:</strong> <code>&#123;user&#125;</code>, <code>&#123;server&#125;</code>, <code>&#123;count&#125;</code>.
        </p>
      </div>
    </div>

    
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "#ff5f56", marginBottom: "1.5rem", fontSize: "1.5rem" }}>🧑‍💻 Adding New Commands</h2>
      <ol style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "1rem", lineHeight: "1.8", marginBottom: "1.2rem" }}>
        <li>Go to <code>src/commands</code> and create a category folder.</li>
        <li>Create a <code>.js</code> file (e.g., <code>ping.js</code>).</li>
        <li>Use this template:</li>
      </ol>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: "1.6" }}>
        <p><span style={{color: "#ff79c6"}}>const</span> &#123; SlashCommandBuilder &#125; = <span style={{color: "#8be9fd"}}>require</span>('discord.js');</p>
        <br/>
        <p><span style={{color: "#ff79c6"}}>module.exports</span> = &#123;</p>
        <p>&nbsp;&nbsp;data: <span style={{color: "#ff79c6"}}>new</span> SlashCommandBuilder()</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;.setName(<span style={{color: "#f1fa8c"}}>'commandname'</span>)</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;.setDescription(<span style={{color: "#f1fa8c"}}>'Description'</span>),</p>
        <p>&nbsp;&nbsp;<span style={{color: "#ff79c6"}}>async</span> execute(interaction, client) &#123;</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#ff79c6"}}>await</span> interaction.reply(<span style={{color: "#f1fa8c"}}>'Hello World!'</span>);</p>
        <p>&nbsp;&nbsp;&#125;</p>
        <p>&#125;;</p>
      </div>
    </div>

   
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-primary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}><Icons.Stack /> Switching to MongoDB</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1rem", lineHeight: "1.6" }}>
        Currently uses JSON files in <code>/data</code>. For larger bots, migrate to MongoDB to prevent corruption.
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
          <strong style={{ color: "#fff", fontSize: "1.1rem", display: "block", marginBottom: "0.8rem" }}>1. Install & Connect</strong>
          <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.2rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
            <span style={{color: "#7ee787"}}>npm install mongoose</span><br/><br/>
            <span style={{color: "#555"}}>// In src/index.js (before login)</span><br/>
            <span style={{color: "#ff79c6"}}>const</span> mongoose = <span style={{color: "#8be9fd"}}>require</span>('mongoose');<br/>
            mongoose.connect(process.env.MONGO_URI)...
          </div>
        </div>
        <div>
          <strong style={{ color: "#fff", fontSize: "1.1rem", display: "block", marginBottom: "0.8rem" }}>2. Create Schemas & Update Commands</strong>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
            Create models in <code>src/models</code> and replace `fs` calls with Mongoose methods like <code>Giveaway.create()</code>.
          </p>
        </div>
      </div>
    </div>

 
    <div className="doc-section glass-panel" style={{ padding: "2.5rem" }}>
      <h2 style={{ color: "#79c0ff", marginBottom: "1.5rem", fontSize: "1.5rem" }}>📂 Project Structure</h2>
      <div className="code-block" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
        <div>SimpleMultipurposeBot/</div>
        <div style={{ paddingLeft: "1.5rem" }}>├── <strong>data/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># JSON storage files</span></div>
        <div style={{ paddingLeft: "1.5rem" }}>├── <strong>src/</strong></div>
        <div style={{ paddingLeft: "3rem" }}>├── <strong>commands/</strong> &nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># Slash commands sorted by category</span></div>
        <div style={{ paddingLeft: "3rem" }}>├── <strong>events/</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># Event handlers (ready, interactionCreate)</span></div>
        <div style={{ paddingLeft: "3rem" }}>├── <strong>handlers/</strong> &nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># Logic for loading commands</span></div>
        <div style={{ paddingLeft: "3rem" }}>└── <strong>index.js</strong> &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># Main entry point</span></div>
        <div style={{ paddingLeft: "1.5rem" }}>├── <strong>.env</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># Secrets (Token, ID)</span></div>
        <div style={{ paddingLeft: "1.5rem" }}>└── <strong>config.js</strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "#555"}}># General config</span></div>
        <div style={{ paddingLeft: "1.5rem" }}>└── <strong>package.json</strong> &nbsp;&nbsp;<span style={{color: "#555"}}># Dependencies</span></div>
      </div>
    </div>

    <DocsFooter prev={{ title: "Template Bot", link: "/docs/template" }} />
  </div>
);

export default DocsMulti;