import React from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  ShieldCheck, 
  FileCheck2, 
  AlertTriangle, 
  ExternalLink, 
  HelpCircle,
  Building,
  PhoneCall
} from 'lucide-react';
import { SITE_CONFIG } from '../../../data/config';
import { OFFICIAL_LINKS } from '../../../data/links';

export const metadata = {
  title: 'Regulatory Disclaimers & Compliance Disclosures | RK Associates',
  description: 'Statutory compliance notices, IRDAI registration information, insurance solicitation rules, and official IRDAI fraud warnings.',
};

export default function RegulatoryDisclaimerPage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-950) 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '3.5rem 1rem 3rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
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
            <span>Statutory Legal & IRDAI Disclosures</span>
          </div>

          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em'
          }}>
            Regulatory Compliance & Disclaimers
          </h1>

          <p style={{
            fontSize: '1rem',
            color: 'var(--slate-300)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            In compliance with Insurance Regulatory and Development Authority of India (IRDAI) regulations and consumer protection mandates.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container" style={{ maxWidth: '920px', margin: '2.5rem auto 0', padding: '0 1rem' }}>
        
        {/* IRDAI Spurious Calls Warning Box */}
        <div style={{
          backgroundColor: '#fef2f2',
          border: '2px solid #ef4444',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <ShieldAlert size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991b1b', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS / FRAUDULENT OFFERS
              </h2>
              <p style={{ color: '#7f1d1d', fontSize: '0.95rem', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                IRDAI or its officials <strong>do not involve</strong> in activities like selling insurance policies, announcing bonuses, or investment of premiums. Any member of the public receiving such calls is requested to lodge an immediate police complaint along with details of the phone call and phone number.
              </p>
            </div>
          </div>
        </div>

        {/* Advisory / Intermediary Status */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={20} color="var(--blue-600)" />
            Intermediary Status & Channel Partnership
          </h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1rem' }}>
            <strong>{SITE_CONFIG.agencyName}</strong> ({SITE_CONFIG.agencyTagline}) operates as a corporate insurance distributor and licensed advisory channel partner. This portal serves to provide policy comparison, insurance information, advisory assistance, and facilitation services to customers seeking health insurance solutions from <strong>{SITE_CONFIG.insurerName}</strong>.
          </p>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>
            This website is owned and operated by RK Associates Pvt. Ltd. and is not the official website of Care Health Insurance Limited.
          </p>
        </div>

        {/* Insurer Statutory Details */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1rem' }}>
            Insurer Statutory Details
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
            backgroundColor: '#f8fafc',
            padding: '1.25rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Insurer Name</span>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '2px 0 0' }}>{SITE_CONFIG.insurerName}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>IRDAI Registration Number</span>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '2px 0 0' }}>IRDAI Reg. No. {SITE_CONFIG.insurerIrdaiRegNo}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Corporate Identification Number (CIN)</span>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', margin: '2px 0 0' }}>{SITE_CONFIG.insurerCIN}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Registered Office</span>
              <p style={{ fontSize: '0.9rem', color: '#1e293b', margin: '2px 0 0' }}>{SITE_CONFIG.insurerRegOffice}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Corporate Correspondence Office</span>
              <p style={{ fontSize: '0.9rem', color: '#1e293b', margin: '2px 0 0' }}>{SITE_CONFIG.insurerCorpOffice}</p>
            </div>
          </div>
        </div>

        {/* Solicitation & Premium Calculation Disclaimer */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1rem' }}>
            Insurance Solicitation & Premium Estimates
          </h3>

          <ul style={{ paddingLeft: '1.25rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <strong>Subject Matter of Solicitation:</strong> Insurance is the subject matter of solicitation. For more details on risk factors, terms and conditions, please read the respective sales brochure and policy wording carefully before concluding a sale.
            </li>
            <li>
              <strong>Indicative Premiums:</strong> All premium quotes, figures, and calculators displayed on this website are strictly indicative and illustrative. Actual premiums are determined solely by Care Health Insurance Limited based on member medical underwriting, age band, chosen Sum Insured, selected zone of residence, and applicable goods and services tax (GST).
            </li>
            <li>
              <strong>Product UIN:</strong> Each insurance product marketed has been granted a Unique Identification Number (UIN) by IRDAI. For instance, Care Supreme is registered under UIN <code>CHIHLIP25047V022425</code>. Always verify product literature.
            </li>
            <li>
              <strong>Consent for Communication:</strong> By submitting your name, phone number, and query on this portal, you explicitly authorize RK Associates Pvt. Ltd. and Care Health Insurance Limited to contact you through phone calls, SMS, WhatsApp, or email, overriding any NDNC / DND registration.
            </li>
          </ul>
        </div>

        {/* Grievance & Bima Bharosa Portal Links */}
        <div style={{
          backgroundColor: '#eff6ff',
          borderRadius: '16px',
          border: '1px solid #bfdbfe',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e40af', margin: 0 }}>
            Policyholder Grievance Redressal & Ombudsman
          </h3>
          <p style={{ color: '#1e3a8a', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            If you have an unresolved grievance regarding your policy or claim, you can access the insurer’s dedicated grievance redressal cell or escalate to the IRDAI Bima Bharosa consumer portal:
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <a 
              href={OFFICIAL_LINKS.bimaBharosa.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>IRDAI Bima Bharosa Portal</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href={OFFICIAL_LINKS.grievanceRedressal?.url || OFFICIAL_LINKS.grievance?.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Care Grievance Redressal</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}
