const PDF_BASE = "https://cms.careinsurance.com/cms/public/uploads/download_center/";

export const DOCUMENT_CATEGORIES = [
  { id: "all", label: "All Documents" },
  { id: "health-indemnity", label: "Health (Indemnity)" },
  { id: "top-up", label: "Top-up & Enhance" },
  { id: "maternity", label: "Maternity" },
  { id: "critical-illness", label: "Critical Illness" },
  { id: "personal-accident", label: "Personal Accident" },
  { id: "travel", label: "Travel Insurance" },
  { id: "add-ons", label: "Riders & Add-ons" },
  { id: "general", label: "Forms & Guidelines" }
];

export const ALL_DOCUMENTS = [
  // Health Indemnity
  {
    title: "Care Supreme – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care Supreme",
    url: `${PDF_BASE}care-supreme---brochure.pdf`
  },
  {
    title: "Care Supreme – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Care Supreme",
    url: `${PDF_BASE}care-supreme---prospectus.pdf`
  },
  {
    title: "Ultimate Care – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Ultimate Care",
    url: `${PDF_BASE}ultimate-care---brochure.pdf`
  },
  {
    title: "Ultimate Care – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Ultimate Care",
    url: `${PDF_BASE}ultimate-care---prospectus.pdf`
  },
  {
    title: "En Ultimate Care – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "En Ultimate Care",
    url: `${PDF_BASE}en-ultimate-care---brochure.pdf`
  },
  {
    title: "En Ultimate Care – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "En Ultimate Care",
    url: `${PDF_BASE}en-ultimate-care---prospectus.pdf`
  },
  {
    title: "Ultimate Joy – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Ultimate Joy",
    url: `${PDF_BASE}ultimate-joy---brochure.pdf`
  },
  {
    title: "Ultimate Joy – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Ultimate Joy",
    url: `${PDF_BASE}ultimate-joy---prospectus.pdf`
  },
  {
    title: "Care Advantage – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care Advantage",
    url: `${PDF_BASE}care-advantage---brochure.pdf`
  },
  {
    title: "Care Advantage – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Care Advantage",
    url: `${PDF_BASE}care-advantage---prospectus.pdf`
  },
  {
    title: "Care Classic – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care Classic",
    url: `${PDF_BASE}care-classic---brochure.pdf`
  },
  {
    title: "Care Classic – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Care Classic",
    url: `${PDF_BASE}care-classic---prospectus.pdf`
  },
  {
    title: "Care (Original) – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care",
    url: `${PDF_BASE}care---brochure.pdf`
  },
  {
    title: "Care (Original) – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Care",
    url: `${PDF_BASE}care---prospectus.pdf`
  },
  {
    title: "Care Plus – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care Plus",
    url: `${PDF_BASE}care-plus---brochure.pdf`
  },
  {
    title: "Care Freedom – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care Freedom",
    url: `${PDF_BASE}care-freedom---brochure.pdf`
  },
  {
    title: "Care Heart – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Care Heart",
    url: `${PDF_BASE}care-heart---brochure.pdf`
  },
  {
    title: "Senior Health Advantage – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Senior Health Advantage",
    url: `${PDF_BASE}senior-health-advantage---brochure.pdf`
  },
  {
    title: "Arogya Sanjeevani – Prospectus",
    category: "health-indemnity",
    type: "Prospectus",
    planName: "Arogya Sanjeevani",
    url: `${PDF_BASE}arogya-sanjeevani---prospectus.pdf`
  },
  {
    title: "Super Mediclaim – Brochure",
    category: "health-indemnity",
    type: "Brochure",
    planName: "Super Mediclaim",
    url: `${PDF_BASE}super-mediclaim---brochure.pdf`
  },

  // Top-Up / Enhance
  {
    title: "Supreme Enhance – Brochure",
    category: "top-up",
    type: "Brochure",
    planName: "Supreme Enhance",
    url: `${PDF_BASE}supreme-enhance---brochure.pdf`
  },
  {
    title: "Supreme Enhance – Prospectus",
    category: "top-up",
    type: "Prospectus",
    planName: "Supreme Enhance",
    url: `${PDF_BASE}supreme-enhance---prospectus.pdf`
  },
  {
    title: "Enhance (Top-up) – Brochure",
    category: "top-up",
    type: "Brochure",
    planName: "Enhance",
    url: `${PDF_BASE}enhance---brochure.pdf`
  },

  // Maternity
  {
    title: "Joy (Maternity) – Brochure",
    category: "maternity",
    type: "Brochure",
    planName: "Joy Maternity",
    url: `${PDF_BASE}joy---brochure.pdf`
  },
  {
    title: "Joy (Maternity) – Prospectus",
    category: "maternity",
    type: "Prospectus",
    planName: "Joy Maternity",
    url: `${PDF_BASE}joy---prospectus.pdf`
  },

  // Critical Illness
  {
    title: "Assure Critical Illness – Brochure",
    category: "critical-illness",
    type: "Brochure",
    planName: "Assure",
    url: `${PDF_BASE}assure---brochure.pdf`
  },
  {
    title: "Assure Critical Illness – Prospectus",
    category: "critical-illness",
    type: "Prospectus",
    planName: "Assure",
    url: `${PDF_BASE}assure---prospectus.pdf`
  },

  // Personal Accident
  {
    title: "Secure Personal Accident – Brochure",
    category: "personal-accident",
    type: "Brochure",
    planName: "Secure",
    url: `${PDF_BASE}secure---brochure.pdf`
  },
  {
    title: "Secure Plus – Brochure",
    category: "personal-accident",
    type: "Brochure",
    planName: "Secure Plus",
    url: `${PDF_BASE}secure-plus---brochure.pdf`
  },
  {
    title: "Saral Suraksha Bima – Prospectus",
    category: "personal-accident",
    type: "Prospectus",
    planName: "Saral Suraksha Bima",
    url: `${PDF_BASE}saral-suraksha-bima---prospectus.pdf`
  },

  // Add-ons
  {
    title: "Protect Plus Add-on – Prospectus",
    category: "add-ons",
    type: "Prospectus",
    planName: "Protect Plus",
    url: `${PDF_BASE}protect-plus---prospectus.pdf`
  },
  {
    title: "Care Shield Add-on – Prospectus",
    category: "add-ons",
    type: "Prospectus",
    planName: "Care Shield",
    url: `${PDF_BASE}care-shield---prospectus.pdf`
  },

  // Travel
  {
    title: "Explore Travel – Brochure",
    category: "travel",
    type: "Brochure",
    planName: "Explore",
    url: `${PDF_BASE}explore---brochure.pdf`
  },
  {
    title: "Student Explore – Brochure",
    category: "travel",
    type: "Brochure",
    planName: "Student Explore",
    url: `${PDF_BASE}student-explore---brochure.pdf`
  },

  // Reference Documents & Compliance
  {
    title: "Official Claims Procedure Guide",
    category: "general",
    type: "Procedure Guide",
    planName: "All Plans",
    url: "https://cms.careinsurance.com/cms/public/uploads/claimsprocedurepdf/Claims_Procedure.pdf"
  },
  {
    title: "Excluded / Non-preferred Hospitals Master List",
    category: "general",
    type: "Regulatory Exclusion",
    planName: "All Plans",
    url: `${PDF_BASE}Excluded_List.pdf`
  }
];
