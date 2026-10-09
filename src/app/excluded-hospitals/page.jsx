import React from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle,
  PhoneCall,
  Clock
} from 'lucide-react';
import { OFFICIAL_LINKS } from '../../data/links';
import { SITE_CONFIG } from '../../data/config';

export const metadata = {
  title: 'Excluded / Non-Preferred Hospitals | RK Associates & Care Health Insurance',
  description: 'Understand the list of excluded and non-preferred healthcare providers where routine claims are inadmissible, along with emergency stabilization guidelines.',
};

export default function ExcludedHospitalsPage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-950) 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '4rem 1rem 3.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#fca5a5',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <AlertTriangle size={16} />
            <span>Official Policyholder Advisory</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Excluded / Non-Preferred Hospitals
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--slate-300)',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            In accordance with IRDAI guidelines and policy conditions, claims originating from specific excluded providers are not admissible for routine treatments. Review the guidelines below to safeguard your claims.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={OFFICIAL_LINKS.excludedListPdf.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <FileText size={18} />
              <span>Download Official Excluded List (PDF)</span>
              <ExternalLink size={15} />
            </a>
            <a 
              href={OFFICIAL_LINKS.excludedHospitals.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.5rem' }}
            >
              <Search size={18} />
              <span>Search Care Online Portal</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container" style={{ maxWidth: '960px', margin: '3rem auto 0', padding: '0 1rem' }}>
        
        {/* Critical Regulatory Rule Box */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #fee2e2',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={28} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>
                Official IRDAI & Policyholder Provision
              </h2>
              <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                Expenses incurred at any hospital, day-care center, practitioner or healthcare provider specifically excluded by Care Health Insurance Limited and disclosed on its portal or notified to policyholders are <strong>not admissible</strong> under the policy.
              </p>
              
              {/* Emergency Stabilization Exception */}
              <div style={{
                backgroundColor: '#f0fdf4',
                borderLeft: '4px solid #16a34a',
                padding: '1rem 1.25rem',
                borderRadius: '0 8px 8px 0'
              }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#166534', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} />
                  Emergency Stabilization Exception:
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#14532d', lineHeight: 1.5, margin: 0 }}>
                  In a <strong>life-threatening medical emergency</strong> or immediate post-accident condition, expenses incurred <strong>strictly up to the stage of clinical stabilization</strong> are payable under reimbursement, subject to policy terms. Once stabilized, the patient must be transferred to an accredited network hospital for subsequent treatment coverage.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={20} color="var(--blue-600)" />
              1. Verify Before Admission
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Always check whether your chosen healthcare facility is on the certified network before planned admissions. Avoid non-preferred providers.
            </p>
            <Link 
              href="/hospital-locator" 
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Explore 22,100+ Network Hospitals</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={20} color="var(--blue-600)" />
              2. Intimation Timelines
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              For planned procedures, inform at least <strong>48 hours prior</strong>. In emergencies, intimate Care or our helpline within <strong>24 hours</strong> of admission.
            </p>
            <Link 
              href="/claims" 
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>View Claims Process</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PhoneCall size={20} color="var(--blue-600)" />
              3. Need Advisory Help?
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Unsure if a clinic is eligible or need assistance locating an empaneled cashless specialist nearby? Our dedicated advisors are on standby.
            </p>
            <a 
              href={`tel:${SITE_CONFIG.agencyPhone}`}
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Call Helpline: {SITE_CONFIG.agencyPhone}</span>
            </a>
          </div>

        </div>

        {/* Why Are Providers Excluded? */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={22} color="var(--blue-600)" />
            Frequently Asked Questions regarding Excluded Providers
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.35rem' }}>
                Why is a hospital placed on the excluded / non-preferred list?
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Hospitals or clinics are placed on the non-preferred list due to periodic audit findings, billing irregularities, non-compliance with statutory standards, or failure to meet the insurer’s service parameters. This protects genuine policyholders from inflated and fraudulent claims.
              </p>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.35rem' }}>
                How frequently is this list updated?
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Care Health Insurance updates this directory periodically in coordination with IRDAI and General Insurance Council (GIC) advisories. Always verify the latest official PDF or live portal list before elective medical treatments.
              </p>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.35rem' }}>
                Will Care pay if I was admitted to an excluded hospital during an accident?
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Yes, but strictly for the medical expenses incurred up to the point of stabilization. As soon as the patient is in a safe condition to be transferred, they must move to an empaneled hospital to ensure ongoing coverage.
              </p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
