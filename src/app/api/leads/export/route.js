import { NextResponse } from 'next/server';
import { leadsStore } from '../route';

export async function GET() {
  const headers = ['Lead ID', 'Name', 'Mobile', 'Members Count', 'Members Details', 'Plan Interest', 'Sum Insured', 'Consent Given', 'Source', 'Created At'];
  
  const rows = leadsStore.map(l => [
    `"${l.id}"`,
    `"${l.name}"`,
    `"${l.mobile}"`,
    `"${l.members ? l.members.length : 0}"`,
    `"${(l.members || []).map(m => `${m.relation} (${m.age}y)`).join('; ')}"`,
    `"${l.planInterest}"`,
    `"${l.sumInsured}"`,
    `"${l.consent ? 'YES' : 'NO'}"`,
    `"${l.source}"`,
    `"${l.createdAt}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads_export_${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}
