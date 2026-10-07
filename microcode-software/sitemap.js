const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
const hostname = 'https://www.microcodesoftware.com';

const links = [
  { url: '/', changefreq: 'daily', priority: 1 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/application-development', changefreq: 'monthly', priority: 0.8 },
  { url: '/social-media-marketing', changefreq: 'monthly', priority: 0.8 },
  { url: '/shopify-development', changefreq: 'monthly', priority: 0.8 },
  { url: '/software-development', changefreq: 'monthly', priority: 0.8 },
  { url: '/performance-marketing', changefreq: 'monthly', priority: 0.8 },
  { url: '/website-development', changefreq: 'monthly', priority: 0.8 },
  { url: '/seo-services', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog', changefreq: 'monthly', priority: 0.8 },
  { url: '/how-ai-is-revolutionizing-digital-marketing-trends-and-predictions', changefreq: 'monthly', priority: 0.8 },
  { url: '/the-future-of-digital-interaction-and-business', changefreq: 'monthly', priority: 0.8 },
];

(async () => {
  const sitemapStream = new SitemapStream({ hostname });
  const writeStream = createWriteStream(sitemapPath);

  sitemapStream.pipe(writeStream);
  links.forEach(link => sitemapStream.write(link));
  sitemapStream.end();

  await streamToPromise(sitemapStream);
  console.log(`✅ Sitemap successfully written to: ${sitemapPath}`);
})();
