import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const {
      category = 'health',
      coverageAmount = 100000,
      age = 30,
      membersCount = 1,
      tenure = 1,
      paymentFrequency = 'monthly',
      hasPreExisting = false,
      isSmoker = false,
      riders = []
    } = data;

    // Calculation logic
    let baseRatePerThousand = 0.8;
    if (category === 'health') baseRatePerThousand = 0.75;
    if (category === 'life') baseRatePerThousand = 0.50;
    if (category === 'motor') baseRatePerThousand = 1.20;
    if (category === 'home') baseRatePerThousand = 0.35;
    if (category === 'travel') baseRatePerThousand = 0.40;

    // Age multiplier
    let ageMultiplier = 1.0;
    if (age > 25 && age <= 35) ageMultiplier = 1.1;
    else if (age > 35 && age <= 45) ageMultiplier = 1.35;
    else if (age > 45 && age <= 55) ageMultiplier = 1.75;
    else if (age > 55) ageMultiplier = 2.4;

    // Family multiplier
    const familyMultiplier = membersCount === 1 ? 1 : 1 + (membersCount - 1) * 0.45;

    // Lifestyle/Risk factor
    let riskMultiplier = 1.0;
    if (isSmoker) riskMultiplier += 0.35;
    if (hasPreExisting) riskMultiplier += 0.25;

    const coverageUnits = coverageAmount / 1000;
    let annualBase = coverageUnits * baseRatePerThousand * ageMultiplier * familyMultiplier * riskMultiplier;

    // Rider additions
    let ridersTotalAnnual = 0;
    riders.forEach(r => {
      if (r === 'criticalIllness') ridersTotalAnnual += 120;
      if (r === 'zeroDep') ridersTotalAnnual += 85;
      if (r === 'hospitalCash') ridersTotalAnnual += 45;
      if (r === 'worldwideCover') ridersTotalAnnual += 90;
      if (r === 'personalAccident') ridersTotalAnnual += 40;
    });

    const subTotalAnnual = annualBase + ridersTotalAnnual;
    // Multi-year discount
    const tenureDiscountPercent = tenure > 1 ? (tenure === 2 ? 0.08 : 0.15) : 0;
    const discountAmount = subTotalAnnual * tenureDiscountPercent;
    const afterDiscount = subTotalAnnual - discountAmount;
    const taxRate = 0.18; // 18% standard GST / Insurance tax
    const taxAmount = afterDiscount * taxRate;
    const finalAnnual = Math.round(afterDiscount + taxAmount);

    const finalMonthly = Math.round((finalAnnual / 12) * 1.05); // slight monthly financing adjustment

    const quoteId = `QUO-${category.toUpperCase().slice(0, 3)}-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      quoteId,
      summary: {
        category,
        coverageAmount,
        age,
        membersCount,
        tenureYears: tenure,
        monthlyPremium: finalMonthly,
        annualPremium: finalAnnual,
        breakdown: {
          baseAnnual: Math.round(annualBase),
          ridersTotalAnnual: Math.round(ridersTotalAnnual),
          multiYearDiscount: Math.round(discountAmount),
          taxesAndLevies: Math.round(taxAmount),
          totalAnnualPayable: finalAnnual,
          totalMonthlyPayable: finalMonthly
        },
        calculatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Quote calculation API error:', error);
    return NextResponse.json(
      { error: 'Failed to compute insurance quote.' },
      { status: 500 }
    );
  }
}
