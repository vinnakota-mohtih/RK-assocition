'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck,
  Building2
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { OFFICIAL_LINKS } from '../data/links';

export default function Footer() {
  return (
    <footer className="footer-wrapper" style={{
      backgroundColor: 'var(--blue-950)',
      color: 'var(--slate-300)',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      borderTop: '3px solid var(--blue-600)'
    }} suppressHydrationWarning>
      <div className="container">
        
        {/* Top Header Row: Brand & Quick Contact */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              <div style={{
                backgroundColor: '#ffffff',
                padding: '6px 12px',
                borderRadius: '10px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'transform 0.2s ease'
              }}>
                <img
                  src="/images/rk-footer-logo-clean.png"
                  alt="RK Associates Pvt. Ltd."
                  style={{
                    height: '52px',
                    width: 'auto',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    display: 'block'
                  }}
                />
              </div>
            </Link>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', display: 'block', lineHeight: 1.2 }}>
                RK ASSOCIATES PVT. LTD.
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--blue-300)', letterSpacing: '0.04em' }}>
                Corporate Partner for {SITE_CONFIG.insurerName} • IRDAI Reg. No. {SITE_CONFIG.insurerIrdaiRegNo}
              </span>
            </div>
          </div>

          {/* Quick Contact Badges */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a 
              href={`tel:${SITE_CONFIG.insurerServicePhone}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#e2e8f0',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <Phone size={14} color="var(--blue-400)" />
              <span>Helpline: {SITE_CONFIG.insurerServicePhone}</span>
            </a>

            <a 
              href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.agencyWhatsApp}&text=Hi,%20I%20have%20an%20insurance%20query.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#86efac',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                padding: '0.45rem 0.95rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid rgba(34, 197, 94, 0.2)'
              }}
            >
              <MessageSquare size={14} color="#22c55e" />
              <span>WhatsApp: +91 {SITE_CONFIG.insurerWhatsApp}</span>
            </a>
          </div>
        </div>

        {/* Middle Navigation Grid: Clean 3-Column Minimal Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          paddingTop: '2.5rem',
          paddingBottom: '2.5rem'
        }}>
          {/* Column 1: Popular Plans */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Care Health Plans
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link href="/plans/care-supreme" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Care Supreme (Flagship)</Link></li>
              <li><Link href="/plans/care-advantage" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Care Advantage (₹1 Cr Shield)</Link></li>
              <li><Link href="/plans/joy-maternity" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Joy (Maternity & Newborn)</Link></li>
              <li><Link href="/plans/supreme-enhance" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Supreme Enhance (Super Top-up)</Link></li>
              <li><Link href="/compare" style={{ color: 'var(--blue-400)', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 600 }}>Compare Plans Side-by-Side →</Link></li>
            </ul>
          </div>

          {/* Column 2: Key Services */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link href="/hospital-locator" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>22,100+ Cashless Hospital Locator</Link></li>
              <li><Link href="/claims" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Claims Center & Checklist</Link></li>
              <li><Link href="/renew" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Direct Online Policy Renewal</Link></li>
              <li><Link href="/downloads" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Brochures & Literature Downloads</Link></li>
              <li>
                <a href={OFFICIAL_LINKS.selfHelpPortal.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Self-Help Customer Portal</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Advisory & Legal */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Advisory & Disclosures
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li><Link href="/legal/disclaimer" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Regulatory Compliance & IRDAI Notices</Link></li>
              <li><Link href="/excluded-hospitals" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Excluded / Non-Preferred Providers</Link></li>
              <li><Link href="/about" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>About RK Associates</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--slate-400)', fontSize: '0.88rem', textDecoration: 'none' }}>Contact & Grievance Redressal</Link></li>
              <li>
                <a href={OFFICIAL_LINKS.bimaBharosa.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-400)', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>IRDAI Bima Bharosa Portal</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Minimal Bottom Bar */}
        <div style={{
          paddingTop: '1.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.78rem',
          color: 'var(--slate-400)'
        }}>
          <div>
            <p suppressHydrationWarning style={{ margin: 0 }}>
              © 2026 {SITE_CONFIG.agencyName}. Insurance is the subject matter of solicitation.
            </p>
            <p style={{ margin: '2px 0 0', color: 'var(--slate-400)', fontSize: '0.74rem' }}>
              Care Health Insurance Limited (IRDAI Reg. No. {SITE_CONFIG.insurerIrdaiRegNo}, CIN: {SITE_CONFIG.insurerCIN}).
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <Link href="/legal/disclaimer" style={{ color: 'var(--slate-400)', textDecoration: 'none' }}>Disclaimers</Link>
            <Link href="/contact" style={{ color: 'var(--slate-400)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/contact" style={{ color: 'var(--slate-400)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
