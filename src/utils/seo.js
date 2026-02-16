export const updateMetaTags = ({ 
  title, 
  description, 
  image, 
  url,
  type = 'website',
  keywords = ''
}) => {
  if (title) {
    document.title = title;
  }
  
  const setMetaTag = (property, content) => {
    if (!content) return;
    
    let tag = document.querySelector(`meta[property="${property}"]`) || 
              document.querySelector(`meta[name="${property}"]`);
    
    if (!tag) {
      tag = document.createElement('meta');
      if (property.startsWith('og:') || property.startsWith('twitter:')) {
        tag.setAttribute('property', property);
      } else {
        tag.setAttribute('name', property);
      }
      document.head.appendChild(tag);
    }
    
    tag.setAttribute('content', content);
  };
  
  setMetaTag('description', description);
  if (keywords) setMetaTag('keywords', keywords);
  
  setMetaTag('og:title', title);
  setMetaTag('og:description', description);
  setMetaTag('og:type', type);
  if (url) setMetaTag('og:url', url);
  if (image) setMetaTag('og:image', image);
  
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', title);
  setMetaTag('twitter:description', description);
  if (image) setMetaTag('twitter:image', image);
  
  if (url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }
};

export const generateBreadcrumbSchema = (breadcrumbs) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': crumb.url,
    })),
  };
  
  let scriptTag = document.querySelector('script[type="application/ld+json"]#breadcrumb-schema');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.id = 'breadcrumb-schema';
    document.head.appendChild(scriptTag);
  }
  
  scriptTag.textContent = JSON.stringify(schema);
};

export const defaultMetadata = {
  title: 'Haska | Full Stack Developer & Discord Bot Engineer',
  description: 'Professional portfolio of Haska - Full Stack Developer specializing in Discord bots, React applications, and backend systems.',
  image: 'https://haskazuki.github.io/portfolio/og-image.png',
  baseUrl: 'https://haskazuki.github.io/portfolio/',
};

export default {
  updateMetaTags,
  generateBreadcrumbSchema,
  defaultMetadata,
};
