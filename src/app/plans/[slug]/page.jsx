import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_PLANS } from '@/data/plans';
import { OFFICIAL_LINKS } from '@/data/links';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Clock, 
  FileText, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Download, 
  HelpCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

export async function generateMetadata({ params }) {
  const plan = ALL_PLANS.find(p => p.slug === params.slug);
  if (!plan) return { title: 'Plan Not Found' };

  return {
    title: `${plan.name} Health Insurance | Features, Eligibility & Brochure`,
    description: `${plan.tagline}. Download policy brochure, check benefits, waiting periods, and compute quotes.`,
    alternates: {
      canonical: `/plans/${plan.slug}`
    }
  };
}

export default function PlanDetailPage({ params }) {
  const plan = ALL_PLANS.find(p => p.slug === params.slug);

  if (!plan) {
    notFound();
  }

  // Schema.org FAQPage JSON-LD
  const jsonLdFaq = plan.faqs && plan.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": plan.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  } : null;

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {jsonLdFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      )}

      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '3.5rem 0 2.5rem 0'
      }}>
        <div className="container">
          <div style={{ maxWidth: '850px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <span className="badge badge-blue">Official Product Spec</span>
              {plan.uin && (
                <span className="badge" style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-700)', fontSize: '0.75rem' }}>
                  IRDAI UIN: {plan.uin}
                </span>
              )}
              {plan.rating && (
                <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: 700 }}>
                  ★ {plan.rating} / 5 Customer Rating
                </span>
              )}
            </div>

            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {plan.name}
            </h1>
            <p className="section-subtitle" style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
              {plan.tagline}
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              <Link href={`/quote?plan=${plan.slug}`} className="btn btn-primary">
                <span>Calculate Indicative Premium</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={OFFICIAL_LINKS.quoteAbacus.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>Official Care Abacus Quote</span>
                <ExternalLink size={14} />
              </a>

              {plan.brochureUrl && (
                <a
                  href={plan.brochureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Download size={14} />
                  <span>Download Brochure PDF</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* If pending details */}
        {plan.detailsPending ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <Info size={40} color="var(--blue-500)" style={{ margin: '0 auto 1rem auto' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--blue-950)' }}>
              Detailed Specification Pending
            </h2>
            <p style={{ color: 'var(--slate-600)', maxWidth: '600px', margin: '0.5rem auto 1.5rem auto', lineHeight: '1.6' }}>
              Full benefit tables for <strong>{plan.name}</strong> will be populated as soon as the specific product brochure is updated. You can view the official prospectus and brochure directly below:
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              {plan.brochureUrl && (
                <a href={plan.brochureUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Download size={16} />
                  <span>Official Policy Brochure (PDF)</span>
                </a>
              )}
              {plan.prospectusUrl && (
                <a href={plan.prospectusUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Download size={16} />
                  <span>Official Prospectus (PDF)</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* 1. Headline Highlights */}
            {plan.headlineBenefits && (
              <div className="card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1.25rem' }}>
                  Key Highlights & Advantages
                </h2>
                <div className="grid-2">
                  {plan.headlineBenefits.map((b, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <Check size={18} color="var(--blue-600)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.95rem', color: 'var(--slate-800)', fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Benefit Table */}
            {plan.benefitTable && (
              <div className="card" style={{ padding: '2rem', overflowX: 'auto' }}>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem' }}>
                  Coverage Benefits Table
                </h2>
                <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                  As specified in the official policy filing with IRDAI (UIN: {plan.uin}).
                </p>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--blue-50)', borderBottom: '2px solid var(--blue-200)' }}>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--blue-950)', fontSize: '0.9rem' }}>Benefit Name</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--blue-950)', fontSize: '0.9rem' }}>Coverage Limit</th>
                      <th style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--blue-950)', fontSize: '0.9rem' }}>Terms & Inclusions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.benefitTable.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: idx % 2 === 0 ? '#ffffff' : 'var(--blue-25)' }}>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: 'var(--slate-800)', fontSize: '0.9rem' }}>{row.benefit}</td>
                        <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--blue-700)', fontSize: '0.9rem' }}>{row.coverage}</td>
                        <td style={{ padding: '0.85rem 1rem', color: 'var(--slate-600)', fontSize: '0.85rem' }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. Eligibility & Waiting Periods Grid */}
            <div className="grid-2">
              {/* Eligibility */}
              {plan.eligibility && (
                <div className="card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1rem' }}>
                    Eligibility & Policy Structure
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Adult Entry Age:</span>
                      <strong>{plan.eligibility.adultEntryAge}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Child Entry Age:</span>
                      <strong>{plan.eligibility.childEntryAge}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Renewability:</span>
                      <strong style={{ color: 'var(--emerald-500)' }}>{plan.eligibility.exitAge}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Floater Limit:</span>
                      <strong>{plan.eligibility.familyFloater}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Available Tenures:</span>
                      <strong>{plan.eligibility.tenureOptions}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Waiting Periods */}
              {plan.waitingPeriods && (
                <div className="card" style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1rem' }}>
                    Standard Waiting Periods
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Accidental Injury:</span>
                      <strong style={{ color: 'var(--emerald-500)' }}>{plan.waitingPeriods.accident}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Initial Waiting Period:</span>
                      <strong>{plan.waitingPeriods.initial}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Named Ailments (Hernia, Cataracts, etc.):</span>
                      <strong>{plan.waitingPeriods.namedAilments}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--slate-600)' }}>Pre-Existing Diseases (PED):</span>
                      <strong>{plan.waitingPeriods.preExistingDiseases}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Exclusions */}
            {plan.exclusionsSummary && (
              <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff', border: '1px solid var(--rose-100)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#9f1239', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={20} />
                  <span>Important Exclusions Summary</span>
                </h3>
                <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginBottom: '1rem' }}>
                  Please refer to the official policy wording PDF for the exhaustive list of permanent exclusions.
                </p>
                <div className="grid-2">
                  {plan.exclusionsSummary.map((ex, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.88rem' }}>
                      <X size={16} color="var(--rose-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ color: 'var(--slate-700)' }}>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Claim Process */}
            {plan.claimsProcess && (
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1.25rem' }}>
                  How to Make a Claim Under {plan.name}
                </h3>
                <div className="grid-2">
                  <div style={{ backgroundColor: 'var(--blue-25)', padding: '1.25rem', borderRadius: '12px' }}>
                    <strong style={{ color: 'var(--blue-900)', display: 'block', marginBottom: '0.5rem' }}>
                      Cashless Hospitalization
                    </strong>
                    <ol style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.claimsProcess.cashless.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: '12px' }}>
                    <strong style={{ color: 'var(--blue-900)', display: 'block', marginBottom: '0.5rem' }}>
                      Reimbursement Claims
                    </strong>
                    <ol style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {plan.claimsProcess.reimbursement.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            )}

            {/* 6. FAQs */}
            {plan.faqs && plan.faqs.length > 0 && (
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1rem' }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {plan.faqs.map((f, i) => (
                    <div key={i} style={{ padding: '1rem', border: '1px solid var(--slate-200)', borderRadius: '10px' }}>
                      <strong style={{ color: 'var(--blue-950)', display: 'block', marginBottom: '0.35rem' }}>
                        {f.q}
                      </strong>
                      <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        {f.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Quote CTA */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, #071930 0%, #0b2545 60%, #0284c7 100%)',
              color: '#ffffff',
              padding: '2.5rem',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                Protect Your Family with {plan.name}
              </h3>
              <p style={{ color: 'var(--blue-100)', maxWidth: '600px', margin: '0.5rem auto 1.5rem auto' }}>
                Calculate your custom premium or request a personalized advisory call from RK Associates Pvt. Ltd.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href={`/quote?plan=${plan.slug}`} className="btn btn-primary" style={{ backgroundColor: '#ffffff', color: 'var(--blue-950)' }}>
                  <span>Calculate Premium</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={OFFICIAL_LINKS.quoteAbacus.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white"
                >
                  <span>Official Care Abacus Quote</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
