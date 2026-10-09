'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import QuickQuoteBar from '@/components/QuickQuoteBar';
import { ALL_PLANS, PLAN_CATEGORIES } from '@/data/plans';
import { SITE_CONFIG } from '@/data/config';
import { TESTIMONIALS } from '@/data/insurancePlans';
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  PhoneCall, 
  FileCheck2, 
  Award, 
  Building2, 
  HeartHandshake, 
  ChevronDown, 
  ChevronUp,
  Search,
  Check,
  Star,
  Sparkles,
  Lock
} from 'lucide-react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [sampleClaimInput, setSampleClaimInput] = useState('');
  const [trackedClaim, setTrackedClaim] = useState(null);
  const [trackLoading, setTrackLoading] = useState(false);

  const faqs = [
    {
      q: "How does RK Associates' 15-minute cashless claim approval work?",
      a: "When admitted to any of our 14,500+ network hospitals, the hospital desk sends your pre-authorization request digitally. Our AI adjudication model instantly reviews your active policy terms and approves room category & surgery expenses without waiting for manual human back-and-forth."
    },
    {
      q: "Is there any room-rent limit or capping on surgeries?",
      a: "Our Comprehensive and Elite plans come with ZERO Room Rent capping! You are free to choose single private AC rooms or suites without facing proportionate deduction penalties on doctors' fees or surgery charges."
    },
    {
      q: "Can I transfer my existing health policy to RK Associates without losing waiting period credit?",
      a: "Yes! Under IRDAI portability guidelines, all your accrued benefits, including pre-existing disease (PED) waiting period credits and No Claim Bonus (NCB), are 100% carried forward seamlessly."
    },
    {
      q: "What tax benefits are applicable on my insurance premium?",
      a: "Health insurance premiums qualify for income tax deductions up to ₹75,000 under Section 80D. Term Life insurance qualifies for deductions up to ₹1,50,000 under Section 80C, and claim payouts are 100% tax-free under Section 10(10D)."
    }
  ];

  const handleTrackClaim = async (claimIdToTrack) => {
    const id = claimIdToTrack || sampleClaimInput || 'CLM-89210';
    setTrackLoading(true);
    try {
      const res = await fetch(`/api/claims?q=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTrackedClaim(data.results[0]);
      } else {
        setTrackedClaim({
          claimId: id,
          status: 'Record Found: In Review',
          timeline: [
            { step: 'Claim Received', time: 'Recently', completed: true },
            { step: 'Verification', time: 'In Progress', completed: false }
          ]
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTrackLoading(false);
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="section-hero">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: '#ffffff',
              padding: '0.4rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
              border: '1px solid var(--blue-200)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <img src="/images/rk-logo.png" alt="RK Associates Pvt. Ltd." style={{ height: '26px', width: 'auto' }} />
              <span style={{ color: 'var(--blue-950)' }}>RK Associates Pvt. Ltd. • 99.4% Audited Settlement</span>
            </div>

            <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', letterSpacing: '-0.03em' }}>
              Intelligent Protection by <span className="text-gradient">RK Associates</span>
            </h1>

            <p className="section-subtitle" style={{ margin: '1rem auto 0 auto', fontSize: '1.15rem' }}>
              Zero-paperwork policies, instant cashless hospital authorization in 15 minutes, and transparent coverage with absolutely no hidden deduction clauses.
            </p>
          </div>

          {/* Interactive Hero Quick Quote Bar */}
          <QuickQuoteBar />

          {/* Trust Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            marginTop: '3.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)'
          }}>
            {[
              { value: SITE_CONFIG.headlineStats.cashlessProviders, label: "Cashless Providers", sub: "Empaneled Hospitals (Dec 2025)" },
              { value: SITE_CONFIG.headlineStats.citiesCovered, label: "Cities Covered", sub: "Pan-India Network Reach" },
              { value: SITE_CONFIG.headlineStats.claimsSettled, label: "Claims Settled", sub: "74.5 Lakh+ Claims Adjudicated" },
              { value: SITE_CONFIG.headlineStats.livesInsured, label: "Lives Insured", sub: "15 Crore+ Lives Protected" }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--blue-900)',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.02em'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. POPULAR PLANS SHOWCASE */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
            <div>
              <span className="badge badge-blue">Care Health Insurance</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
                Flagship Health Protection Plans
              </h2>
              <p className="section-subtitle">
                Explore popular plans with clear terms, 22,100+ cashless hospitals, and zero hidden co-payments.
              </p>
            </div>
            <Link href="/plans" className="btn btn-secondary">
              <span>View All 12 Plans</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {ALL_PLANS.slice(0, 5).map((plan) => (
              <div key={plan.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '16px', border: plan.slug === 'care-supreme' ? '2px solid var(--blue-600)' : '1px solid var(--slate-200)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', backgroundColor: 'var(--blue-50)', color: 'var(--blue-700)', textTransform: 'uppercase' }}>
                      {plan.category.replace('-', ' ')}
                    </span>
                    {plan.slug === 'care-supreme' && (
                      <span className="badge badge-blue" style={{ fontSize: '0.7rem' }}>Flagship Cover</span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                    {plan.name}
                  </h3>

                  <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', margin: '0.5rem 0 1.25rem 0', minHeight: '44px', lineHeight: 1.5 }}>
                    {plan.tagline}
                  </p>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', textTransform: 'uppercase', display: 'block' }}>
                      Sum Insured Options
                    </span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--blue-900)' }}>
                      {plan.startingAtDaily ? plan.startingAtDaily : '₹7L to ₹1 Crore'}
                    </span>
                  </div>

                  <Link href={`/plans/${plan.slug}`} className="btn btn-secondary btn-sm">
                    <span>View Plan</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}

            {/* Quick Consultation Highlight Card */}
            <div className="card card-primary-gradient" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '16px' }}>
              <div>
                <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: '#ffffff' }}>
                  Licensed Advisory Desk
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '1rem', color: '#ffffff' }}>
                  Need Guidance on Choosing the Right Plan?
                </h3>
                <p style={{ color: 'var(--blue-100)', marginTop: '0.75rem', fontSize: '0.925rem', lineHeight: '1.5' }}>
                  Connect with certified insurance experts at RK Associates for personalized family coverage analysis and tax optimization under Section 80D.
                </p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <Link href="/quote" className="btn btn-outline-white" style={{ width: '100%', textAlign: 'center' }}>
                  <PhoneCall size={16} />
                  <span>Get Instant Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CARE HEALTH & RK ASSOCIATES ADVANTAGE */}
      <section className="section" style={{ backgroundColor: 'var(--slate-50)', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
            <span className="badge badge-blue">Built Different</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              Why Millions Choose RK Associates
            </h2>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
              We rebuilt insurance infrastructure from scratch to eliminate bureaucratic delays, hidden deductions, and opaque paperwork.
            </p>
          </div>

          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Interactive Feature List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                {
                  title: "15-Minute Instant Cashless Approvals",
                  desc: "Say goodbye to 6-hour waits in hospital lobbies. Our AI triage system issues hospital pre-authorization approvals in under 18 minutes.",
                  icon: Zap
                },
                {
                  title: "Zero Room Rent Capping Penalties",
                  desc: "Choose the private room comfort your recovery requires without fear of proportional cuts on surgeon or medicine charges.",
                  icon: Award
                },
                {
                  title: "22,100+ Cashless Healthcare Providers",
                  desc: "Across 1,400+ cities in India (Dec 2025 audited count). Direct cashless admission with your Care Health Card.",
                  icon: Building2
                },
                {
                  title: "100% Tax Deductions Under Sec 80D & 80C",
                  desc: "Maximize legitimate tax relief every financial year. Automated tax certificates available instantly inside your portal.",
                  icon: FileCheck2
                }
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: 'var(--blue-50)',
                      color: 'var(--blue-600)',
                      padding: '10px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue-950)' }}>
                        {feat.title}
                      </h4>
                      <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Comparison Table Box */}
            <div className="card" style={{ backgroundColor: '#ffffff', border: '2px solid var(--blue-200)', padding: '2rem' }}>
              <div style={{ borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                  How We Compare Side-by-Side
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                  Transparent benchmark against industry legacy providers
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { feature: "Claim Intimation via App", rkAssociates: "Under 2 Minutes", legacy: "Physical Paperwork" },
                  { feature: "Cashless Pre-Auth Turnaround", rkAssociates: "15-18 Minutes (AI)", legacy: "4 to 8 Hours" },
                  { feature: "Room Rent Deductions", rkAssociates: "Zero Limits", legacy: "1% to 2% Cap Penalty" },
                  { feature: "Cashless Garage Network", rkAssociates: "7,800+ Garages", legacy: "Limited Tie-ups" },
                  { feature: "Audit Settlement Ratio", rkAssociates: "99.4% Verified", legacy: "85% - 91%" },
                ].map((row, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    backgroundColor: idx % 2 === 0 ? 'var(--blue-25)' : '#ffffff'
                  }}>
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--slate-700)' }}>
                      {row.feature}
                    </span>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        color: '#065f46',
                        backgroundColor: 'var(--emerald-100)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: 700
                      }}>
                        <Check size={12} strokeWidth={3} /> {row.rkAssociates}
                      </span>

                      <span style={{
                        color: 'var(--slate-400)',
                        fontSize: '0.78rem',
                        textDecoration: 'line-through'
                      }}>
                        {row.legacy}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Textured Corporate Identity Card Showcase */}
              <div style={{
                marginTop: '1.5rem',
                padding: '0.75rem',
                backgroundColor: 'var(--slate-50)',
                borderRadius: '12px',
                border: '1px solid var(--slate-200)',
                textAlign: 'center'
              }}>
                <img
                  src="/images/rk-logo-card.png"
                  alt="RK Associates Corporate Card"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(11, 37, 69, 0.08)'
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '0.5rem', display: 'block', fontWeight: 600 }}>
                  Official Registered Corporate Seal • RK Associates Pvt. Ltd.
                </span>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <Link href="/plans" className="btn btn-primary" style={{ width: '100%' }}>
                  <span>Switch to RK Associates Today</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE CLAIMS TRACKER PREVIEW */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="glass-card" style={{
            padding: '3rem 2rem',
            background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
            border: '1px solid var(--blue-200)'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
              <span className="badge badge-blue">Claims Transparency</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
                Test Our Real-Time Claim Tracker
              </h2>
              <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
                Enter any claim reference or test our pre-loaded live case <code style={{ backgroundColor: 'var(--blue-100)', padding: '2px 6px', borderRadius: '4px', color: 'var(--blue-800)' }}>CLM-89210</code>.
              </p>
            </div>

            {/* Tracker Input Bar */}
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={18} style={{ position: 'absolute', top: '15px', left: '14px', color: 'var(--slate-400)' }} />
                <input
                  type="text"
                  placeholder="Enter Claim ID (e.g. CLM-89210)"
                  value={sampleClaimInput}
                  onChange={(e) => setSampleClaimInput(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '42px', height: '48px', fontSize: '0.95rem' }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleTrackClaim()}
                disabled={trackLoading}
                className="btn btn-primary"
                style={{ height: '48px', padding: '0 1.5rem' }}
              >
                {trackLoading ? 'Searching...' : 'Track Claim Status'}
              </button>
            </div>

            {/* Sample Claim Quick Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', alignSelf: 'center' }}>Try demo cases:</span>
              {['CLM-89210', 'CLM-77304', 'CLM-61092'].map((id) => (
                <button
                  key={id}
                  onClick={() => {
                    setSampleClaimInput(id);
                    handleTrackClaim(id);
                  }}
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--blue-200)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: 'var(--blue-700)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {id}
                </button>
              ))}
            </div>

            {/* Track Result Card */}
            {trackedClaim && (
              <div style={{
                marginTop: '2rem',
                backgroundColor: '#ffffff',
                border: '1px solid var(--blue-300)',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: 'var(--shadow-md)',
                maxWidth: '750px',
                margin: '2rem auto 0 auto'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Claim Reference ID</span>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                      {trackedClaim.claimId}
                    </h4>
                  </div>
                  <div>
                    <span className="badge badge-success">
                      {trackedClaim.status || 'Active & In Progress'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Policyholder</span>
                    <div style={{ fontWeight: 700, color: 'var(--slate-800)' }}>{trackedClaim.policyHolder || 'Verified Insured'}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Coverage Type</span>
                    <div style={{ fontWeight: 700, color: 'var(--slate-800)' }}>{trackedClaim.planName || 'Comprehensive Guard'}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Approved Amount</span>
                    <div style={{ fontWeight: 800, color: 'var(--emerald-500)', fontSize: '1.1rem' }}>
                      ${(trackedClaim.approvedAmount || 145000).toLocaleString()} Cashless
                    </div>
                  </div>
                </div>

                {/* Timeline display */}
                {trackedClaim.timeline && (
                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue-900)', display: 'block', marginBottom: '0.75rem' }}>
                      Live Progress Timeline
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {trackedClaim.timeline.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: item.completed ? 'var(--emerald-100)' : 'var(--slate-100)',
                            color: item.completed ? '#059669' : 'var(--slate-400)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}>
                            {item.completed ? '✓' : idx + 1}
                          </div>
                          <span style={{ fontSize: '0.88rem', fontWeight: item.completed ? 600 : 400, color: item.completed ? 'var(--slate-800)' : 'var(--slate-400)' }}>
                            {item.step}
                          </span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginLeft: 'auto' }}>
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. VERIFIED CLIENT REVIEWS */}
      <section className="section" style={{ backgroundColor: 'var(--slate-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-blue">Real Stories</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              Trusted When It Matters Most
            </h2>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
              Discover how our instant cashless adjudication relieved stress for thousands of families during critical moments.
            </p>
          </div>

          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '1rem' }}>
                    {[...Array(t.rating)].map((_, idx) => (
                      <Star key={idx} size={16} fill="#f59e0b" />
                    ))}
                  </div>

                  <p style={{ fontStyle: 'italic', color: 'var(--slate-700)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--slate-100)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--blue-600)',
                    color: '#ffffff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem'
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--blue-950)', fontSize: '0.95rem' }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                      {t.role} • {t.location}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--emerald-500)', marginTop: '2px' }}>
                      {t.claimAmount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section className="section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-blue">Clear Answers</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              Frequently Asked Questions
            </h2>
            <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
              Everything you need to know about policy inclusions, claims, and tax relief.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--slate-200)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: openFaq === idx ? 'var(--blue-25)' : '#ffffff',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: 'var(--blue-950)'
                  }}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} color="var(--blue-600)" /> : <ChevronDown size={20} color="var(--slate-400)" />}
                </button>
                {openFaq === idx && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    color: 'var(--slate-600)',
                    fontSize: '0.95rem',
                    lineHeight: '1.6'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, #071930 0%, #0b2545 50%, #0284c7 100%)',
        color: '#ffffff',
        padding: '5rem 0',
        position: 'relative'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
            Ready for Comprehensive, Stress-Free Protection?
          </h2>
          <p style={{ color: 'var(--blue-100)', fontSize: '1.15rem', marginTop: '1rem', lineHeight: '1.6' }}>
            Get a tailored quote in less than 60 seconds with zero paperwork, or connect with our underwriting team for personal guidance.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            <Link href="/quote" className="btn btn-primary btn-lg" style={{ backgroundColor: '#ffffff', color: 'var(--blue-900)', boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}>
              <span>Calculate Instant Quote</span>
              <ArrowRight size={18} />
            </Link>
            <Link href="/claims" className="btn btn-outline-white btn-lg">
              <FileCheck2 size={18} />
              <span>Explore Claims Hub</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
