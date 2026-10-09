'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ALL_PLANS, 
  PLAN_CATEGORIES 
} from '@/data/plans';
import { SITE_CONFIG } from '@/data/config';
import { 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Download, 
  ExternalLink,
  ChevronRight,
  Info,
  Scale
} from 'lucide-react';

export default function PlansPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPlans = ALL_PLANS.filter((plan) => {
    if (selectedCategory === 'all') return true;
    return plan.category === selectedCategory;
  });

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Page Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-950) 0%, #1e3a8a 100%)',
        color: '#ffffff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '4rem 0 3rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '840px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#7dd3fc',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={15} />
            <span>Official Care Health Insurance Products (IRDAI Reg. No. 148)</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Care Health Insurance Plans
          </h1>

          <p style={{ color: 'var(--blue-100)', fontSize: '1.05rem', margin: '0 auto 1.75rem auto', lineHeight: 1.6, maxWidth: '720px' }}>
            Explore verified health protection from Care Health Insurance. Cashless hospitalization across <strong>{SITE_CONFIG.headlineStats.cashlessProviders}</strong> certified healthcare providers in <strong>{SITE_CONFIG.headlineStats.citiesCovered}</strong> cities.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link 
              href="/compare" 
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <Scale size={16} />
              <span>Compare Plans Side-by-Side</span>
            </Link>

            <Link 
              href="/quote" 
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <span>Instant Premium Calculator</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        
        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2.5rem'
        }}>
          {PLAN_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === 'all' 
              ? ALL_PLANS.length 
              : ALL_PLANS.filter(p => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  border: isSelected ? '1px solid var(--blue-600)' : '1px solid var(--slate-300)',
                  backgroundColor: isSelected ? 'var(--blue-600)' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--slate-700)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{cat.label}</span>
                <span style={{
                  fontSize: '0.75rem',
                  opacity: 0.8,
                  padding: '1px 6px',
                  borderRadius: '999px',
                  backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : '#f1f5f9',
                  color: isSelected ? '#ffffff' : '#64748b'
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Plans Grid */}
        <div className="grid-3" style={{ gap: '2rem' }}>
          {filteredPlans.map((plan) => {
            const isSupreme = plan.slug === 'care-supreme';

            return (
              <div
                key={plan.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '16px',
                  border: isSupreme ? '2px solid var(--blue-600)' : '1px solid var(--slate-200)',
                  boxShadow: isSupreme ? '0 12px 30px rgba(37, 99, 235, 0.12)' : 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Flagship Tag */}
                {isSupreme && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    backgroundColor: 'var(--blue-600)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '4px 14px',
                    borderBottomLeftRadius: '10px',
                    letterSpacing: '0.05em'
                  }}>
                    FLAGSHIP COVER
                  </div>
                )}

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: 'var(--blue-50)',
                      color: 'var(--blue-700)'
                    }}>
                      {plan.category.replace('-', ' ')}
                    </span>

                    {plan.uin && (
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                        UIN: {plan.uin}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--blue-950)', marginTop: '0.4rem' }}>
                    {plan.name}
                  </h3>

                  <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginTop: '0.35rem', minHeight: '40px', lineHeight: 1.5 }}>
                    {plan.tagline}
                  </p>

                  {/* Highlights Box */}
                  <div style={{
                    margin: '1.25rem 0',
                    padding: '1rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {plan.startingAtDaily ? (
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-800)', textTransform: 'uppercase' }}>
                          Indicative Starting Premium
                        </span>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                            {plan.startingAtDaily}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            (₹7 Lakh Sum Insured)
                          </span>
                        </div>
                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: '4px 0 0 0', lineHeight: 1.3 }}>
                          *Calculated for age 18, Zone 3 city with sublimit modification.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue-800)', textTransform: 'uppercase' }}>
                          Available Sum Insured Options
                        </span>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue-950)', marginTop: '4px' }}>
                          ₹7 Lakh to ₹1 Crore
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          Customized via Care Abacus Underwriting
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Key Benefits List */}
                  <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue-900)', display: 'block', marginBottom: '0.65rem' }}>
                      Key Policy Privileges:
                    </span>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(plan.headlineBenefits ? plan.headlineBenefits.slice(0, 4) : [
                        "Cashless hospitalisation across 22,100+ network providers",
                        "Pre & Post hospitalisation medical expenses covered",
                        "Tax benefit eligibility under Section 80D",
                        "Lifelong policy renewal with NCB credits"
                      ]).map((feat, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem' }}>
                          <Check size={16} color="var(--emerald-500)" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span style={{ color: 'var(--slate-700)', lineHeight: 1.4 }}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Card CTAs */}
                <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-100)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    href={`/plans/${plan.slug}`}
                    className="btn btn-primary"
                    style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
                  >
                    <span>View Benefits & Wordings</span>
                    <ArrowRight size={15} />
                  </Link>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Link
                      href={`/quote?plan=${plan.slug}`}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, textAlign: 'center' }}
                    >
                      Calculate Quote
                    </Link>

                    {plan.brochureUrl && (
                      <a
                        href={plan.brochureUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.5rem 0.75rem' }}
                        title="Download Official Brochure (PDF)"
                      >
                        <Download size={14} />
                        <span>PDF</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Regulatory Solicitation Note */}
        <div style={{
          marginTop: '3.5rem',
          padding: '1.5rem',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start'
        }}>
          <Info size={20} color="var(--blue-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6 }}>
            <strong>Statutory Disclosure:</strong> Insurance is the subject matter of solicitation. Products marketed on this website are issued and underwritten by <strong>{SITE_CONFIG.insurerName}</strong> (IRDAI Reg. No. {SITE_CONFIG.insurerIrdaiRegNo}). {SITE_CONFIG.agencyName} acts as an authorized insurance advisory and corporate distributor. Please refer to respective product sales brochures and policy terms before concluding a purchase.
          </p>
        </div>

      </div>
    </div>
  );
}
