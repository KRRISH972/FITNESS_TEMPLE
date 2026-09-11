import { useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  bodyClass?: string;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export function useSEO(data: SEOData) {
  useEffect(() => {
    // Update title
    document.title = data.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', data.description);
    }

    // Update meta keywords
    if (data.keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', data.keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', data.keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Update canonical URL
    if (data.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', data.canonical);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', data.canonical);
        document.head.appendChild(canonicalLink);
      }
    }

    // Update meta robots
    if (data.robots) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute('content', data.robots);
      } else {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        metaRobots.setAttribute('content', data.robots);
        document.head.appendChild(metaRobots);
      }
    }

    // Update Open Graph tags
    const ogTitle = data.ogTitle || data.title;
    const ogDescription = data.ogDescription || data.description;
    const ogImage = data.ogImage || '/og-image.png';

    const updateOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateOgTag('og:title', ogTitle);
    updateOgTag('og:description', ogDescription);
    updateOgTag('og:image', ogImage);
    if (data.canonical) {
      updateOgTag('og:url', data.canonical);
    }

    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    updateTwitterTag('twitter:title', ogTitle);
    updateTwitterTag('twitter:description', ogDescription);
    updateTwitterTag('twitter:image', ogImage);

    // Update JSON-LD BreadcrumbList structured data
    const breadcrumbScript = document.querySelector('script[data-seo="breadcrumbs"]');
    if (data.breadcrumbs && data.breadcrumbs.length > 0) {
      const urlBase = data.canonical ? new URL(data.canonical).origin : window.location.origin;
      const items = data.breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: `${urlBase}${crumb.path}`,
      }));

      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      };

      let script = document.querySelector('script[data-seo="breadcrumbs"]') as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'breadcrumbs');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    } else if (breadcrumbScript) {
      breadcrumbScript.textContent = '';
    }
  }, [data.title, data.description, data.keywords, data.canonical, data.breadcrumbs]);
}