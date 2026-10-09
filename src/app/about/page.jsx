import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Users, 
  Building2, 
  Sparkles, 
  Lock, 
  FileCheck2,
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/config';

export const metadata = {
  title: 'About Us | RK Associates Pvt. Ltd. - Insurance Advisory Partner',
  description: 'Learn about RK Associates Pvt. Ltd., licensed corporate partner for Care Health Insurance Limited (IRDAI Reg. No. 148).',
};

export default function AboutPage() {
  const statsList = [
    { value: SITE_CONFIG.headlineStats.cashlessProviders, label: "Cashless Providers", sub: "Empaneled Hospitals (Dec 2025)" },
    { value: SITE_CONFIG.headlineStats.citiesCovered, label: "Cities Covered", sub: "Pan-India Healthcare Network" },
    { value: SITE_CONFIG.headlineStats.claimsSettled, label: "Claims Settled", sub: "74.5 Lakh+ Claims Adjudicated" },
    { value: SITE_CONFIG.headlineStats.livesInsured, label: "Lives Insured", sub: "15 Crore+ Insured Individuals" }
  ];

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Page Hero */}
      <div style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '4rem 0 3rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', backgroundColor: '#ffffff', padding: '0.4rem 1.25rem', borderRadius: '9999px', border: '1px solid var(--blue-200)', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
            <img src="/images/rk-logo.png" alt="RK Associates" style={{ height: '24px', width: 'auto' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--blue-950)' }}>
              RK ASSOCIATES PVT. LTD. • LICENSED CHANNEL PARTNER
            </span>
          </div>

          <h1 className="section-title" style={{ marginTop: '0.5rem' }}>
            Trusted Healthcare Advisory with <span className="text-gradient">Total Transparency</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0.75rem auto 0 auto' }}>
            RK Associates Pvt. Ltd. acts as an authorized corporate distribution partner representing Care Health Insurance Limited (IRDAI Reg. No. 148). When a medical emergency strikes, our policyholders experience prompt, frictionless financial security.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        {/* Core Metrics */}
        <div className="grid-4" style={{ marginBottom: '4rem' }}>
          {statsList.map((s, idx) => (
            <div key={idx} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--blue-600)', fontFamily: 'var(--font-display)' }}>
                {s.value}
              </div>
              <div style={{ fontWeight: 700, color: 'var(--blue-950)', marginTop: '0.5rem' }}>
                {s.label}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '4px' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Solvency Section */}
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: '4.5rem' }}>
          <div>
            <span className="badge badge-blue">Regulatory Strength</span>
            <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
              210% Solvency Ratio: Financial Bedrock You Can Rely On
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '1rem', marginTop: '1rem', lineHeight: '1.7' }}>
              The Insurance Regulatory and Development Authority (IRDAI) mandates a minimum solvency ratio of 150%. RK Associates Pvt. Ltd. maintains an extraordinary <strong>210% solvency buffer</strong>, ensuring every claim is backed by rock-solid capital reserves.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.5rem' }}>
              {[
                "Audited 99.4% Claim Settlement Ratio in FY 2025-26",
                "Direct cash reserves exceeding $3.8 Billion across sovereign deposits",
                "ISO/IEC 27001 Certified with 256-bit bank-grade encryption",
                "Paperless zero-friction claim approvals powered by automated AI adjudication"
              ].map((point, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={18} color="var(--emerald-500)" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--slate-800)', fontWeight: 500, fontSize: '0.95rem' }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Textured Corporate Seal Showcase */}
          <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#ffffff', border: '2px solid var(--blue-200)' }}>
            <img
              src="/images/rk-logo-card.png"
              alt="RK Associates Corporate Seal"
              style={{
                width: '100%',
                maxHeight: '260px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(11, 37, 69, 0.12)',
                marginBottom: '1.25rem'
              }}
            />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-950)' }}>
              RK ASSOCIATES PVT. LTD.
            </h3>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginTop: '0.35rem', lineHeight: '1.5' }}>
              Incorporated under Indian Companies Act • Registered Insurance & Risk Underwriting Firm.
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-blue">Executive Leadership</span>
          <h2 className="section-title" style={{ marginTop: '0.5rem' }}>
            Governed by Industry Pioneers
          </h2>
        </div>

        <div className="grid-3" style={{ marginBottom: '4rem' }}>
          {[
            {
              name: "Siddharth V. Raman",
              role: "Chief Executive Officer & Co-Founder",
              desc: "Former Managing Director at Global Reinsurance Corp with 22 years of underwriting leadership."
            },
            {
              name: "Dr. Meera K. Nambiar",
              role: "Chief Medical Officer",
              desc: "Former Head of Clinical Operations at Apollo Hospitals, overseeing cashless triage accuracy."
            },
            {
              name: "David Chen",
              role: "Chief Technology & AI Officer",
              desc: "Pioneered machine learning risk-scoring models that brought claim approval times down to 15 minutes."
            }
          ].map((leader, i) => (
            <div key={i} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--blue-100)',
                color: 'var(--blue-700)',
                fontSize: '1.5rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}>
                {leader.name.split(' ').map(n => n[0]).join('')}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                {leader.name}
              </h3>
              <div style={{ color: 'var(--blue-600)', fontWeight: 600, fontSize: '0.85rem', marginTop: '0.2rem' }}>
                {leader.role}
              </div>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.875rem', marginTop: '0.75rem', lineHeight: '1.55' }}>
                {leader.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{
          backgroundColor: '#ffffff',
          border: '2px solid var(--blue-200)',
          padding: '2.5rem',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue-950)' }}>
            Join 3.2 Million Policyholders Protected by RK Associates
          </h3>
          <p style={{ color: 'var(--slate-600)', maxWidth: '600px', margin: '0.5rem auto 1.5rem auto' }}>
            Get an instant custom quote with locked-in rates and cashless coverage ready immediately.
          </p>

          <Link href="/quote" className="btn btn-primary btn-lg">
            <span>Calculate Instant Quote</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
