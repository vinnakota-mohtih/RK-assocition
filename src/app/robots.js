export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rkassociatesinsurance.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/leads/export']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
