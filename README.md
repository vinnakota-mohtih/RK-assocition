# RK Associates Pvt. Ltd. – Health Insurance Web Platform

A web platform built with Next.js 14 for **RK Associates Pvt. Ltd.**, licensed insurance advisory and corporate channel partner representing **Care Health Insurance Limited** (IRDAI Reg. No. 148).

---

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js 14 (App Router)
- **Runtime:** Node.js (strictly zero Python dependencies)
- **Styling:** Custom Design System (`src/app/globals.css`) in Royal Blue & Clean White palette
- **Typography:** Plus Jakarta Sans & Outfit
- **Icons:** Lucide React

---

## 📂 Data Layer Architecture
All business data, links, documents, and regulatory notices are decoupled from UI components and stored in typed data files under `src/data/`:

| File | Purpose |
|---|---|
| `src/data/config.js` | Agency details, Insurer metadata, IRDAI registration numbers, and Mode A/B toggle. |
| `src/data/links.js` | All 7 official Care Health Insurance links + auxiliary tools (e.g. Abacus quote, Bima Bharosa, Renewal). |
| `src/data/plans.js` | Product catalog with UINs, Care Supreme full specs (eligibility, benefits table, waiting periods, exclusions). |
| `src/data/documents.js` | Full categorized catalog of official brochure and prospectus PDFs from Care's download center. |
| `src/data/faqs.js` | Rewritten, compliant SEO FAQs for plan pages and customer inquiries. |
| `src/data/rates.json` | Rate tables for Mode B in-house computation. |

---

## 🚀 Key Features & Pages
1. **Homepage (`/`)**: Hero with real-time stats (22,100+ providers across 1,400+ cities), popular plans, interactive quick quote, trust metrics, and brand logo.
2. **Plans Listing (`/plans`) & Detail (`/plans/[slug]`)**: Plan details (Care Supreme, Care Advantage, Senior Health, Joy, Enhance) with JSON-LD SEO schemas, UIN disclosures, benefit breakdowns, and brochure downloads.
3. **Compare Plans (`/compare`)**: Side-by-side comparison matrix of up to 3 plans simultaneously.
4. **Instant Quote Calculator (`/quote`)**:
   - **Step 1:** Family member multi-select with age validation (adults 18–99, children 90d–24y), 10-digit mobile check, and terms consent.
   - **Step 2:** Plan, Sum Insured, Individual vs Floater (2A2C validation), tenure, zone, and riders.
   - **Mode A (Default):** Captures lead securely via `/api/leads` and routes to Care's Abacus quotation portal in a new tab.
   - **Underwriting Tools:** Built-in BMI calculator, Cumulative bonus projector (+50%/yr up to 100%), and Sum Insured recommender.
5. **Claims Center (`/claims`)**:
   - Official 4-step cashless workflow (48h/24h intimation rule).
   - Official 4-step reimbursement workflow.
   - Document checklist for reimbursement claims.
   - Outbound link to official Care Claim Login Portal (`/rhicl/claim/login`) & Claims Procedure PDF download.
   - Interactive claim status tracker and local filing.
6. **Cashless Hospital Locator (`/hospital-locator`)**: Search by city, state, pincode with direct query generation to Care's certified network locator and bank-linked policy advisories.
7. **Excluded Hospitals (`/excluded-hospitals`)**: Non-preferred healthcare providers advisory with emergency stabilization coverage rules and `Excluded_List.pdf` download.
8. **Online Policy Renewal (`/renew`)**: Direct renewal gateway (`renew.careinsurance.com`) explaining waiting period continuity and no-claim bonus retention.
9. **Downloads Center (`/downloads`)**: Categorized and searchable catalog of brochures and prospectuses.
10. **Regulatory Compliance (`/legal/disclaimer`)**: Section 10 disclosures, IRDAI Reg. 148, fraud warning notice, and IRDAI Bima Bharosa link.

---

## 💻 Running Locally

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Lead Management API
- **Submit Lead:** `POST /api/leads`
- **Export Leads (CSV):** `GET /api/leads/export`
