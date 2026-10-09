import React from 'react';
import Link from 'next/link';
import { 
  RotateCw, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Clock, 
  CheckCircle2, 
  FileCheck, 
  HelpCircle,
  PhoneCall,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { OFFICIAL_LINKS } from '../../data/links';
import { SITE_CONFIG } from '../../data/config';

export const metadata = {
  title: 'Renew Your Care Health Policy Online | RK Associates Advisory',
  description: 'Renew your Care Health Insurance policy instantly. Retain cumulative bonus, maintain continuous waiting period benefits, and save with renewal discounts.',
};

export default function RenewPage() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-950) 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '4rem 1rem 3.5rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#7dd3fc',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <RotateCw size={15} />
            <span>Direct Official Insurer Portal</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Renew Your Care Health Policy Instantly
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--blue-100)',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Protect your health continuity. Renew your active Care Health Insurance plan directly on the official portal to preserve your accrued Cumulative Bonus and waiting-period credits.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={OFFICIAL_LINKS.renewPolicy.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.75rem', fontSize: '1rem' }}
            >
              <RotateCw size={18} />
              <span>Go to Official Renewal Portal</span>
              <ExternalLink size={16} />
            </a>
            
            <a 
              href={`https://api.whatsapp.com/send?phone=${SITE_CONFIG.insurerWhatsApp}&text=Hi,%20I%20need%20help%20with%20my%20Care%20Insurance%20policy%20renewal.`}
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.85rem 1.75rem' }}
            >
              <span>WhatsApp Renewal Assistance</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="container" style={{ maxWidth: '960px', margin: '3rem auto 0', padding: '0 1rem' }}>
        
        {/* Why Renew On Time */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Crucial Benefits of Renewing Before Policy Expiry
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            
            <div style={{ padding: '1.25rem', borderRadius: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <Award size={22} color="#16a34a" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#166534', margin: 0 }}>
                  Cumulative Bonus Protected
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#14532d', lineHeight: 1.5, margin: 0 }}>
                On plans like Care Supreme, your Sum Insured expands by 50% per claim-free year (up to 100%). Timely renewal guarantees you never forfeit this bonus.
              </p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '12px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <Clock size={22} color="#2563eb" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e40af', margin: 0 }}>
                  Waiting Period Continuity
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.5, margin: 0 }}>
                A lapse resets waiting periods for pre-existing diseases (PED) and specified ailments back to zero. Renewing maintains your completed tenure.
              </p>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: '12px', backgroundColor: '#fefce8', border: '1px solid #fef08a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                <Sparkles size={22} color="#ca8a04" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#854d0e', margin: 0 }}>
                  Up to 30% Renewal Discount
                </h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#713f12', lineHeight: 1.5, margin: 0 }}>
                Earn renewal and wellness discounts on eligible Care products along with long-term tenure discounts (for 2 or 3 year renewals).
              </p>
            </div>

          </div>
        </div>

        {/* 3 Step Renewal Process */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '2.25rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2.5rem'
        }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--blue-950)', marginBottom: '1.5rem' }}>
            Quick 3-Step Online Renewal Process
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--blue-600)',
                color: '#ffffff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                1
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
                  Enter Policy Number & DOB / Mobile
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                  Visit <a href={OFFICIAL_LINKS.renewPolicy.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-600)', textDecoration: 'underline' }}>renew.careinsurance.com</a> and enter your existing Care Health Insurance policy number and primary insured’s date of birth.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--blue-600)',
                color: '#ffffff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                2
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
                  Review Policy Details & Add-Ons
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                  Verify your insured members, Sum Insured, accrued cumulative bonus, and modify add-on covers (such as OPD or Care Shield) if needed.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--blue-600)',
                color: '#ffffff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                3
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>
                  Pay Online & Download Instant Policy Kit
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                  Complete payment via UPI, Net Banking, Credit/Debit Card or EMI. Your renewed policy schedule and 80D Tax Certificate are generated instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Advisory Assistance */}
        <div style={{
          backgroundColor: 'var(--blue-900)',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '2rem 2.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Have Questions or Want to Enhance Your Sum Insured?
            </h3>
            <p style={{ color: 'var(--blue-200)', fontSize: '0.95rem', margin: 0, maxWidth: '580px' }}>
              Connect with our licensed advisors at RK Associates Pvt. Ltd. for assistance with policy modifications, porting, or adding family members during renewal.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a 
              href={`tel:${SITE_CONFIG.insurerServicePhone}`}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <PhoneCall size={16} />
              <span>Toll-Free: {SITE_CONFIG.insurerServicePhone}</span>
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}
