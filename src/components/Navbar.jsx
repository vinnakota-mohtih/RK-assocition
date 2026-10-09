'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  PhoneCall, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  ShieldCheck, 
  Building2, 
  FileCheck2, 
  RotateCw, 
  Download, 
  AlertTriangle, 
  Scale, 
  Sparkles,
  ArrowRight,
  Heart,
  Baby,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'plans' | 'hospitals' | 'services'
  const navRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isDropdownActive = (prefixList) => {
    return prefixList.some(path => pathname.startsWith(path));
  };

  return (
    <div className="navbar-parent" ref={navRef} suppressHydrationWarning>
      {/* Top Emergency & Support Strip */}
      <div style={{
        backgroundColor: 'var(--blue-950)',
        color: 'var(--blue-100)',
        fontSize: '0.82rem',
        padding: '0.45rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#93c5fd' }}>
              <span className="pulse-dot"></span>
              <strong>IRDAI Reg. No. {SITE_CONFIG.insurerIrdaiRegNo}</strong> | {SITE_CONFIG.agencyName}
            </span>
            <span className="hide-mobile" style={{ opacity: 0.7 }}>•</span>
            <span style={{ color: '#e0f2fe' }}>{SITE_CONFIG.headlineStats.cashlessProviders} Cashless Providers ({SITE_CONFIG.headlineStats.asOfDate})</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a 
              href={`tel:${SITE_CONFIG.insurerServicePhone}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontWeight: 600, textDecoration: 'none' }}
            >
              <PhoneCall size={14} />
              <span>Care Helpline: {SITE_CONFIG.insurerServicePhone}</span>
            </a>
            <Link 
              href="/claims" 
              style={{ color: '#ffffff', opacity: 0.9, textDecoration: 'underline', textUnderlineOffset: '3px' }}
            >
              Emergency Claim?
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="navbar-wrapper">
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}>
          {/* Logo */}
          <Link href="/" className="nav-logo" style={{ textDecoration: 'none', marginRight: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                color: 'var(--blue-950)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}>
                RK ASSOCIATES
              </span>
              <span style={{
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase'
              }}>
                PVT. LTD. • INSURANCE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Spacious Dropdowns */}
          <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* 1. Home */}
            <Link
              href="/"
              className={`nav-link-item ${isActive('/') ? 'active' : ''}`}
              style={{ fontWeight: 600, fontSize: '0.92rem', padding: '0.5rem 0.85rem' }}
            >
              Home
            </Link>

            {/* 2. Insurance Plans (Dropdown) */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('plans')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'plans' ? null : 'plans')}
                className={`nav-link-item ${isDropdownActive(['/plans', '/compare']) ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  padding: '0.5rem 0.85rem'
                }}
              >
                <span>Plans</span>
                <ChevronDown size={15} style={{
                  transform: activeDropdown === 'plans' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} />
              </button>

              {activeDropdown === 'plans' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '320px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 12px 35px rgba(11, 37, 69, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 1100,
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  <Link
                    href="/plans/care-supreme"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '6px', color: 'var(--blue-600)' }}>
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Care Supreme</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Flagship • Unlimited Recharge • 7x Bonus</div>
                    </div>
                  </Link>

                  <Link
                    href="/plans/care-advantage"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#f0fdf4', padding: '6px', borderRadius: '6px', color: '#16a34a' }}>
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Care Advantage</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>High Sum Insured up to ₹1 Crore</div>
                    </div>
                  </Link>

                  <Link
                    href="/plans/joy-maternity"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#fdf2f8', padding: '6px', borderRadius: '6px', color: '#db2777' }}>
                      <Baby size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Joy (Maternity Cover)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Delivery expenses & Day 1 newborn care</div>
                    </div>
                  </Link>

                  <Link
                    href="/plans/supreme-enhance"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#fefce8', padding: '6px', borderRadius: '6px', color: '#ca8a04' }}>
                      <PlusCircle size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Supreme Enhance (Top-up)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>High deductible super top-up protection</div>
                    </div>
                  </Link>

                  <div style={{ borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', paddingLeft: '8px', paddingRight: '8px' }}>
                    <Link href="/compare" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--blue-600)', textDecoration: 'none' }}>
                      Compare Plans →
                    </Link>
                    <Link href="/plans" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', textDecoration: 'none' }}>
                      View All 12 Plans
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Hospitals (Dropdown) */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('hospitals')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'hospitals' ? null : 'hospitals')}
                className={`nav-link-item ${isDropdownActive(['/hospital-locator', '/excluded-hospitals']) ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  padding: '0.5rem 0.85rem'
                }}
              >
                <span>Hospitals</span>
                <ChevronDown size={15} style={{
                  transform: activeDropdown === 'hospitals' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} />
              </button>

              {activeDropdown === 'hospitals' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '290px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 12px 35px rgba(11, 37, 69, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 1100,
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  <Link
                    href="/hospital-locator"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '6px', color: 'var(--blue-600)' }}>
                      <Building2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Cashless Hospital Locator</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>22,100+ Network Hospitals & IPD/OPD</div>
                    </div>
                  </Link>

                  <Link
                    href="/excluded-hospitals"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#fef2f2', padding: '6px', borderRadius: '6px', color: '#dc2626' }}>
                      <AlertTriangle size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Excluded Hospitals</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Non-preferred list & stabilization rules</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Claims & Services (Dropdown) */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className={`nav-link-item ${isDropdownActive(['/claims', '/renew', '/downloads']) ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  padding: '0.5rem 0.85rem'
                }}
              >
                <span>Services</span>
                <ChevronDown size={15} style={{
                  transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }} />
              </button>

              {activeDropdown === 'services' && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  width: '290px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 12px 35px rgba(11, 37, 69, 0.15)',
                  border: '1px solid #e2e8f0',
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 1100,
                  animation: 'fadeIn 0.15s ease-out'
                }}>
                  <Link
                    href="/claims"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#eff6ff', padding: '6px', borderRadius: '6px', color: 'var(--blue-600)' }}>
                      <FileCheck2 size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Claims Center</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>4-Step Cashless, Track & Document List</div>
                    </div>
                  </Link>

                  <Link
                    href="/renew"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#f0fdf4', padding: '6px', borderRadius: '6px', color: '#16a34a' }}>
                      <RotateCw size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Renew Policy Online</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Retain NCB & Waiting Period continuity</div>
                    </div>
                  </Link>

                  <Link
                    href="/downloads"
                    className="dropdown-item-card"
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1e293b'
                    }}
                  >
                    <div style={{ backgroundColor: '#f8fafc', padding: '6px', borderRadius: '6px', color: '#475569' }}>
                      <Download size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Downloads & Brochures</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>All official policy wordings & prospectuses</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 5. About */}
            <Link
              href="/about"
              className={`nav-link-item ${isActive('/about') ? 'active' : ''}`}
              style={{ fontWeight: 600, fontSize: '0.92rem', padding: '0.5rem 0.85rem' }}
            >
              About
            </Link>

            {/* 6. Contact */}
            <Link
              href="/contact"
              className={`nav-link-item ${isActive('/contact') ? 'active' : ''}`}
              style={{ fontWeight: 600, fontSize: '0.92rem', padding: '0.5rem 0.85rem' }}
            >
              Contact
            </Link>
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link 
              href="/quote" 
              className="btn btn-primary btn-sm" 
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <span>Get Free Quote</span>
              <ChevronRight size={15} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'var(--blue-50)',
                border: '1px solid var(--blue-200)',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                color: 'var(--blue-900)',
                display: 'none', // Shown only on mobile screens via media query
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="mobile-toggle-btn"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid var(--slate-200)',
            padding: '1.25rem 1.5rem',
            boxShadow: 'var(--shadow-xl)',
            animation: 'fadeIn 0.2s ease-in-out'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Home
              </Link>
              <Link
                href="/plans"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Insurance Plans (All 12)
              </Link>
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Compare Plans
              </Link>
              <Link
                href="/hospital-locator"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Cashless Hospital Locator
              </Link>
              <Link
                href="/claims"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Claims Center & Checklist
              </Link>
              <Link
                href="/renew"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Direct Online Policy Renewal
              </Link>
              <Link
                href="/downloads"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Downloads & Brochures
              </Link>
              <Link
                href="/excluded-hospitals"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Excluded / Non-Preferred Hospitals
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                About RK Associates
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.65rem', fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
              >
                Contact & Grievances
              </Link>

              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link
                  href="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-primary"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  <span>Instant Premium Quote</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
