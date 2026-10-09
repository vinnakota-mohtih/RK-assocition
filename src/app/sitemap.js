import { ALL_PLANS } from '../data/plans';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rkassociatesinsurance.com';

  const staticRoutes = [
    '',
    '/plans',
    '/compare',
    '/quote',
    '/claims',
    '/hospital-locator',
    '/excluded-hospitals',
    '/renew',
    '/downloads',
    '/about',
    '/contact',
    '/legal/disclaimer'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/plans' || route === '/quote' ? 0.9 : 0.8
  }));

  const planRoutes = (ALL_PLANS || []).map(plan => ({
    url: `${baseUrl}/plans/${plan.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  return [...staticRoutes, ...planRoutes];
}
