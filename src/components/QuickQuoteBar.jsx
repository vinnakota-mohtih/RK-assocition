'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  HeartHandshake, 
  Car, 
  Home, 
  Plane, 
  ArrowRight, 
  Check, 
  Sparkles,
  Percent
} from 'lucide-react';

export default function QuickQuoteBar() {
  const [activeCategory, setActiveCategory] = useState('health');
  const [coverageIndex, setCoverageIndex] = useState(1);
  const [ageGroup, setAgeGroup] = useState('30');

  const coverageOptions = {
    health: [
      { label: '$60,000 / ₹5L', val: 60000, baseMonth: 49 },
      { label: '$150,000 / ₹15L', val: 150000, baseMonth: 89 },
      { label: '$500,000 / ₹50L', val: 500000, baseMonth: 149 }
    ],
    life: [
      { label: '$500,000 / ₹50L', val: 500000, baseMonth: 35 },
      { label: '$1,000,000 / ₹1 Cr', val: 1000000, baseMonth: 68 },
      { label: '$2,000,000 / ₹2 Cr', val: 2000000, baseMonth: 125 }
    ],
    motor: [
      { label: 'Third Party Legal Only', val: 20000, baseMonth: 22 },
      { label: 'Comprehensive Car Guard', val: 35000, baseMonth: 42 },
      { label: 'Zero-Dep Bumper to Bumper', val: 50000, baseMonth: 62 }
    ],
    home: [
      { label: 'Structure Only ($100k)', val: 100000, baseMonth: 18 },
      { label: 'Structure + Contents ($250k)', val: 250000, baseMonth: 28 },
      { label: 'High Value Luxury ($500k)', val: 500000, baseMonth: 55 }
    ],
    travel: [
      { label: 'Asia Pacific ($100k)', val: 100000, baseMonth: 19 },
      { label: 'Europe / Schengen ($250k)', val: 250000, baseMonth: 32 },
      { label: 'USA & Worldwide ($500k)', val: 500000, baseMonth: 48 }
    ]
  };

  const categories = [
    { id: 'health', name: 'Health', icon: ShieldAlert },
    { id: 'life', name: 'Term Life', icon: HeartHandshake },
    { id: 'motor', name: 'Motor', icon: Car },
    { id: 'home', name: 'Home', icon: Home },
    { id: 'travel', name: 'Travel', icon: Plane }
  ];

  const currentOptions = coverageOptions[activeCategory] || coverageOptions.health;
  const currentOption = currentOptions[coverageIndex] || currentOptions[0];

  // Age multiplier
  const ageMultiplier = ageGroup === '45' ? 1.45 : (ageGroup === '55' ? 2.1 : 1.0);
  const calculatedMonth = Math.round(currentOption.baseMonth * ageMultiplier);
  const calculatedAnnual = Math.round(calculatedMonth * 12 * 0.9); // 10% annual discount

  return (
    <div className="glass-card" style={{
      padding: '2rem',
      backgroundColor: '#ffffff',
      boxShadow: '0 20px 40px -10px rgba(11, 37, 69, 0.12)',
      border: '1px solid rgba(2, 132, 199, 0.2)',
      marginTop: '2rem'
    }}>
      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        overflowX: 'auto',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--slate-200)',
        marginBottom: '1.5rem'
      }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCoverageIndex(1);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '9999px',
                border: isSelected ? '1px solid var(--blue-600)' : '1px solid var(--slate-200)',
                backgroundColor: isSelected ? 'var(--blue-600)' : 'var(--slate-50)',
                color: isSelected ? '#ffffff' : 'var(--slate-700)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={18} color={isSelected ? '#ffffff' : 'var(--blue-600)'} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Controls Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        {/* Coverage Amount Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-600)', marginBottom: '0.5rem' }}>
            DESIRED COVERAGE
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <select
              value={coverageIndex}
              onChange={(e) => setCoverageIndex(Number(e.target.value))}
              className="form-control"
              style={{ fontWeight: 600, color: 'var(--blue-900)' }}
            >
              {currentOptions.map((opt, i) => (
                <option key={i} value={i}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Age Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-600)', marginBottom: '0.5rem' }}>
            PRIMARY INSURED AGE
          </label>
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="form-control"
            style={{ fontWeight: 600, color: 'var(--blue-900)' }}
          >
            <option value="25">18 - 29 Years (Young Pro)</option>
            <option value="30">30 - 44 Years (Family Tier)</option>
            <option value="45">45 - 54 Years (Comprehensive)</option>
            <option value="55">55+ Years (Senior Care)</option>
          </select>
        </div>

        {/* Calculated Premium Highlight */}
        <div style={{
          backgroundColor: 'var(--blue-50)',
          border: '1px solid var(--blue-200)',
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--blue-700)', textTransform: 'uppercase' }}>
              Estimated Premium
            </span>
            <span style={{
              backgroundColor: 'var(--emerald-100)',
              color: '#065f46',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '9999px'
            }}>
              10% OFF ANNUALLY
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '4px' }}>
            <span style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--blue-950)' }}>
              ${calculatedMonth}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--slate-600)', fontWeight: 500 }}>
              / month (${calculatedAnnual}/yr)
            </span>
          </div>
        </div>

        {/* CTA to complete */}
        <div>
          <Link
            href={`/quote?category=${activeCategory}&amount=${currentOption.val}&age=${ageGroup}`}
            className="btn btn-primary"
            style={{ width: '100%', height: '50px', fontSize: '1rem' }}
          >
            <span>Lock In Quote</span>
            <ArrowRight size={18} />
          </Link>
          <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textAlign: 'center', marginTop: '0.4rem' }}>
            ⚡ Instant PDF & zero spam calls
          </p>
        </div>
      </div>
    </div>
  );
}
