'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INITIAL_USER_POLICIES } from '@/data/sampleClaims';
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Clock, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  HeartHandshake,
  Car
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('policies');
  const [policies, setPolicies] = useState(INITIAL_USER_POLICIES);
  const [downloadModal, setDownloadModal] = useState(null);
  const [renewedId, setRenewedId] = useState(null);

  const handleRenew = (id) => {
    setRenewedId(id);
    setTimeout(() => {
      setPolicies(prev => prev.map(p => {
        if (p.policyId === id) {
          return {
            ...p,
            renewalDate: '2027-11-14',
            status: 'Renewed & Active'
          };
        }
        return p;
      }));
    }, 800);
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #071930 0%, #0b2545 60%, #0284c7 100%)',
        color: '#ffffff',
        padding: '3rem 0 2.5rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span className="badge" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', color: '#bae6fd' }}>
              Welcome back, Rahul Sharma
            </span>
            <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginTop: '0.4rem', color: '#ffffff' }}>
              Policyholder Dashboard
            </h1>
            <p style={{ color: 'var(--blue-100)', fontSize: '0.95rem' }}>
              Client ID: <strong style={{ color: '#ffffff' }}>RKA-USR-89104</strong> • All 3 policies active with verified cashless cover
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link href="/quote" className="btn btn-outline-white btn-sm">
              <Sparkles size={16} />
              <span>Add New Coverage</span>
            </Link>
            <Link href="/claims" className="btn btn-primary btn-sm" style={{ backgroundColor: '#ffffff', color: 'var(--blue-950)' }}>
              <span>Intimate a Claim</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          borderBottom: '1px solid var(--slate-200)',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          overflowX: 'auto'
        }}>
          {[
            { id: 'policies', label: `Active Policies (${policies.length})` },
            { id: 'certificates', label: 'Tax Certificates (Sec 80D/80C)' },
            { id: 'renewals', label: 'Upcoming Renewals' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === tab.id ? 'var(--blue-600)' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : 'var(--slate-600)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: POLICIES */}
        {activeTab === 'policies' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {policies.map((p) => (
              <div key={p.policyId} className="card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '1.25rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge badge-blue">{p.category.toUpperCase()}</span>
                      <span className="badge badge-success">{p.status}</span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue-950)', marginTop: '0.5rem' }}>
                      {p.title}
                    </h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                      Policy Reference: <strong style={{ color: 'var(--blue-900)' }}>{p.policyId}</strong>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', display: 'block' }}>Total Sum Insured</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--blue-900)' }}>
                      {p.sumInsured}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Covered Beneficiaries</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--slate-800)', marginTop: '2px' }}>
                      {p.insuredMembers.map((m, i) => (
                        <div key={i}>• {m}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Premium Plan</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--blue-900)', marginTop: '2px' }}>
                      {p.premiumAmount}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Expiry / Next Renewal</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--slate-800)', marginTop: '2px' }}>
                      {p.renewalDate}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--slate-100)' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setDownloadModal(p)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Download size={14} />
                      <span>Download Policy PDF</span>
                    </button>

                    <Link href={`/claims?q=${p.policyId}`} className="btn btn-secondary btn-sm">
                      <Clock size={14} />
                      <span>Claims ({p.claimsCount})</span>
                    </Link>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRenew(p.policyId)}
                    className="btn btn-primary btn-sm"
                  >
                    <span>{renewedId === p.policyId ? 'Renewed Successfully ✓' : 'Renew Policy Online'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem' }}>
              Tax Certificates for IT Returns (FY 2025-26 & 2024-25)
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Directly download digitally signed Section 80D & 80C compliance certificates to submit to your employer or CA.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { type: 'Section 80D Health Premium Certificate', period: 'FY 2025-26', amount: '$1,068 (₹88,000)', policy: 'POL-HLTH-2024-918' },
                { type: 'Section 80C Term Life Investment Receipt', period: 'FY 2025-26', amount: '$816 (₹67,500)', policy: 'POL-LIFE-2023-104' },
                { type: 'Section 80D Previous Year Assessment Certificate', period: 'FY 2024-25', amount: '$980 (₹80,500)', policy: 'POL-HLTH-2024-918' }
              ].map((cert, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1.25rem',
                  border: '1px solid var(--slate-200)',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      backgroundColor: 'var(--blue-50)',
                      color: 'var(--blue-600)',
                      padding: '10px',
                      borderRadius: '8px'
                    }}>
                      <FileText size={22} />
                    </div>
                    <div>
                      <strong style={{ color: 'var(--blue-950)' }}>{cert.type}</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                        {cert.policy} • Assessment {cert.period} • Tax Deductible Value: <strong>{cert.amount}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert(`Downloading signed certificate for ${cert.policy}...`)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: RENEWALS */}
        {activeTab === 'renewals' && (
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem' }}>
              Renewal Management & Loyalty Bonus
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Renew before expiry to preserve accumulated No Claim Bonus (NCB) and continuity benefits.
            </p>

            <div style={{ backgroundColor: 'var(--blue-50)', border: '1px solid var(--blue-200)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-warning">Action Required Within 30 Days</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-950)', marginTop: '0.5rem' }}>
                  Auto Guard Comprehensive (KA 01 MJ 4492)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)' }}>
                  Due Date: <strong>09 May 2026</strong>. 20% NCB discount unlocked for claim-free year!
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleRenew('POL-AUTO-2025-412')}
                className="btn btn-primary"
              >
                <span>Renew with 20% NCB Discount</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Modal for PDF Preview */}
        {downloadModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(7, 25, 48, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: 'var(--shadow-xl)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <CheckCircle2 size={24} color="var(--emerald-500)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                  Digital Policy Certificate Ready
                </h3>
              </div>

              <div style={{ backgroundColor: 'var(--slate-50)', padding: '1.25rem', borderRadius: '10px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <strong>Policy:</strong> {downloadModal.title} <br />
                <strong>Certificate No:</strong> {downloadModal.policyId} <br />
                <strong>Holder:</strong> {downloadModal.holderName} <br />
                <strong>Sum Insured:</strong> {downloadModal.sumInsured} <br />
                <strong>Status:</strong> Active & Digitally Signed by RK Associates Underwriting Desk
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    alert('PDF successfully generated and saved to your device.');
                    setDownloadModal(null);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  <Download size={16} />
                  <span>Save PDF Certificate</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDownloadModal(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
