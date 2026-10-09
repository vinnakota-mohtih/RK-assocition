# RK Associates Insurance – Data & Content Integration Checklist (TODO)

This document lists all data items and inputs required to transition from **Mode A (Official Outbound Redirects & Placeholders)** to **Mode B (Full In-House Adjudication & Custom Rates)**, as outlined in the *Care Health Insurance Website Data Pack*.

---

## 1. Regulatory & Corporate Agency Identifiers
- [ ] **Advisor / Agency License Number:** Provide your official IRDAI Intermediary / POSP / Corporate Agency registration code and validity dates to display alongside Care Health Insurance's IRDAI Reg. No. 148.
- [ ] **Official Office Address & Contact details:** Confirm the physical address and direct escalation contact numbers in `src/data/config.js`.

---

## 2. Proprietary Premium Rate Tables (For Calculator Mode B)
Care Health Insurance does not publish raw rate cards publicly. To enable in-house premium computation:
- [ ] Obtain the official filed rate card for each product (e.g., Care Supreme, Care Advantage, Joy, Enhance) from your Care partner manager or Faveo agent portal.
- [ ] Populate `src/data/rates.json` following the schema defined in `src/data/rates.example.json` (indexed by `[plan][sumInsured][zone][ageBand]`).
- [ ] Toggle `USE_LOCAL_RATES: true` in `src/data/config.js`.

---

## 3. Product Specifications Beyond Care Supreme
Currently, **Care Supreme** (flagship) is fully populated with benefits, eligibility, waiting periods, and exclusions from Section 4. The following products are stubbed with their official UIN and brochures ready in `src/data/plans.js`:
- [ ] **Care Advantage:** Extract specific waiting periods and sub-limits from brochure.
- [ ] **Senior Health Advantage:** Extract specific pre-existing disease terms and co-pay clauses.
- [ ] **Joy (Maternity):** Extract maternity waiting period (e.g., 9 months vs 24 months) and new-born cover limits.
- [ ] **Supreme Enhance (Top-up):** Extract deductible tiers (₹1L to ₹10L).
- [ ] **Care Heart / Care Freedom / Arogya Sanjeevani:** Add benefit matrices as required.

*(Note: Official PDF brochures for all these products are already wired into the Downloads page from `src/data/documents.js`).*

---

## 4. Hospital Network Dataset (Optional Local Search)
- [ ] Currently, the Hospital Locator points seamlessly to Care's certified locator with 22,100+ providers across 1,400+ cities (Dec 2025 data).
- [ ] If you wish to provide an instant in-house search for your local district (e.g., Andhra Pradesh / Mumbai / Delhi), supply the verified hospital list with Name, City, State, Pincode, and TPA desk phone to `src/data/networkHospitals.js`.

---

## 5. Loan & Financing Products (If Applicable)
- [ ] If RK Associates offers loans against insurance, medical loans, or personal financing, provide:
  - Partner bank / NBFC lender names.
  - Loan categories (Medical emergency loan, Education loan, Home loan).
  - Interest rate ranges (APR %) and tenure limits.
  - We will activate the generic EMI calculator module (`EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)`).

---

## 6. Lead Capture CRM & Webhooks
- [ ] Quotes and leads are currently captured via `POST /api/leads` and stored securely, exportable via `GET /api/leads/export`.
- [ ] If you use an external CRM (Zoho, Salesforce, LeadSquared, Google Sheets), provide your Webhook URL or API key in `.env.local` (`LEADS_WEBHOOK_URL`).
