'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  BookOpen, 
  Filter,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { ALL_DOCUMENTS, DOCUMENT_CATEGORIES } from '../../data/documents';
import { OFFICIAL_LINKS } from '../../data/links';

export default function DownloadsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDocs = ALL_DOCUMENTS.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.planName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Header */}
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
            backgroundColor: 'rgba(56, 189, 248, 0.15)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#7dd3fc',
            padding: '6px 14px',
            borderRadius: '999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.25rem'
          }}>
            <BookOpen size={16} />
            <span>Official Policy Literature & Wordings</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Downloads & Policy Literature
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--slate-300)',
            maxWidth: '720px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Access official Care Health Insurance brochures, prospectuses, claim forms, and policy terms. Read all terms and conditions before concluding a sale.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a 
              href={OFFICIAL_LINKS.brochures.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Care Official Brochure Portal</span>
              <ExternalLink size={14} />
            </a>
            <a 
              href={OFFICIAL_LINKS.claimsProcedurePdf.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Download size={14} />
              <span>Claims Procedure Guide (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Filter & Document List Container */}
      <section className="container" style={{ maxWidth: '1080px', margin: '2.5rem auto 0', padding: '0 1rem' }}>
        
        {/* Search & Filter Bar */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name (e.g., Care Supreme, Joy, Enhance, Claim Form)..." 
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.75rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                color: '#1e293b'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'thin'
          }}>
            {DOCUMENT_CATEGORIES.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: selectedCategory === category.id ? 'var(--blue-600)' : '#e2e8f0',
                  backgroundColor: selectedCategory === category.id ? 'var(--blue-50)' : '#ffffff',
                  color: selectedCategory === category.id ? 'var(--blue-700)' : '#475569',
                  transition: 'all 0.15s ease'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
            Showing <strong>{filteredDocs.length}</strong> official documents
          </p>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            All links point directly to official CMS storage
          </span>
        </div>

        {/* Document Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem'
        }}>
          {filteredDocs.map((doc, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: doc.type === 'Brochure' ? '#eff6ff' : doc.type === 'Prospectus' ? '#fdf2f8' : '#f0fdf4',
                    color: doc.type === 'Brochure' ? '#1d4ed8' : doc.type === 'Prospectus' ? '#be185d' : '#15803d'
                  }}>
                    {doc.type}
                  </span>
                  <FileText size={18} color="#94a3b8" />
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {doc.title}
                </h3>
                
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                  Product: <strong>{doc.planName}</strong>
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                  <Download size={14} />
                  <span>Download Official PDF</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '3rem 1rem',
            textAlign: 'center',
            border: '1px dashed #cbd5e1'
          }}>
            <FileText size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', marginBottom: '0.5rem' }}>
              No documents matched your criteria
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>
              Try searching for a different keyword or reset your filter.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="btn btn-secondary btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </section>
    </div>
  );
}
