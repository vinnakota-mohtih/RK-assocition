export const INSURANCE_CATEGORIES = [
  {
    id: "health",
    title: "Health Insurance",
    shortDesc: "Cashless hospitalization at 12,000+ top hospitals with zero co-pay options.",
    icon: "ShieldAlert",
    startingPrice: 599,
    popular: true,
    accent: "#0284c7"
  },
  {
    id: "life",
    title: "Term Life Insurance",
    shortDesc: "Financial security for your family with up to $2,000,000 / ₹2 Cr coverage.",
    icon: "HeartHandshake",
    startingPrice: 450,
    popular: true,
    accent: "#2563eb"
  },
  {
    id: "motor",
    title: "Motor & Auto Insurance",
    shortDesc: "Zero-depreciation repairs, instant roadside assistance, and paperless claims.",
    icon: "Car",
    startingPrice: 320,
    popular: false,
    accent: "#0ea5e9"
  },
  {
    id: "home",
    title: "Home & Property",
    shortDesc: "Complete protection for building structure, valuables, and natural hazards.",
    icon: "Home",
    startingPrice: 280,
    popular: false,
    accent: "#0369a1"
  },
  {
    id: "travel",
    title: "International Travel",
    shortDesc: "Worldwide medical coverage, flight cancellation compensation, and baggage loss.",
    icon: "Plane",
    startingPrice: 199,
    popular: false,
    accent: "#0284c7"
  }
];

