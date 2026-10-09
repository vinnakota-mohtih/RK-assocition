'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ALL_PLANS } from '@/data/plans';
import { Check, X, ArrowRight, ExternalLink } from 'lucide-react';
import { OFFICIAL_LINKS } from '@/data/links';

export default function ComparePage() {
  const [selectedPlanIds, setSelectedPlanIds] = useState(['care-supreme', 'ultimate-care', 'care-advantage']);

  const selectedPlans = ALL_PLANS.filter(p => selectedPlanIds.includes(p.slug));

  const handleSelectPlan = (slotIndex, newSlug) => {
    setSelectedPlanIds(prev => {
      const copy = [...prev];
      copy[slotIndex] = newSlug;
      return copy;
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      <div style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '3.5rem 0 2.5rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="badge badge-blue">Side-by-Side Analysis</span>
          <h1 className="section-title" style={{ marginTop: '0.5rem' }}>
            Compare Insurance Plans
          </h1>
          <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
            Evaluate sum insured options, cumulative bonus terms, and room rent features across products before finalizing your policy.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Plan Selectors */}
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {[0, 1, 2].map((slot) => (
            <div key={slot} className="card" style={{ padding: '1.25rem' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-500)', display: 'block', marginBottom: '0.4rem' }}>
                SELECT PLAN {slot + 1}
              </label>
              <select
                className="form-control"
                value={selectedPlanIds[slot] || ''}
                onChange={(e) => handleSelectPlan(slot, e.target.value)}
                style={{ fontWeight: 600, color: 'var(--blue-950)' }}
              >
                {ALL_PLANS.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Table */}
        <div className="card" style={{ padding: '2rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--blue-200)' }}>
                <th style={{ padding: '1rem', width: '25%', color: 'var(--slate-600)', fontSize: '0.9rem' }}>Feature</th>
                {selectedPlans.map((p) => (
                  <th key={p.slug} style={{ padding: '1rem', width: '25%', color: 'var(--blue-950)', fontSize: '1.05rem', fontWeight: 800 }}>
                    {p.name}
                    {p.detailsPending && (
                      <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--slate-400)', fontWeight: 500 }}>
                        (Brochure specs pending)
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--slate-200)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--slate-700)' }}>Sum Insured Options</td>
                {selectedPlans.map((p) => (
                  <td key={p.slug} style={{ padding: '1rem', fontSize: '0.9rem' }}>
                    {p.siOptions ? p.siOptions.map(s => s.label).join(', ') : 'Refer Brochure'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--blue-25)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--slate-700)' }}>Cumulative Bonus</td>
                {selectedPlans.map((p) => (
                  <td key={p.slug} style={{ padding: '1rem', fontSize: '0.9rem' }}>
                    {p.slug === 'care-supreme' ? '+50% SI/yr (Up to 100% SI, non-reducing)' : 'Plan Specific'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--slate-200)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--slate-700)' }}>Automatic Recharge</td>
                {selectedPlans.map((p) => (
                  <td key={p.slug} style={{ padding: '1rem', fontSize: '0.9rem' }}>
                    {p.slug === 'care-supreme' ? 'Unlimited Times (100% of SI each time)' : 'Available on Select Tiers'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--blue-25)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--slate-700)' }}>Room Rent Limit</td>
                {selectedPlans.map((p) => (
                  <td key={p.slug} style={{ padding: '1rem', fontSize: '0.9rem' }}>
                    {p.slug === 'care-supreme' ? 'No Room Rent Capping (Single Private AC)' : 'Refer Policy Wordings'}
                  </td>
                ))}
              </tr>

              <tr style={{ borderBottom: '1px solid var(--slate-200)' }}>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--slate-700)' }}>Pre / Post Hospitalization</td>
                {selectedPlans.map((p) => (
                  <td key={p.slug} style={{ padding: '1rem', fontSize: '0.9rem' }}>
                    {p.slug === 'care-supreme' ? '60 Days Pre / 180 Days Post' : 'Refer Prospectus'}
                  </td>
                ))}
              </tr>

              <tr>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--slate-700)' }}>Action</td>
                {selectedPlans.map((p) => (
                  <td key={p.slug} style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <Link href={`/plans/${p.slug}`} className="btn btn-secondary btn-sm">
                        <span>View Details</span>
                        <ArrowRight size={14} />
                      </Link>
                      <a
                        href={OFFICIAL_LINKS.quoteAbacus.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <span>Official Quote</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
