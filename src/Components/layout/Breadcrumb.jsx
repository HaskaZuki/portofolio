import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  const getBreadcrumbs = (path) => {
    const parts = path.split("/").filter(Boolean);
    const breadcrumbs = [{ label: "Home", path: "/" }];
    
    if (parts.length === 0) return breadcrumbs;
    
    let currentPath = "";
    parts.forEach((part, index) => {
      currentPath += `/${part}`;
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      
      if (part === "docs") label = "Docs";
      if (part === "invite") label = "InviteManager";
      if (part === "template") label = "TemplateBot";
      if (part === "multipurpose") label = "MultipurposeBot";
      
      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === parts.length - 1
      });
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(location.pathname);

  if (location.pathname === '/') return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <span className="breadcrumb-separator" style={{ margin: '0 0.5rem', opacity: 0.5 }}>/</span>
          )}
          {crumb.isLast ? (
            <span className="breadcrumb-item active" style={{ color: 'var(--text-header)', fontWeight: 500 }}>{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="breadcrumb-item" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} 
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
              {crumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