export const INSURANCE_PLANS = [
  {
    id: "health-silver",
    category: "health",
    name: "Health Guard Essential",
    tier: "Essential",
    tagline: "Essential hospitalization coverage for individuals starting out.",
    coverageAmount: "$60,000 / ₹5,00,000",
    coverageValue: 60000,
    monthlyPremium: 49,
    annualPremium: 529,
    cashlessHospitals: "8,500+",
    claimSettlement: "30 Mins",
    popular: false,
    features: [
      { text: "In-patient hospitalization coverage", included: true },
      { text: "Pre & Post hospitalization (30 & 60 days)", included: true },
      { text: "Daycare procedures (540+ covered)", included: true },
      { text: "No Claim Bonus up to 50%", included: true },
      { text: "Annual Health Checkup included", included: false },
      { text: "Maternity & Newborn coverage", included: false },
      { text: "Global emergency assistance", included: false },
    ],
    deductibles: [0, 500, 1000]
  },
  {
    id: "health-gold",
    category: "health",
    name: "Health Guard Comprehensive",
    tier: "Popular Choice",
    tagline: "Complete family floater protection with zero room rent capping.",
    coverageAmount: "$150,000 / ₹15,00,000",
    coverageValue: 150000,
    monthlyPremium: 89,
    annualPremium: 960,
    cashlessHospitals: "12,400+",
    claimSettlement: "15 Mins",
    popular: true,
    features: [
      { text: "In-patient hospitalization coverage", included: true },
      { text: "Pre & Post hospitalization (60 & 90 days)", included: true },
      { text: "No Room Rent Sub-limits / Single Private AC", included: true },
      { text: "Restoration of Sum Insured (Unlimited)", included: true },
      { text: "Annual Preventive Full Body Checkup", included: true },
      { text: "AYUSH / Alternative Medicine Coverage", included: true },
      { text: "Maternity cover after 24 months", included: false },
    ],
    deductibles: [0, 250, 500]
  },
  {
    id: "health-platinum",
    category: "health",
    name: "Health Guard Supreme Elite",
    tier: "Elite VIP",
    tagline: "Global concierge healthcare with worldwide emergency & zero out-of-pocket costs.",
    coverageAmount: "$500,000 / ₹50,00,000",
    coverageValue: 500000,
    monthlyPremium: 149,
    annualPremium: 1610,
    cashlessHospitals: "16,000+ Worldwide",
    claimSettlement: "Instant VIP",
    popular: false,
    features: [
      { text: "All Hospitalization costs & Suite rooms", included: true },
      { text: "Worldwide Emergency Medical Cover", included: true },
      { text: "Full Maternity + Baby Day 1 Protection", included: true },
      { text: "Organ Donor & Air Ambulance included", included: true },
      { text: "Second Medical Opinion from USA/EU specialists", included: true },
      { text: "Unlimited Digital Doctor Consultations 24/7", included: true },
      { text: "Zero Co-pay & Zero Deductibles nationwide", included: true },
    ],
    deductibles: [0]
  },
  {
    id: "life-term-protect",
    category: "life",
    name: "Pure Term Shield Plus",
    tier: "Essential",
    tagline: "High sum assured life cover guaranteeing your family's future dreams.",
    coverageAmount: "$500,000 / ₹50,00,000",
    coverageValue: 500000,
    monthlyPremium: 35,
    annualPremium: 380,
    cashlessHospitals: "N/A",
    claimSettlement: "24 Hours",
    popular: false,
    features: [
      { text: "Lump sum payout on unexpected demise", included: true },
      { text: "Terminal Illness advance payout", included: true },
      { text: "Tax savings under prevailing laws", included: true },
      { text: "Accidental Death Benefit add-on", included: true },
      { text: "Critical Illness coverage (36 illnesses)", included: false },
      { text: "Return of Premium option", included: false }
    ],
    deductibles: [0]
  },
  {
    id: "life-smart-shield",
    category: "life",
    name: "Comprehensive Life & Illness Pro",
    tier: "Popular Choice",
    tagline: "Life insurance + 40 Critical Illnesses + Waiver of premium on disability.",
    coverageAmount: "$1,000,000 / ₹1 Crore",
    coverageValue: 1000000,
    monthlyPremium: 68,
    annualPremium: 735,
    cashlessHospitals: "N/A",
    claimSettlement: "Same Day",
    popular: true,
    features: [
      { text: "Complete $1M Life Cover until age 85", included: true },
      { text: "40 Critical Illnesses early cash payout", included: true },
      { text: "Accidental Permanent Disability Waiver", included: true },
      { text: "Monthly income payout option for nominees", included: true },
      { text: "Inflation adjustment (+5% sum assured/yr)", included: true },
      { text: "Return of Premium on policy maturity", included: false }
    ],
    deductibles: [0]
  },
  {
    id: "motor-zero-dep",
    category: "motor",
    name: "Bumper-to-Bumper Auto Guard",
    tier: "Popular Choice",
    tagline: "100% cashless claims on plastic, fiber, metal parts with roadside assistance.",
    coverageAmount: "Full IDV Market Value",
    coverageValue: 35000,
    monthlyPremium: 42,
    annualPremium: 450,
    cashlessHospitals: "7,800+ Garages",
    claimSettlement: "4 Hours Instant",
    popular: true,
    features: [
      { text: "Zero Depreciation on all claims", included: true },
      { text: "24/7 Roadside Assistance & Towing", included: true },
      { text: "Engine & Gearbox Protection Add-on", included: true },
      { text: "Consumables & Key Replacement included", included: true },
      { text: "Personal Accident Cover ($25,000)", included: true },
      { text: "Pick-up and drop for repairs", included: true }
    ],
    deductibles: [0, 100, 250]
  },
  {
    id: "home-haven-secure",
    category: "home",
    name: "Home Structure & Assets Shield",
    tier: "Comprehensive",
    tagline: "All-in-one protection for structure, electronics, jewelry, and furniture.",
    coverageAmount: "$250,000 / ₹25,00,000",
    coverageValue: 250000,
    monthlyPremium: 28,
    annualPremium: 299,
    cashlessHospitals: "N/A",
    claimSettlement: "48 Hours",
    popular: false,
    features: [
      { text: "Fire, Earthquake, Flood & Storm cover", included: true },
      { text: "Burglary and Theft protection", included: true },
      { text: "Electrical breakdown of appliances", included: true },
      { text: "Alternative accommodation allowance", included: true },
      { text: "Public liability coverage up to $50,000", included: true }
    ],
    deductibles: [100, 250]
  },
  {
    id: "travel-voyager-elite",
    category: "travel",
    name: "Voyager Global Multi-Trip Guard",
    tier: "International",
    tagline: "Passport loss, flight delays, emergency hospital stays worldwide.",
    coverageAmount: "$250,000 Worldwide",
    coverageValue: 250000,
    monthlyPremium: 32,
    annualPremium: 320,
    cashlessHospitals: "10,000+ Worldwide",
    claimSettlement: "Instant App Track",
    popular: false,
    features: [
      { text: "Emergency Medical & Dental expenses", included: true },
      { text: "Trip Cancellation & Missed Connection", included: true },
      { text: "Checked Baggage Loss & Delay cover", included: true },
      { text: "Loss of Passport & Travel Documents", included: true },
      { text: "COVID-19 treatment covered globally", included: true }
    ],
    deductibles: [50]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Vikram Sethi",
    role: "Senior Consultant, Max Healthcare",
    location: "New Delhi",
    avatar: "VS",
    rating: 5,
    quote: "When my father needed immediate angioplasty, the cashless approval took exactly 18 minutes through the mobile app. The seamless experience took away 100% of our financial stress.",
    policy: "Health Guard Supreme Elite",
    claimAmount: "₹3,85,000 Settled"
  },
  {
    id: 2,
    name: "Ananya Iyer",
    role: "Product Director, FinTech",
    location: "Bengaluru",
    avatar: "AI",
    rating: 5,
    quote: "The transparency and clean UI is light years ahead of traditional insurance firms. The instant quote calculator was spot-on with no hidden surprises or annoying telemarketer calls.",
    policy: "Comprehensive Life & Illness Pro",
    claimAmount: "Family Protection"
  },
  {
    id: 3,
    name: "Rohit & Megha Sharma",
    role: "Architects & Entrepreneurs",
    location: "Mumbai",
    avatar: "RS",
    rating: 5,
    quote: "Our car had bumper damage on the expressway. Filed a claim with photo upload at 10 AM, car was picked up by 11:30 AM, and cashless settlement completed the next morning. Absolutely stellar!",
    policy: "Bumper-to-Bumper Auto Guard",
    claimAmount: "₹46,200 Settled Cashless"
  }
];

export const COMPANY_STATS = [
  { label: "Claims Settlement Ratio", value: "99.4%", sub: "IRDAI Audited FY 2025-26" },
  { label: "Cashless Network Hospitals", value: "14,500+", sub: "Across 750+ cities" },
  { label: "Active Policyholders", value: "3.2 Million+", sub: "Individuals & Families" },
  { label: "Average Cashless Approval", value: "18 Minutes", sub: "Powered by AI auto-triage" }
];
