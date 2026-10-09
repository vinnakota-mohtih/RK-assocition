export const INITIAL_CLAIMS = [
  {
    claimId: "CLM-89210",
    policyNumber: "POL-HLTH-2024-918",
    policyHolder: "Rahul Sharma",
    category: "health",
    planName: "Health Guard Comprehensive",
    hospitalName: "Apollo Multispecialty Hospital, Mumbai",
    incidentDate: "2026-09-28",
    claimedAmount: 145000,
    approvedAmount: 145000,
    settlementType: "Cashless Instant Disbursal",
    status: "Approved & Settled",
    statusCode: "SETTLED",
    timeline: [
      { step: "Claim Intimated Online", time: "28 Sep, 09:15 AM", completed: true },
      { step: "Hospital Documents Received", time: "28 Sep, 10:04 AM", completed: true },
      { step: "AI Medical Adjudication", time: "28 Sep, 10:22 AM", completed: true },
      { step: "Final Cashless Pre-Auth Issued", time: "28 Sep, 10:38 AM", completed: true },
      { step: "Discharged & Payment Disbursed", time: "30 Sep, 02:00 PM", completed: true }
    ],
    notes: "100% cashless sanction approved under Health Guard Comprehensive terms. No deductions."
  },
  {
    claimId: "CLM-77304",
    policyNumber: "POL-AUTO-2025-412",
    policyHolder: "Priya Nair",
    category: "motor",
    planName: "Bumper-to-Bumper Auto Guard",
    hospitalName: "Pratham Motors Auto Workshop, Bengaluru",
    incidentDate: "2026-10-04",
    claimedAmount: 38200,
    approvedAmount: 36500,
    settlementType: "Cashless Workshop Repair",
    status: "In Progress - Inspection Complete",
    statusCode: "PROCESSING",
    timeline: [
      { step: "Accident Intimated with Photos", time: "04 Oct, 03:30 PM", completed: true },
      { step: "Surveyor Digital Inspection", time: "05 Oct, 11:00 AM", completed: true },
      { step: "Repair Estimate Approved", time: "05 Oct, 04:15 PM", completed: true },
      { step: "Workshop Repairing Parts", time: "06 Oct, 09:00 AM", completed: true },
      { step: "Final Quality Check & Gate Pass", time: "Estimated 09 Oct", completed: false }
    ],
    notes: "Survey approved bumper replacement and front right fender panel. Zero depreciation applied."
  },
  {
    claimId: "CLM-61092",
    policyNumber: "POL-LIFE-2023-104",
    policyHolder: "Kunal Bansal",
    category: "life",
    planName: "Comprehensive Life & Illness Pro",
    hospitalName: "Fortis Memorial Research Institute",
    incidentDate: "2026-09-12",
    claimedAmount: 500000,
    approvedAmount: 500000,
    settlementType: "Direct Bank NEFT",
    status: "Approved & Settled",
    statusCode: "SETTLED",
    timeline: [
      { step: "Critical Illness Intimation", time: "12 Sep, 11:30 AM", completed: true },
      { step: "Medical Records Verification", time: "14 Sep, 02:00 PM", completed: true },
      { step: "Medical Board Clearance", time: "15 Sep, 12:45 PM", completed: true },
      { step: "Direct NEFT Disbursed to Account", time: "16 Sep, 04:20 PM", completed: true }
    ],
    notes: "Lump sum critical illness benefit transferred directly to policyholder account."
  }
];

export const INITIAL_USER_POLICIES = [
  {
    policyId: "POL-HLTH-2024-918",
    category: "health",
    title: "Health Guard Comprehensive",
    sumInsured: "$150,000 / ₹15,00,000",
    holderName: "Rahul Sharma",
    insuredMembers: ["Rahul Sharma (Self, 34)", "Pooja Sharma (Spouse, 31)", "Aarav Sharma (Child, 5)"],
    startDate: "2024-11-15",
    renewalDate: "2026-11-14",
    status: "Active",
    premiumAmount: "$89 / mo (₹960/yr)",
    downloadUrl: "#",
    claimsCount: 1
  },
  {
    policyId: "POL-AUTO-2025-412",
    category: "motor",
    title: "Bumper-to-Bumper Auto Guard",
    sumInsured: "Full IDV ($35,000)",
    holderName: "Rahul Sharma",
    insuredMembers: ["Hyundai Creta SX (O) - KA 01 MJ 4492"],
    startDate: "2025-05-10",
    renewalDate: "2026-05-09",
    status: "Active",
    premiumAmount: "$42 / mo",
    downloadUrl: "#",
    claimsCount: 1
  },
  {
    policyId: "POL-LIFE-2023-104",
    category: "life",
    title: "Comprehensive Life & Illness Pro",
    sumInsured: "$1,000,000 / ₹1 Crore",
    holderName: "Rahul Sharma",
    insuredMembers: ["Nominee: Pooja Sharma (Wife)"],
    startDate: "2023-01-20",
    renewalDate: "2027-01-19",
    status: "Active",
    premiumAmount: "$68 / mo",
    downloadUrl: "#",
    claimsCount: 0
  }
];
