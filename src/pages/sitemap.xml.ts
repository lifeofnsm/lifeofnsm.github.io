// Generates /sitemap.xml (same URL as before, so Google Search Console keeps working).
// Add new pages to this list when you create them.
import type { APIRoute } from 'astro';
import { site } from '../data/site';

const pages: { path: string; changefreq: string; priority: string }[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/tools.html', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact.html', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy-policy.html', changefreq: 'yearly', priority: '0.4' },
  { path: '/terms-of-use.html', changefreq: 'yearly', priority: '0.4' },
  { path: '/refund-policy.html', changefreq: 'yearly', priority: '0.4' },
];

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10); // build date
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url>\n    <loc>${site.url}${p.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
