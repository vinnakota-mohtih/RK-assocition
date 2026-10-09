'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { NETWORK_PROVIDERS } from '@/data/networkHospitals';
import { OFFICIAL_LINKS } from '@/data/links';
import { SITE_CONFIG } from '@/data/config';
import { 
  FileCheck2, 
  Search, 
  PlusCircle, 
  Building2, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Phone, 
  MapPin, 
  UploadCloud, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  Download,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Receipt,
  FileSpreadsheet
} from 'lucide-react';

export default function ClaimsPage() {
  const [activeTab, setActiveTab] = useState('process'); // 'process' | 'track' | 'file' | 'network'
  
  // Track state
  const [searchQuery, setSearchQuery] = useState('CLM-89210');
  const [trackResult, setTrackResult] = useState(null);
  const [loadingTrack, setLoadingTrack] = useState(false);

  // File Claim state
  const [fileForm, setFileForm] = useState({
    policyNumber: 'POL-HLTH-2024-918',
    policyHolder: 'Rahul Sharma',
    category: 'health',
    incidentDate: new Date().toISOString().split('T')[0],
    claimedAmount: 75000,
    hospitalOrGarage: 'Apollo Multispecialty Hospital',
    description: 'Emergency appendectomy surgery and 2-day in-patient admission.'
  });
  const [fileLoading, setFileLoading] = useState(false);
  const [filedSuccess, setFiledSuccess] = useState(null);

  // Network Locator state
  const [networkType, setNetworkType] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');

  // Trigger default track on load
  useEffect(() => {
    handleSearchClaim('CLM-89210');
  }, []);

  const handleSearchClaim = async (queryToSearch) => {
    const q = queryToSearch !== undefined ? queryToSearch : searchQuery;
    if (!q.trim()) return;

    setLoadingTrack(true);
    try {
      const res = await fetch(`/api/claims?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        setTrackResult(data.results[0]);
      } else {
        setTrackResult(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTrack(false);
    }
  };

  const handleFileClaimSubmit = async (e) => {
    e.preventDefault();
    setFileLoading(true);
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fileForm)
      });
      const data = await res.json();
      if (data.success) {
        setFiledSuccess(data.claim);
        setTrackResult(data.claim);
        setFileForm({
          policyNumber: '',
          policyHolder: '',
          category: 'health',
          incidentDate: new Date().toISOString().split('T')[0],
          claimedAmount: '',
          hospitalOrGarage: '',
          description: ''
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFileLoading(false);
    }
  };

  const filteredProviders = NETWORK_PROVIDERS.filter((p) => {
    const matchesType = networkType === 'all' || p.type === networkType;
    const matchesCity = cityFilter === 'all' || p.city.toLowerCase() === cityFilter.toLowerCase();
    return matchesType && matchesCity;
  });

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Page Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--blue-950) 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '3.5rem 0 2.5rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '880px' }}>
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
            <FileCheck2 size={15} />
            <span>Official Claim Advisory & Settlement Center</span>
          </div>

          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Claims Support & Intimation
          </h1>
          
          <p style={{ color: 'var(--slate-300)', fontSize: '1.05rem', margin: '0 auto 1.75rem auto', maxWidth: '720px', lineHeight: 1.6 }}>
            Access the official Care Health Insurance portal for cashless admissions, reimbursement filing, or download official claims procedures and forms.
          </p>

          {/* Official Outbound CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a
              href={OFFICIAL_LINKS.claimPortal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <span>Care Official Claim Login Portal</span>
              <ExternalLink size={16} />
            </a>

            <a
              href={OFFICIAL_LINKS.claimsProcedurePdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <Download size={16} />
              <span>Claims Procedure (PDF)</span>
            </a>

            <a
              href={OFFICIAL_LINKS.claimForms.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <FileText size={16} />
              <span>Claim Forms Download</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            gap: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[
              { id: 'process', label: 'Claim Process & Checklist', icon: FileCheck2 },
              { id: 'track', label: 'Track Existing Claim', icon: Search },
              { id: 'file', label: 'Intimate Online', icon: PlusCircle },
              { id: 'network', label: 'Cashless Network Locator', icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    border: 'none',
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? 'var(--blue-950)' : '#ffffff',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '980px', marginTop: '2.5rem' }}>
        
        {/* TAB 0: OFFICIAL CLAIM PROCESS & CHECKLIST (SECTION 4 DATA) */}
        {activeTab === 'process' && (
          <div>
            {/* Cashless vs Reimbursement Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Cashless Process Card */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #bfdbfe',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#eff6ff',
                  color: 'var(--blue-700)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  textTransform: 'uppercase'
                }}>
                  <ShieldCheck size={14} />
                  <span>Cashless Hospitalization Flow</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1.25rem' }}>
                  4 Steps to Cashless Settlement
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>1</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Intimation Timeline</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        <strong>Planned:</strong> Inform Care at least <strong>48 hours prior</strong>.<br />
                        <strong>Emergency:</strong> Inform within <strong>24 hours</strong> of hospital admission.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>2</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Visit TPA Helpdesk</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        Walk into any network hospital (22,100+ providers) and present your Care Health Card & Govt. ID at the insurance desk.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>3</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Pre-Authorisation Review</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        Hospital submits the pre-authorisation request. Care verifies policy coverage and issues approval directly to the hospital.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--blue-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>4</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Cashless Discharge</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        At discharge, Care settles eligible medical expenses directly with the hospital. You pay only non-medical exclusions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reimbursement Process Card */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #fed7aa',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#fff7ed',
                  color: '#c2410c',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  textTransform: 'uppercase'
                }}>
                  <Receipt size={14} />
                  <span>Reimbursement Claim Flow</span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#7c2d12', marginBottom: '1.25rem' }}>
                  4 Steps to Reimbursement
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>1</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Timely Intimation</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        Intimate Care at <code>1800-102-4488</code> or via the online portal (48h prior for planned, 24h for emergency).
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>2</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Treatment & Payment</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        Receive treatment at any recognized hospital. Settle bills and collect <strong>all original itemized receipts</strong> and reports.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>3</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Submit Original Documents</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        Submit signed Claim Form with discharge summary, itemized bills, and doctor notes within 30 days of discharge.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ea580c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>4</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '0 0 2px 0' }}>Direct Account Credit</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                        Care audits the medical file and transfers approved claim funds directly to your verified bank account via NEFT.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Mandatory Document Checklist Box */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              padding: '2.25rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={22} color="var(--blue-600)" />
                Mandatory Document Checklist for Reimbursement Claims
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
                Ensure all physical documents are in original form. Incomplete documentation leads to avoidable delays.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { title: 'Duly Signed Claim Form', desc: 'Part A completed by policyholder, Part B certified by treating hospital.' },
                  { title: 'Original Discharge Summary', desc: 'With clear admission/discharge timestamps, diagnosis, and surgical notes.' },
                  { title: 'Itemized Hospital Final Bill', desc: 'Detailed breakdown of room rent, nursing, ICU, surgical and equipment charges.' },
                  { title: 'Original Payment Receipts', desc: 'Stamped money receipts with receipt numbers acknowledging payment.' },
                  { title: 'Diagnostic & Lab Reports', desc: 'All pathology, radiology (X-ray, MRI, CT scan) reports supporting hospitalization.' },
                  { title: 'Pharmacy Invoices & Prescriptions', desc: 'Medicine bills matching doctor orders with batch numbers and GST details.' },
                  { title: 'Pre & Post Hospitalization Bills', desc: 'Medical expenses up to 60 days before admission and 180 days after discharge.' },
                  { title: 'Canceled Cheque & KYC', desc: 'Personalized canceled cheque with policyholder name & IFSC for direct electronic NEFT payout.' }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1e293b', marginBottom: '4px' }}>
                      ✓ {item.title}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 1: TRACK CLAIM */}
        {activeTab === 'track' && (
          <div>
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1rem' }}>
                Search Claim by Claim ID or Policy Number
              </h2>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Enter Claim ID (e.g., CLM-89210 or CLM-77304)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control"
                  style={{ flex: 1, minWidth: '240px' }}
                />
                <button
                  type="button"
                  onClick={() => handleSearchClaim()}
                  disabled={loadingTrack}
                  className="btn btn-primary"
                >
                  <Search size={18} />
                  <span>{loadingTrack ? 'Tracking...' : 'Lookup Status'}</span>
                </button>
              </div>

              {/* Sample Quick Case Chips */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Quick Preview Cases:</span>
                {['CLM-89210', 'CLM-77304', 'CLM-61092'].map((id) => (
                  <button
                    key={id}
                    onClick={() => {
                      setSearchQuery(id);
                      handleSearchClaim(id);
                    }}
                    style={{
                      background: 'var(--blue-50)',
                      border: '1px solid var(--blue-200)',
                      padding: '3px 10px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      color: 'var(--blue-800)',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Claim Tracking Result Card */}
            {trackResult ? (
              <div className="card" style={{ padding: '2.25rem', border: '1px solid var(--blue-300)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '1.25rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Claim Reference Number
                    </span>
                    <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                      {trackResult.claimId}
                    </h3>
                  </div>

                  <span className={`badge ${trackResult.statusCode === 'SETTLED' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}>
                    {trackResult.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', margin: '1.5rem 0' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Policy Number</span>
                    <div style={{ fontWeight: 700, color: 'var(--blue-900)' }}>{trackResult.policyNumber}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Claimant</span>
                    <div style={{ fontWeight: 700, color: 'var(--blue-900)' }}>{trackResult.policyHolder}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Facility</span>
                    <div style={{ fontWeight: 700, color: 'var(--blue-900)' }}>{trackResult.hospitalOrGarage}</div>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Claimed / Approved</span>
                    <div style={{ fontWeight: 800, color: 'var(--emerald-600)' }}>
                      ₹{trackResult.claimedAmount?.toLocaleString('en-IN')} / ₹{(trackResult.approvedAmount || trackResult.claimedAmount)?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1.25rem' }}>
                    Real-time Adjudication Milestones
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {(trackResult.stages || [
                      { title: 'Intimation Submitted', done: true, time: '2 hours ago' },
                      { title: 'Hospital Medical Records Received', done: true, time: '1 hour ago' },
                      { title: 'TPA Medical Verification', done: true, time: '40 mins ago' },
                      { title: 'Approved / Settled', done: trackResult.statusCode === 'SETTLED', time: 'Just now' }
                    ]).map((s, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: s.done ? '#10b981' : '#cbd5e1',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {s.done ? '✓' : idx + 1}
                        </div>
                        <span style={{ fontWeight: s.done ? 600 : 400, color: s.done ? '#1e293b' : '#94a3b8', fontSize: '0.9rem' }}>
                          {s.title}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: 'auto' }}>
                          {s.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <AlertCircle size={40} color="var(--slate-400)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--slate-700)' }}>
                  No Claim Found for &quot;{searchQuery}&quot;
                </h3>
                <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Please verify your claim number or visit the <a href={OFFICIAL_LINKS.claimPortal.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-600)', textDecoration: 'underline' }}>official Care Claim portal</a>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FILE A NEW CLAIM */}
        {activeTab === 'file' && (
          <div>
            {filedSuccess && (
              <div style={{
                backgroundColor: 'var(--emerald-100)',
                border: '1px solid #a7f3d0',
                padding: '1.5rem',
                borderRadius: '16px',
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <CheckCircle2 size={32} color="#059669" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#065f46' }}>
                    Claim Successfully Registered! Reference: {filedSuccess.claimId}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#065f46', marginTop: '0.25rem' }}>
                    Our advisory triage team has initiated pre-authorization with the hospital desk. You can track this status now.
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('track');
                      setSearchQuery(filedSuccess.claimId);
                      handleSearchClaim(filedSuccess.claimId);
                    }}
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: '0.75rem', backgroundColor: '#059669' }}
                  >
                    <span>View Live Timeline Tracker</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <span className="badge badge-blue">Intimate to Advisor Desk</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--blue-950)', marginTop: '0.5rem' }}>
                  Submit Incident for Cashless Assistance
                </h2>
                <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  Fill in the incident details. For direct insurer submission, you can also use the <a href={OFFICIAL_LINKS.claimPortal.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-600)', textDecoration: 'underline' }}>Care Claim Login Portal</a>.
                </p>
              </div>

              <form onSubmit={handleFileClaimSubmit}>
                <div className="grid-2">
                  <div className="form-group">
                    <label className="form-label">Policy Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. POL-HLTH-2024-918"
                      className="form-control"
                      value={fileForm.policyNumber}
                      onChange={(e) => setFileForm(prev => ({ ...prev, policyNumber: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Insured Patient Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name as on Policy"
                      className="form-control"
                      value={fileForm.policyHolder}
                      onChange={(e) => setFileForm(prev => ({ ...prev, policyHolder: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Claim Category *</label>
                    <select
                      className="form-control"
                      value={fileForm.category}
                      onChange={(e) => setFileForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="health">Health / Hospitalization (Care Supreme / Advantage)</option>
                      <option value="maternity">Maternity & Delivery (Joy)</option>
                      <option value="critical">Critical Illness (Assure)</option>
                      <option value="accident">Personal Accident (Secure)</option>
                      <option value="travel">Travel Medical (Explore)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date of Incident / Admission *</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={fileForm.incidentDate}
                      onChange={(e) => setFileForm(prev => ({ ...prev, incidentDate: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Estimated Claim Amount (₹) *</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 50000"
                      className="form-control"
                      value={fileForm.claimedAmount}
                      onChange={(e) => setFileForm(prev => ({ ...prev, claimedAmount: e.target.value }))}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hospital or Clinic Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Apollo Hospital or Fortis"
                      className="form-control"
                      value={fileForm.hospitalOrGarage}
                      onChange={(e) => setFileForm(prev => ({ ...prev, hospitalOrGarage: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Incident Summary / Diagnosis</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe symptoms, diagnosis, or reason for emergency admission..."
                    className="form-control"
                    value={fileForm.description}
                    onChange={(e) => setFileForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <button
                  type="submit"
                  disabled={fileLoading}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                >
                  <Sparkles size={18} />
                  <span>{fileLoading ? 'Submitting & Alerting Desk...' : 'Submit Claim & Request Cashless Assistance'}</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: NETWORK LOCATOR */}
        {activeTab === 'network' && (
          <div>
            <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', margin: 0 }}>
                    Cashless Network Providers
                  </h2>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '4px 0 0' }}>
                    Care Health Insurance network features <strong>22,100+ cashless healthcare providers across 1,400+ cities</strong> (Dec 2025).
                  </p>
                </div>

                <Link href="/hospital-locator" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span>Official Hospital Locator</span>
                  <ExternalLink size={14} />
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label className="form-label">Facility Type</label>
                  <select
                    className="form-control"
                    value={networkType}
                    onChange={(e) => setNetworkType(e.target.value)}
                  >
                    <option value="all">All Facilities</option>
                    <option value="hospital">Hospitals Only (24x7 TPA Desk)</option>
                    <option value="garage">Cashless Auto Garages</option>
                  </select>
                </div>

                <div style={{ flex: 1, minWidth: '180px' }}>
                  <label className="form-label">City</label>
                  <select
                    className="form-control"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  >
                    <option value="all">All Cities</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Gurugram">Gurugram</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Providers Listing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filteredProviders.map((prov) => (
                <div key={prov.id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
                  <div style={{ maxWidth: '650px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                      <span className={`badge ${prov.type === 'hospital' ? 'badge-blue' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>
                        {prov.type === 'hospital' ? 'Multi-Specialty Hospital' : 'Cashless Auto Garage'}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                        ★ {prov.rating} Verified
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-950)' }}>
                      {prov.name}
                    </h3>

                    <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                      <MapPin size={15} color="var(--slate-400)" />
                      <span>{prov.address}, {prov.city}</span>
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                      {prov.specialties.map((spec, i) => (
                        <span key={i} style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-700)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--blue-700)', fontWeight: 700 }}>
                      Desk: {prov.cashlessDesk}
                    </div>
                    <a
                      href={`tel:${prov.phone}`}
                      className="btn btn-secondary btn-sm"
                      style={{ alignSelf: 'flex-end' }}
                    >
                      <Phone size={14} />
                      <span>{prov.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
