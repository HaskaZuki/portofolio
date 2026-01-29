import React from "react";
import { Link } from "react-router-dom"; 
import * as Icons from "./Icons"; 

// DocsFooter: Only handles Previous/Next navigation
const DocsFooter = ({ prev, next }) => {
  if (!prev && !next) return null;
  
  return (
    <div className="docs-footer-container fade-in" style={{ marginTop: "3rem", paddingTop: "0", borderTop: "none" }}>
      <div className="docs-navigation">
        {prev && (
          <Link to={prev.link} className="nav-card prev">
            <span className="nav-label"><Icons.ChevronLeft /> Previous</span>
            <span className="nav-title">{prev.title}</span>
          </Link>
        )}

        {next && (
          <Link to={next.link} className="nav-card next">
            <span className="nav-label">Next <Icons.ChevronRight /></span>
            <span className="nav-title">{next.title}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
export default DocsFooter;