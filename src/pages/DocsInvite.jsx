import React from "react";
import * as Icons from "../components/Icons";
import DocsFooter from "../components/DocsFooter";

const DocsInvite = () => (
  <div className="page-wrapper fade-in">
    <header className="page-header">
      <h1>Docs: InviteManagerV1</h1>
      <p style={{ fontSize: "1.1rem", lineHeight: "1.6", color: "var(--text-muted)" }}>
        A complete and modular Discord bot focused on Invite Tracking and Giveaways, built with Discord.js v14 and Quick.db.
      </p>
    </header>

    {/* OVERVIEW */}
    <div className="bio-clean-container">
      <h3 style={{ marginBottom: "1.2rem", color: "var(--accent-primary)", fontSize: "1.4rem" }}>✨ Key Features</h3>
      
      <div style={{ display: "grid", gap: "1.5rem" }}>
        <div>
          <h4 style={{ color: "#79c0ff", marginBottom: "0.5rem", fontSize: "1.1rem" }}>📊 Invite Tracking System</h4>
          <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1rem" }}>
            <li><strong>Real-time Tracking:</strong> Accurately detects who invites new members.</li>
            <li><strong>Invite Types:</strong> Distinguishes Regular, Fake (accounts &lt; 3 days), Bonus, and Leaves.</li>
            <li><strong>Leaderboard:</strong> Displays the top inviters in the server.</li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: "#ffbd2e", marginBottom: "0.5rem", fontSize: "1.1rem" }}>🎉 Giveaway System</h4>
          <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1rem" }}>
            <li><strong>Requirements:</strong> Set minimum invites to join.</li>
            <li><strong>Auto-Unreact:</strong> Removes unqualified users automatically.</li>
            <li><strong>Commands:</strong> Start, End, Reroll.</li>
          </ul>
        </div>

         <div>
          <h4 style={{ color: "#27c93f", marginBottom: "0.5rem", fontSize: "1.1rem" }}>👋 Welcome & Leave System</h4>
           <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-muted)", lineHeight: "1.8", fontSize: "1rem" }}>
            <li><strong>Custom Messages:</strong> Configure with variables like <code>&#123;user&#125;</code> and <code>&#123;inviter&#125;</code>.</li>
            <li><strong>Auto-Roles:</strong> Assign roles on invite milestones (e.g. 5 Invites -{">"} @Silver).</li>
          </ul>
        </div>
      </div>
    </div>

    {/* COMMANDS LIST */}
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-secondary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}><Icons.Stack /> Commands List</h2>

      {/* General */}
      <h4 style={{ color: "#27c93f", marginBottom: "0.8rem", fontSize: "1.2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>🟢 General</h4>
      <div className="table-responsive">
        <table className="command-table">
          <thead>
            <tr>
              <th className="col-command">Command</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="col-command">/help</td><td>Shows the help menu and command list.</td></tr>
            <tr><td className="col-command">/ping</td><td>Checks bot latency.</td></tr>
            <tr><td className="col-command">/stats</td><td>Shows bot statistics (Uptime, Memory).</td></tr>
          </tbody>
        </table>
      </div>

      {/* Invites */}
      <h4 style={{ color: "#79c0ff", marginBottom: "0.8rem", fontSize: "1.2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>📨 Invites</h4>
      <table className="command-table">
        <tbody>
           <tr><td className="col-command">/invites [user]</td><td>Check invite statistics for yourself or others.</td></tr>
           <tr><td className="col-command">/leaderboard</td><td>Displays the Top 10 inviters in the server.</td></tr>
        </tbody>
      </table>

      {/* Giveaway */}
      <h4 style={{ color: "#ffbd2e", marginBottom: "0.8rem", fontSize: "1.2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>🎁 Giveaway</h4>
      <table className="command-table">
        <tbody>
           <tr><td className="col-command">/giveaway-start</td><td>Start a giveaway (Input: Prize, Duration, Winners, Req).</td></tr>
           <tr><td className="col-command">/giveaway-end</td><td>Manually end a giveaway (Input: Message ID).</td></tr>
           <tr><td className="col-command">/giveaway-reroll</td><td>Reroll a giveaway winner (Input: Message ID).</td></tr>
        </tbody>
      </table>

      {/* Admin */}
      <h4 style={{ color: "#ff5f56", marginBottom: "0.8rem", fontSize: "1.2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem" }}>🛡️ Admin & Config</h4>
      <table className="command-table">
        <tbody>
           <tr><td className="col-command">/add-invite</td><td>Add bonus invites to a user.</td></tr>
           <tr><td className="col-command">/remove-invite</td><td>Remove bonus invites from a user.</td></tr>
           <tr><td className="col-command">/set-welcome</td><td>Set the welcome channel and message.</td></tr>
           <tr><td className="col-command">/config-roles</td><td>Add auto-role rewards (e.g. 5 inv -&gt; @Role).</td></tr>
        </tbody>
      </table>
    </div>

    {/* INSTALLATION */}
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-secondary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}>🚀 Installation & Setup</h2>
      
      <div style={{ background: "rgba(255, 87, 87, 0.1)", borderLeft: "4px solid #ff5f56", padding: "1.5rem", marginBottom: "2rem", borderRadius: "0 8px 8px 0" }}>
        <h4 style={{ color: "#ff5f56", margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>⚠️ Prerequisites (Windows Users)</h4>
        <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.8rem", lineHeight: "1.6" }}>
          Since this bot uses <code>quick.db</code> / <code>better-sqlite3</code>, you <strong>MUST</strong> install build tools first. Run this in PowerShell as Administrator:
        </p>
        <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "6px", fontFamily: "var(--font-mono)", color: "#a5d6ff", fontSize: "0.95rem" }}>
          npm install --global --production windows-build-tools
        </div>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>1. Clone Repository</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p style={{ color: "#a5d6ff" }}>git clone https://github.com/HaskaZuki/InviteManagerV1.git</p>
        <p style={{ color: "#a5d6ff" }}>cd InviteManagerV1</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>2. Install Dependencies</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", fontSize: "0.95rem" }}>
        <p style={{ color: "#7ee787" }}>npm install</p>
      </div>

      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>3. Configure Environment</h4>
      <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
        Create a <code>.env</code> file (or rename <code>.env.example</code>) and fill in:
      </p>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", marginBottom: "2rem", borderLeft: "4px solid #ffbd2e", fontSize: "0.95rem", lineHeight: "1.6" }}>
        <p>TOKEN=OTk5... <span style={{color:"#555"}}>(Your Bot Token)</span></p>
        <p>CLIENT_ID=123456789... <span style={{color:"#555"}}>(Bot App ID)</span></p>
        <p>GUILD_ID=123456789... <span style={{color:"#555"}}>(Optional Testing Guild)</span></p>
      </div>
      
      <h4 style={{ marginBottom: "0.8rem", color: "var(--text-main)", fontSize: "1.2rem" }}>4. Start the Bot</h4>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.95rem" }}>
        <p style={{ color: "#7ee787" }}>npm start</p>
      </div>
    </div>

    {/* SCALING */}
    <div className="doc-section glass-panel" style={{ padding: "2.5rem", marginBottom: "2.5rem" }}>
      <h2 style={{ color: "var(--accent-primary)", marginBottom: "1.5rem", fontSize: "1.5rem" }}>📈 Scaling to Production (Sharding)</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", fontSize: "1rem", lineHeight: "1.6" }}>
        If your bot grows over <strong>2,500 guilds</strong>, you will need to use Discord Sharding to split the connection into multiple processes.
      </p>
      
      <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginBottom: "0.8rem" }}>
        Create a file named <code>sharder.js</code> in the root folder:
      </p>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1.5rem", borderRadius: "8px", fontFamily: "var(--font-mono)", fontSize: "0.9rem", lineHeight: "1.6", overflowX: "auto" }}>
        <p><span style={{color: "#ff79c6"}}>const</span> &#123; ShardingManager &#125; = <span style={{color: "#8be9fd"}}>require</span>('discord.js');</p>
        <p><span style={{color: "#ff79c6"}}>const</span> config = <span style={{color: "#8be9fd"}}>require</span>('./src/config');</p>
        <br/>
        <p><span style={{color: "#ff79c6"}}>const</span> manager = <span style={{color: "#ff79c6"}}>new</span> ShardingManager('./src/index.js', &#123;</p>
        <p>&nbsp;&nbsp;token: config.token,</p>
        <p>&nbsp;&nbsp;totalShards: <span style={{color: "#f1fa8c"}}>'auto'</span>,</p>
        <p>&nbsp;&nbsp;respawn: <span style={{color: "#ff79c6"}}>true</span></p>
        <p>&#125;);</p>
        <br/>
        <p>manager.on(<span style={{color: "#f1fa8c"}}>'shardCreate'</span>, shard =&gt; console.log(`Launched shard <span style={{color: "#bd93f9"}}>$&#123;shard.id&#125;</span>`));</p>
        <p>manager.spawn();</p>
      </div>
      
      <p style={{ marginTop: "1.5rem", fontSize: "1rem", color: "var(--text-muted)" }}>
        Then, run this instead of the usual start command:
      </p>
      <div className="code-block" style={{ background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "6px", fontFamily: "var(--font-mono)", marginTop: "0.5rem", fontSize: "0.95rem", color: "#a5d6ff" }}>
        node sharder.js
      </div>
    </div>

    {/* TROUBLESHOOTING - Removed (Covered by Global Footer) */}

    <DocsFooter next={{ title: "Template Bot", link: "/docs/template" }} />
  </div>
);
export default DocsInvite;