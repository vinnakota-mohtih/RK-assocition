import { NextResponse } from 'next/server';

// In-memory leads storage
export let leadsStore = [];
const rateLimitMap = new Map();

// Helper to sanitize text
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>'"&]/g, '').trim();
}

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local';
    const now = Date.now();

    // Basic Rate Limiting: Max 5 submissions per 60 seconds per IP
    const recentRequests = (rateLimitMap.get(ip) || []).filter(t => now - t < 60000);
    if (recentRequests.length >= 5) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    const body = await request.json();
    const name = body.name || body.fullName || '';
    const mobile = body.mobile || body.mobileNumber || '';
    const countryCode = body.countryCode || '+91';
    const members = body.members || [];
    const planInterest = body.planInterest || 'Care Supreme';
    const sumInsured = body.sumInsured;
    const consent = body.consent !== undefined ? body.consent : body.hasConsent;
    const source = body.source || 'quote-form';

    // Validation
    const cleanMobile = String(mobile || '').replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10 || !/^[6-9]\d{9}$/.test(cleanMobile)) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Explicit consent is required to receive insurance quotes and advisory assistance.' },
        { status: 400 }
      );
    }

    const leadId = `LEAD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newLead = {
      id: leadId,
      name: sanitize(name) || 'Prospective Policyholder',
      mobile: `${countryCode} ${cleanMobile}`,
      members: members.map(m => ({ relation: sanitize(m.relation), age: Number(m.age) })),
      planInterest: sanitize(planInterest),
      sumInsured: sanitize(String(sumInsured || '')),
      consent: Boolean(consent),
      source: sanitize(source),
      createdAt: new Date().toISOString()
    };

    leadsStore.unshift(newLead);

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Your inquiry has been successfully captured. Our insurance advisor will connect with you shortly.',
      lead: newLead
    });
  } catch (err) {
    console.error('Lead submission error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing lead.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    totalLeads: leadsStore.length,
    leads: leadsStore
  });
}
