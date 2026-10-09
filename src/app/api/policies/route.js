import { NextResponse } from 'next/server';
import { ALL_PLANS, PLAN_CATEGORIES } from '@/data/plans';
import { SITE_CONFIG } from '@/data/config';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  let plans = ALL_PLANS;
  if (category && category !== 'all') {
    plans = plans.filter(p => p.category === category);
  }

  return NextResponse.json({
    categories: PLAN_CATEGORIES,
    plans,
    stats: SITE_CONFIG.headlineStats
  });
}
