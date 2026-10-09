'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { OFFICIAL_LINKS } from '@/data/links';
import { SITE_CONFIG } from '@/data/config';
import { 
  Building2, 
  Search, 
  MapPin, 
  ExternalLink, 
  AlertTriangle, 
  FileText, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function HospitalLocatorPage() {
  const [activeTab, setActiveTab] = useState('ipd'); // 'ipd' | 'opd'
  const [searchCity, setSearchCity] = useState('');
  const [searchPincode, setSearchPincode] = useState('');

  const popularCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Vijayawada', 'Kolkata', 'Pune', 'Ahmedabad', 'Surat', 
    'Lucknow', 'Nagpur', 'Kochi', 'Coimbatore', 'Indore', 'Gurgaon'
  ];

  const handleOfficialSearch = () => {
    const baseUrl = OFFICIAL_LINKS.hospitalLocator.url;
    const query = searchCity ? `?city=${encodeURIComponent(searchCity)}` : '';
    window.open(`${baseUrl}${query}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '3.5rem 0 2.5rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="badge badge-blue">Verified Network</span>
          <h1 className="section-title" style={{ marginTop: '0.5rem' }}>
            Cashless Hospital & OPD Locator
          </h1>
          <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
            Access over <strong>{SITE_CONFIG.headlineStats.cashlessProviders}</strong> cashless healthcare providers across <strong>{SITE_CONFIG.headlineStats.citiesCovered}</strong> cities ({SITE_CONFIG.headlineStats.asOfDate} data).
          </p>

          {/* IPD vs OPD Tabs */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: '#ffffff',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid var(--blue-200)',
            boxShadow: 'var(--shadow-sm)',
            marginTop: '2rem',
            gap: '4px'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('ipd')}
              style={{
                padding: '8px 22px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeTab === 'ipd' ? 'var(--blue-600)' : 'transparent',
                color: activeTab === 'ipd' ? '#ffffff' : 'var(--slate-600)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Hospitals (IPD In-patient)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('opd')}
              style={{
                padding: '8px 22px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: activeTab === 'opd' ? 'var(--blue-600)' : 'transparent',
                color: activeTab === 'opd' ? '#ffffff' : 'var(--slate-600)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              Daycare & OPD Centers
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px', marginTop: '2.5rem' }}>
        {/* Search Card */}
        <div className="card" style={{ padding: '2.25rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1.25rem' }}>
            Search Certified Network Providers ({activeTab === 'ipd' ? 'In-Patient Hospitalization' : 'OPD Clinics'})
          </h2>

          <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">City or State</label>
              <input
                type="text"
                placeholder="e.g. Mumbai, Bangalore, Delhi..."
                className="form-control"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Pincode (Optional)</label>
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 400051"
                className="form-control"
                value={searchPincode}
                onChange={(e) => setSearchPincode(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleOfficialSearch}
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
          >
            <Search size={18} />
            <span>Search on Official Live Network Locator</span>
            <ExternalLink size={16} />
          </button>

          <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', textAlign: 'center', marginTop: '0.75rem' }}>
            Opens the official Care Health Insurance real-time network database with your search filters applied.
          </p>

          {/* Popular Cities */}
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-600)', display: 'block', marginBottom: '0.5rem' }}>
              Quick City Shortcuts:
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {popularCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSearchCity(city);
                    const url = `${OFFICIAL_LINKS.hospitalLocator.url}?city=${encodeURIComponent(city)}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                  }}
                  style={{
                    backgroundColor: 'var(--blue-50)',
                    border: '1px solid var(--blue-200)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: 'var(--blue-700)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Specific Network Warning & Bank Policies */}
        <div className="card" style={{ marginTop: '2rem', backgroundColor: 'var(--blue-25)', border: '1px solid var(--blue-200)', padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} color="var(--blue-600)" />
            <span>Product-Specific & Group Policy Guidelines</span>
          </h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.5rem', lineHeight: '1.5' }}>
            <li>
              <strong>Bank-Linked Policies:</strong> Policies issued under bank group tie-ups (such as Union Bank of India or Punjab National Bank groups) have distinct customized network hospital rosters. Please refer to your certificate of insurance.
            </li>
            <li>
              <strong>Limited Network Policies:</strong> If your policy includes Smart Select or Gramin Care options, verify the specific certified tier before planned admission.
            </li>
            <li>
              <strong>Results via SMS/Email:</strong> When querying on the official portal, you can request hospital address and TPA desk contacts directly to your mobile via SMS.
            </li>
          </ul>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/excluded-hospitals" className="btn btn-secondary btn-sm">
              <ShieldAlert size={14} color="var(--rose-500)" />
              <span>Check Excluded Hospitals List</span>
            </Link>

            <a
              href={OFFICIAL_LINKS.tpaList.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <FileText size={14} />
              <span>View TPA Network List</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
