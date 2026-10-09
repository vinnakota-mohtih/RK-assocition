export const PLAN_CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "health-indemnity", label: "Comprehensive Health" },
  { id: "top-up", label: "Super Top-Up / Enhance" },
  { id: "maternity", label: "Maternity & Newborn" },
  { id: "critical-illness", label: "Critical Illness" },
  { id: "personal-accident", label: "Personal Accident" },
  { id: "travel", label: "International Travel" }
];

export const ALL_PLANS = [
  // 1. CARE SUPREME (Fully Populated Flagship Plan from Section 4)
  {
    id: "care-supreme",
    slug: "care-supreme",
    name: "Care Supreme",
    tagline: "Comprehensive Health Insurance with Up to 7x Cumulative Bonus & Unlimited Recharges",
    uin: "CHIHLIP25047V022425",
    rating: 4.8,
    category: "health-indemnity",
    detailsPending: false,
    startingAtDaily: "₹13/day",
    startingAtDisclaimer: "Starting rate calculated for an 18-year-old individual, ₹7 Lakh SI, Zone 3 city, with Room Rent Modification & Sublimit add-ons. Subject to underwriting.",
    
    siOptions: [
      { label: "₹7 Lakh", value: 700000 },
      { label: "₹10 Lakh", value: 1000000 },
      { label: "₹15 Lakh", value: 1500000 },
      { label: "₹25 Lakh", value: 2500000 },
      { label: "₹50 Lakh", value: 5000000 },
      { label: "₹1 Crore", value: 10000000 }
    ],

    headlineBenefits: [
      "Sum insured up to 7x via cumulative bonus (50% per year, max 100% of SI)",
      "Unlimited automatic recharge for related or unrelated hospitalizations",
      "No zone-based co-payment across certified network hospitals",
      "Up to 30% cumulative renewal discount",
      "Annual preventive health check-up (optional benefit)",
      "Full coverage for Day-care, Emergency Ambulance, Organ Donor, & AYUSH treatments",
      "Unlimited e-consultations with certified doctors via mobile app",
      "Discount Connect savings on diagnostics, pharmacies, and consultations",
      "Optional in-clinic OPD cover"
    ],

    benefitTable: [
      { benefit: "In-patient Care (>24 hrs)", coverage: "Up to Sum Insured", note: "Room rent, nursing, ICU, specialist fees" },
      { benefit: "Day-care Treatment", coverage: "All Day-Care Procedures", note: "540+ medical procedures requiring <24h admission" },
      { benefit: "Advanced Technology Methods", coverage: "Up to Sum Insured", note: "Robotic surgeries, stem cell therapy, immunotherapy" },
      { benefit: "Pre-hospitalisation", coverage: "60 Days Prior", note: "Consultations, diagnostic tests, prescriptions" },
      { benefit: "Post-hospitalisation", coverage: "180 Days After", note: "Follow-up diagnostics, recovery physiotherapy, medications" },
      { benefit: "AYUSH Treatment", coverage: "Up to Sum Insured", note: "Ayurveda, Yoga, Unani, Siddha, Homeopathy at certified clinics" },
      { benefit: "Domiciliary Hospitalisation", coverage: "Up to Sum Insured", note: "Home treatment for ≥3 days when hospital beds unavailable" },
      { benefit: "Organ Donor Expenses", coverage: "Up to Sum Insured", note: "In-patient harvesting expenses (donor pre/post not payable)" },
      { benefit: "Road Ambulance", coverage: "₹10,000/yr (SI < 15L); Up to SI (SI ≥ 15L)", note: "Emergency transfer per event" },
      { benefit: "Cumulative Bonus", coverage: "+50% of SI/year, max 100% of SI", note: "Does not decrease or reduce upon claim payout" },
      { benefit: "Unlimited Automatic Recharge", coverage: "Available (100% of SI each time)", note: "Unlimited times per policy year for related or unrelated illnesses" },
      { benefit: "Unlimited E-consultations", coverage: "Available via App", note: "General physicians and specialists 24x7" },
      { benefit: "Health Services", coverage: "Discount Connect Included", note: "Network partner discounts on labs and medicines" }
    ],

    eligibility: {
      adultEntryAge: "18 – 99 years",
      childEntryAge: "90 days – 24 years",
      exitAge: "Lifelong renewal",
      individualCover: "Up to 6 persons",
      familyFloater: "Up to 2 Adults + 2 Children (2A2C)",
      tenureOptions: "1, 2, or 3 Years (Multi-year discount applies)",
      coveredRelations: [
        "Self", "Spouse", "Son", "Daughter", "Father", "Mother", 
        "Mother-in-law", "Father-in-law", "Grandfather", "Grandmother"
      ]
    },

    waitingPeriods: {
      accident: "0 Days (Immediate from Day 1)",
      initial: "30 Days (Except accidental injuries)",
      namedAilments: "2 Years (Specified surgeries like hernia, cataracts, joint replacements)",
      preExistingDiseases: "3 Years (Declared and accepted conditions under underwriting)"
    },

    exclusionsSummary: [
      "Outpatient OPD treatment (unless optional in-clinic OPD cover rider is added)",
      "Self-inflicted injuries, suicide attempts, or dangerous hazardous sports",
      "Treatments resulting from alcohol, drug, or substance intoxication",
      "Spectacles, contact lenses, dental treatment not arising from accidental trauma",
      "Maternity, pregnancy, childbirth, miscarriage, or abortion procedures",
      "External congenital anomalies and cosmetic/aesthetic enhancements",
      "Infertility assessments, IVF treatments, and surrogate procedures",
      "Injuries arising from unlawful, criminal, or military combat activities"
    ],

    claimsProcess: {
      cashless: [
        "Planned Hospitalization: Intimate insurer at least 48 hours prior to admission. Emergency: Intimate within 24 hours of hospital admission.",
        "Visit the TPA / Cashless Insurance Desk at any certified network hospital with your policy e-card and photo ID.",
        "Hospital submits the cashless pre-authorization form. Insurer evaluates and issues initial pre-auth clearance.",
        "Receive treatment and complete discharge paperwork. Insurer settles admissible hospital expenses directly."
      ],
      reimbursement: [
        "Intimate insurer within 48 hours (planned) or 24 hours (emergency) of hospital admission.",
        "Undergo treatment at any recognized hospital, settle bills directly, and collect all original invoices, discharge summary, and test reports.",
        "Submit the duly filled claim reimbursement form along with original receipts and doctor prescriptions within 30 days of discharge.",
        "Medical verification team audits documents and disburses approved claim amount directly into your bank account via NEFT."
      ]
    },

    faqs: [
      {
        q: "Can I add children to a Care Supreme family floater policy?",
        a: "Yes. Up to 2 children can be insured alongside 2 adults on a family floater setup. Children are covered between 90 days and 24 years of age."
      },
      {
        q: "Are pre-policy medical health check-ups mandatory before buying?",
        a: "Pre-policy medical screening depends on your age, chosen sum insured, and declared medical history during underwriting."
      },
      {
        q: "How does the Unlimited Automatic Recharge benefit work if my sum insured is exhausted?",
        a: "If your sum insured is exhausted during a policy year, Care Supreme restores 100% of your sum insured automatically for subsequent hospitalizations, unlimited times in a single year, for both related and unrelated illnesses."
      },
      {
        q: "Does the Cumulative Bonus reduce if I make a claim during the policy year?",
        a: "No! Unlike traditional policies where bonuses reduce after a claim, Care Supreme preserves your accumulated cumulative bonus."
      }
    ],

    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-supreme---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-supreme---prospectus.pdf"
  },

  // 2. ULTIMATE CARE
  {
    id: "ultimate-care",
    slug: "ultimate-care",
    name: "Ultimate Care",
    tagline: "Comprehensive High-Sum-Insured Healthcare with Global Emergency Safeguards",
    category: "health-indemnity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/ultimate-care---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/ultimate-care---prospectus.pdf"
  },

  // 3. EN ULTIMATE CARE
  {
    id: "en-ultimate-care",
    slug: "en-ultimate-care",
    name: "En Ultimate Care",
    tagline: "Next-Generation Medical Shield for Modern Health Expenses",
    category: "health-indemnity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/en-ultimate-care---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/en-ultimate-care---prospectus.pdf"
  },

  // 4. CARE ADVANTAGE
  {
    id: "care-advantage",
    slug: "care-advantage",
    name: "Care Advantage (1 Crore Shield)",
    tagline: "High-Value 1 Crore Sum Insured with Protect Plus & Care Shield Compatibility",
    category: "health-indemnity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-advantage---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-advantage---prospectus.pdf"
  },

  // 5. CARE CLASSIC
  {
    id: "care-classic",
    slug: "care-classic",
    name: "Care Classic",
    tagline: "Zone-Based Cost-Effective Health Protection for City-Specific Living",
    category: "health-indemnity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-classic---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-classic---prospectus.pdf"
  },

  // 6. CARE FREEDOM
  {
    id: "care-freedom",
    slug: "care-freedom",
    name: "Care Freedom",
    tagline: "Specialized Health Insurance for Diabetes and Hypertension Without Pre-Policy Tests",
    category: "health-indemnity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-freedom---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-freedom---prospectus.pdf"
  },

  // 7. CARE HEART
  {
    id: "care-heart",
    slug: "care-heart",
    name: "Care Heart",
    tagline: "Dedicated Health Insurance Tailored for Cardiac Patients & Heart Surgeries",
    category: "health-indemnity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-heart---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/care-heart---brochure.pdf"
  },

  // 8. SUPREME ENHANCE (TOP-UP)
  {
    id: "supreme-enhance",
    slug: "supreme-enhance",
    name: "Supreme Enhance (Super Top-up)",
    tagline: "High Deductible Super Top-up Plan to Amplify Existing Policy Limits Affordably",
    category: "top-up",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/supreme-enhance---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/supreme-enhance---prospectus.pdf"
  },

  // 9. JOY MATERNITY
  {
    id: "joy-maternity",
    slug: "joy-maternity",
    name: "Joy (Maternity & Newborn)",
    tagline: "Comprehensive Maternity Cover with 9-Month Waiting Period and Newborn Day 1 Care",
    category: "maternity",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/joy---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/joy---prospectus.pdf"
  },

  // 10. ASSURE (CRITICAL ILLNESS)
  {
    id: "assure-ci",
    slug: "assure-ci",
    name: "Assure Critical Illness",
    tagline: "Lump-Sum Financial Safeguard Against Cancer, Cardiac Surgeries, and 36 Critical Conditions",
    category: "critical-illness",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/assure---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/assure---prospectus.pdf"
  },

  // 11. SECURE (PERSONAL ACCIDENT)
  {
    id: "secure-pa",
    slug: "secure-pa",
    name: "Secure (Personal Accident)",
    tagline: "Accidental Death & Permanent Total Disability Financial Protection for Dependents",
    category: "personal-accident",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/secure---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/secure---prospectus.pdf"
  },

  // 12. EXPLORE (INTERNATIONAL TRAVEL)
  {
    id: "explore-travel",
    slug: "explore-travel",
    name: "Explore (International Travel)",
    tagline: "Schengen & Worldwide Emergency Medical Care, Passport Loss, and Trip Delay Coverage",
    category: "travel",
    detailsPending: true,
    brochureUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/explore---brochure.pdf",
    prospectusUrl: "https://cms.careinsurance.com/cms/public/uploads/download_center/explore---prospectus.pdf"
  }
];
