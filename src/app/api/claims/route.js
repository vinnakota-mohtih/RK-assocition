import { NextResponse } from 'next/server';
import { INITIAL_CLAIMS } from '@/data/sampleClaims';

// In-memory claims repository so newly submitted claims persist in the running server
let claimsStore = [...INITIAL_CLAIMS];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || searchParams.get('id') || '';

  if (!query.trim()) {
    return NextResponse.json({
      claims: claimsStore
    });
  }

  const cleanQ = query.trim().toUpperCase();
  const matched = claimsStore.filter(
    c => c.claimId.toUpperCase().includes(cleanQ) || c.policyNumber.toUpperCase().includes(cleanQ)
  );

  return NextResponse.json({
    found: matched.length > 0,
    count: matched.length,
    results: matched
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      policyNumber,
      policyHolder,
      category = 'health',
      incidentDate,
      claimedAmount,
      hospitalOrGarage,
      description
    } = body;

    if (!policyNumber || !policyHolder || !claimedAmount) {
      return NextResponse.json(
        { error: 'Policy Number, Policyholder name, and Estimated Claim Amount are required.' },
        { status: 400 }
      );
    }

    const newClaimId = `CLM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newClaim = {
      claimId: newClaimId,
      policyNumber: policyNumber.trim().toUpperCase(),
      policyHolder: policyHolder.trim(),
      category,
      planName: `${category.charAt(0).toUpperCase() + category.slice(1)} Shield Protection`,
      hospitalName: hospitalOrGarage || 'Designated Cashless Network Partner',
      incidentDate: incidentDate || new Date().toISOString().split('T')[0],
      claimedAmount: Number(claimedAmount),
      approvedAmount: Number(claimedAmount),
      settlementType: 'Cashless Fast-Track Verification',
      status: 'Under Review - AI Triage Verified',
      statusCode: 'PROCESSING',
      timeline: [
        { step: 'Claim Intimated Online', time: 'Just now', completed: true },
        { step: 'Instant AI Document Verification', time: 'Completed', completed: true },
        { step: 'TPA Cashless Pre-Authorization', time: 'In Progress (ETA 15 mins)', completed: false },
        { step: 'Hospital Settlement / Payout', time: 'Pending Discharge', completed: false }
      ],
      notes: `Claim request registered successfully. ${description ? `Description: "${description}"` : ''}`
    };

    // Prepend to store
    claimsStore.unshift(newClaim);

    return NextResponse.json({
      success: true,
      claimId: newClaimId,
      message: `Your claim ${newClaimId} has been successfully registered. Cashless pre-approval is underway!`,
      claim: newClaim
    });
  } catch (error) {
    console.error('Error submitting claim:', error);
    return NextResponse.json(
      { error: 'Failed to process claim submission.' },
      { status: 500 }
    );
  }
}
