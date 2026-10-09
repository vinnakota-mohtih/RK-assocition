'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  AlertCircle, 
  HelpCircle, 
  Calculator, 
  Heart, 
  TrendingUp, 
  Award, 
  UserCheck, 
  PhoneCall,
  Info
} from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { OFFICIAL_LINKS } from '../../data/links';
import ratesData from '../../data/rates.json';

const RELATION_OPTIONS = [
  { id: 'self', label: 'Self', defaultAge: 32, isAdult: true },
  { id: 'spouse', label: 'Spouse', defaultAge: 30, isAdult: true },
  { id: 'son', label: 'Son', defaultAge: 6, isAdult: false },
  { id: 'daughter', label: 'Daughter', defaultAge: 4, isAdult: false },
  { id: 'father', label: 'Father', defaultAge: 60, isAdult: true },
  { id: 'mother', label: 'Mother', defaultAge: 56, isAdult: true },
  { id: 'father-in-law', label: 'Father-in-law', defaultAge: 62, isAdult: true },
  { id: 'mother-in-law', label: 'Mother-in-law', defaultAge: 58, isAdult: true }
];

export default function QuotePage() {
  const [activeTab, setActiveTab] = useState('quote'); // 'quote' | 'bmi' | 'bonus' | 'recommender'
  const [step, setStep] = useState(1); // Step 1: Members & Mobile, Step 2: Plan & Configuration

  // Form State
  const [selectedRelations, setSelectedRelations] = useState(['self']);
  const [memberAges, setMemberAges] = useState({ self: 32 });
  const [mobileNumber, setMobileNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [hasConsent, setHasConsent] = useState(true);
  
  // Step 2 State
  const [selectedPlan, setSelectedPlan] = useState('care-supreme');
  const [sumInsured, setSumInsured] = useState('1000000'); // ₹10 Lakhs
  const [coverType, setCoverType] = useState('floater'); // 'individual' | 'floater'
  const [tenure, setTenure] = useState(1); // 1, 2, 3 years
  const [zone, setZone] = useState('zone-3'); // 'zone-1' | 'zone-2' | 'zone-3'
  const [pincode, setPincode] = useState('');
  const [selectedAddons, setSelectedAddons] = useState(['room-rent', 'care-shield']);

  // Submission / Result State
  const [submitting, setSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [calculatedQuote, setCalculatedQuote] = useState(null);

  // BMI Tool State
  const [bmiHeight, setBmiHeight] = useState(170); // cm
  const [bmiWeight, setBmiWeight] = useState(70); // kg
  const [bmiResult, setBmiResult] = useState(null);

  // Cumulative Bonus Projector State
  const [bonusBaseSI, setBonusBaseSI] = useState(1000000); // ₹10 L
  const [bonusYears, setBonusYears] = useState(2);

  // SI Recommender State
  const [recCity, setRecCity] = useState('tier1');
  const [recFamilySize, setRecFamilySize] = useState('4');
  const [recMaxAge, setRecMaxAge] = useState('45');
  const [recHasPreExisting, setRecHasPreExisting] = useState(false);
  const [recommendedSI, setRecommendedSI] = useState(null);

  // Calculate BMI
  const handleCalcBMI = () => {
    const heightInM = bmiHeight / 100;
    const val = (bmiWeight / (heightInM * heightInM)).toFixed(1);
    let category = '';
    let advice = '';

    if (val < 18.5) {
      category = 'Underweight';
      advice = 'Standard health insurance issued; basic medical questionnaire required.';
    } else if (val <= 24.9) {
      category = 'Normal / Ideal Weight';
      advice = 'Eligible for lowest standard pricing tier with instant approval.';
    } else if (val <= 29.9) {
      category = 'Overweight';
      advice = 'Standard coverage available; may require tele-underwriting for higher Sums Insured.';
    } else {
      category = 'Obese';
      advice = 'Underwriting check or medical tele-screening may apply during proposal evaluation.';
    }
    setBmiResult({ val, category, advice });
  };

  // Calculate Recommender
  const handleRecommendSI = () => {
    let base = 1000000; // 10L base
    if (recCity === 'metro') base += 1500000;
    else if (recCity === 'tier1') base += 500000;
    
    if (Number(recFamilySize) >= 4) base += 1000000;
    if (Number(recMaxAge) >= 50) base += 500000;
    if (recHasPreExisting) base += 1000000;

    let tierLabel = '';
    if (base >= 2500000) tierLabel = '₹25 Lakh to ₹50 Lakh (Comprehensive Coverage)';
    else if (base >= 1500000) tierLabel = '₹15 Lakh to ₹25 Lakh (Optimal Family Protection)';
    else tierLabel = '₹10 Lakh to ₹15 Lakh (Essential Protection)';

    setRecommendedSI({ amount: base, label: tierLabel });
  };

  // Toggle member selection
  const toggleRelation = (relId) => {
    if (selectedRelations.includes(relId)) {
      if (selectedRelations.length === 1) {
        setValidationError('At least one member must be selected for coverage.');
        return;
      }
      setSelectedRelations(prev => prev.filter(r => r !== relId));
      const nextAges = { ...memberAges };
      delete nextAges[relId];
      setMemberAges(nextAges);
    } else {
      const relObj = RELATION_OPTIONS.find(r => r.id === relId);
      setSelectedRelations(prev => [...prev, relId]);
      setMemberAges(prev => ({ ...prev, [relId]: relObj ? relObj.defaultAge : 30 }));
    }
    setValidationError('');
  };

  const updateMemberAge = (relId, age) => {
    setMemberAges(prev => ({ ...prev, [relId]: Number(age) }));
  };

  // Validation before going to Step 2
  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    setValidationError('');

    // Rule 1: Mobile validation (10 digits starting 6-9)
    const phoneClean = mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      setValidationError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    // Rule 2: Adult / Child checks
    const adults = selectedRelations.filter(r => {
      const opt = RELATION_OPTIONS.find(o => o.id === r);
      const age = memberAges[r] || (opt?.defaultAge ?? 30);
      return age >= 18;
    });

    const children = selectedRelations.filter(r => {
      const opt = RELATION_OPTIONS.find(o => o.id === r);
      const age = memberAges[r] || (opt?.defaultAge ?? 5);
      return age < 18;
    });

    if (children.length > 0 && adults.length === 0) {
      setValidationError('At least one adult member (18+ years) must be included when insuring children.');
      return;
    }

    // Rule 3: Floater limits
    if (selectedRelations.length > 4 && coverType === 'floater') {
      setValidationError('Family floater supports up to 2 adults + 2 children (2A2C). Switch to individual cover for more than 4 members.');
      return;
    }

    if (!hasConsent) {
      setValidationError('Please agree to terms and authorization to proceed with quote calculation.');
      return;
    }

    setStep(2);
  };

  // Submit Quote Lead
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setValidationError('');

    const membersPayload = selectedRelations.map(r => ({
      relation: r,
      age: memberAges[r] || 30
    }));

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim() || 'Valued Customer',
          mobileNumber: mobileNumber.replace(/\D/g, ''),
          members: membersPayload,
          planInterest: selectedPlan,
          sumInsured: Number(sumInsured),
          coverType,
          tenure,
          zone,
          hasConsent
        })
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setLeadSuccess(true);

        // Mode B check
        if (SITE_CONFIG.USE_LOCAL_RATES) {
          // Calculate indicative premium if Mode B is active
          const baseRate = 8999;
          const gst = Math.round(baseRate * 0.18);
          setCalculatedQuote({
            basePremium: baseRate,
            gst,
            totalPremium: baseRate + gst,
            isLocal: true
          });
        } else {
          // Mode A: Open official Abacus quotation tool in new tab
          if (typeof window !== 'undefined') {
            window.open(OFFICIAL_LINKS.quoteAbacus.url, '_blank', 'noopener,noreferrer');
          }
        }
      } else {
        setValidationError(resData.error || 'Failed to capture quote inquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setValidationError('Network error submitting quote. Please check your connection.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--blue-950) 0%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '3.5rem 1rem 3rem',
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
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            <Calculator size={15} />
            <span>Official Premium Engine & Advisory Tools</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '0.75rem',
            letterSpacing: '-0.02em'
          }}>
            Health Insurance Premium Calculator
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--blue-100)',
            maxWidth: '680px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6
          }}>
            Configure your family’s coverage, get certified quote estimates from Care Health Insurance, and test our underwriting health calculators.
          </p>

          {/* Navigation Tabs */}
          <div style={{
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '4px',
            borderRadius: '12px',
            gap: '4px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {[
              { id: 'quote', label: 'Premium Quote', icon: Calculator },
              { id: 'bmi', label: 'BMI Calculator', icon: Heart },
              { id: 'bonus', label: 'Cumulative Bonus', icon: Award },
              { id: 'recommender', label: 'SI Recommender', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: activeTab === tab.id ? '#ffffff' : 'transparent',
                    color: activeTab === tab.id ? 'var(--blue-950)' : '#ffffff',
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
      </section>

      {/* Main Container */}
      <section className="container" style={{ maxWidth: '880px', margin: '2.5rem auto 0', padding: '0 1rem' }}>
        
        {/* TAB 1: MAIN PREMIUM QUOTE */}
        {activeTab === 'quote' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
          }}>
            
            {/* Step Header */}
            <div style={{
              padding: '1.25rem 2rem',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--blue-600)', letterSpacing: '0.05em' }}>
                  {step === 1 ? 'Step 1 of 2: Family & Contact' : 'Step 2 of 2: Plan & Sum Insured'}
                </span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e293b', margin: '2px 0 0' }}>
                  {step === 1 ? 'Select Members to Insure' : 'Configure Policy Parameters'}
                </h3>
              </div>

              {step === 2 && !leadSuccess && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'none',
                    border: 'none',
                    color: '#64748b',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  <ArrowLeft size={14} />
                  <span>Edit Members</span>
                </button>
              )}
            </div>

            {/* Content Body */}
            <div style={{ padding: '2rem' }}>
              {validationError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={18} />
                  <span>{validationError}</span>
                </div>
              )}

              {/* SUCCESS MODAL / SCREEN */}
              {leadSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem' }}>
                    Quote Request Received!
                  </h2>

                  <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                    Your quote inquiry has been registered. An official Care Health Insurance advisor from <strong>{SITE_CONFIG.agencyName}</strong> will reach out shortly on <strong>+91 {mobileNumber}</strong>.
                  </p>

                  <div style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    maxWidth: '560px',
                    margin: '0 auto 2rem',
                    textAlign: 'left'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', color: '#166534', fontWeight: 700 }}>
                      <Sparkles size={18} />
                      <span>Official Online Quote Opened in New Tab</span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#14532d', margin: 0, lineHeight: 1.5 }}>
                      The official Care Abacus quotation portal has opened in your browser with real-time rate validation. If a popup blocker stopped it, click the button below.
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <a
                      href={OFFICIAL_LINKS.quoteAbacus.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <span>Open Care Abacus Portal</span>
                      <ExternalLink size={16} />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setLeadSuccess(false);
                        setStep(1);
                      }}
                      className="btn btn-secondary"
                    >
                      <span>Calculate Another Quote</span>
                    </button>
                  </div>
                </div>
              ) : step === 1 ? (
                /* STEP 1 FORM */
                <form onSubmit={handleProceedToStep2}>
                  {/* Member Selector Grid */}
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                    1. Who would you like to insure? (Tap to add/remove)
                  </label>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1.75rem'
                  }}>
                    {RELATION_OPTIONS.map(rel => {
                      const isSelected = selectedRelations.includes(rel.id);
                      return (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => toggleRelation(rel.id)}
                          style={{
                            padding: '0.75rem 0.5rem',
                            borderRadius: '10px',
                            border: '1.5px solid',
                            borderColor: isSelected ? 'var(--blue-600)' : '#cbd5e1',
                            backgroundColor: isSelected ? 'var(--blue-50)' : '#ffffff',
                            color: isSelected ? 'var(--blue-700)' : '#475569',
                            fontWeight: isSelected ? 700 : 500,
                            fontSize: '0.88rem',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span>{isSelected ? '✓ ' + rel.label : '+ ' + rel.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Member Ages Grid */}
                  <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
                    2. Age of Insured Members
                  </label>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.75rem',
                    backgroundColor: '#f8fafc',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {selectedRelations.map(relId => {
                      const relObj = RELATION_OPTIONS.find(r => r.id === relId);
                      const currentAge = memberAges[relId] || relObj?.defaultAge || 30;
                      return (
                        <div key={relId}>
                          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
                            {relObj?.label} Age:
                          </label>
                          <select
                            value={currentAge}
                            onChange={(e) => updateMemberAge(relId, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              borderRadius: '8px',
                              border: '1px solid #cbd5e1',
                              fontSize: '0.9rem',
                              backgroundColor: '#ffffff',
                              color: '#1e293b',
                              outline: 'none'
                            }}
                          >
                            {Array.from({ length: 99 }, (_, i) => i + 1).map(age => (
                              <option key={age} value={age}>
                                {age} {age === 1 ? 'Year' : 'Years'}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>

                  {/* Contact Fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.92rem',
                          outline: 'none',
                          color: '#1e293b'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                        Mobile Number (India +91) <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <span style={{
                          padding: '0.75rem 0.85rem',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          color: '#475569',
                          fontWeight: 600
                        }}>
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="10-digit number (e.g. 9876543210)"
                          maxLength={10}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.92rem',
                            outline: 'none',
                            color: '#1e293b'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms Consent */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={hasConsent}
                        onChange={(e) => setHasConsent(e.target.checked)}
                        style={{ marginTop: '3px', width: '16px', height: '16px' }}
                      />
                      <span style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                        I agree to terms & conditions and authorize <strong>{SITE_CONFIG.agencyName}</strong> and <strong>{SITE_CONFIG.insurerName}</strong> to contact me regarding my quote via phone, SMS, and WhatsApp overriding any DND registry.
                      </span>
                    </label>
                  </div>

                  {/* Proceed Button */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                  >
                    <span>Proceed to Policy Options</span>
                    <ArrowRight size={18} />
                  </button>
                </form>
              ) : (
                /* STEP 2 FORM */
                <form onSubmit={handleFinalSubmit}>
                  {/* Plan Choice */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                      Select Health Plan
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.95rem',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        color: '#1e293b'
                      }}
                    >
                      <option value="care-supreme">Care Supreme (Flagship – Unlimited Automatic Recharge & 7x Bonus)</option>
                      <option value="care-advantage">Care Advantage (High Sum Insured up to ₹1 Crore)</option>
                      <option value="senior-health-advantage">Senior Health Advantage (Specialized Senior Citizens Cover)</option>
                      <option value="joy-maternity">Joy (Maternity & New-Born Comprehensive Cover)</option>
                      <option value="supreme-enhance">Supreme Enhance (Super Top-up with Deductible)</option>
                    </select>
                  </div>

                  {/* Sum Insured & Cover Type Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                        Sum Insured (₹)
                      </label>
                      <select
                        value={sumInsured}
                        onChange={(e) => setSumInsured(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          backgroundColor: '#ffffff',
                          outline: 'none'
                        }}
                      >
                        <option value="700000">₹7 Lakhs (Starting at ~₹13/day)</option>
                        <option value="1000000">₹10 Lakhs (Recommended Family Base)</option>
                        <option value="1500000">₹15 Lakhs</option>
                        <option value="2500000">₹25 Lakhs</option>
                        <option value="5000000">₹50 Lakhs</option>
                        <option value="10000000">₹1 Crore</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                        Coverage Policy Type
                      </label>
                      <select
                        value={coverType}
                        onChange={(e) => setCoverType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          backgroundColor: '#ffffff',
                          outline: 'none'
                        }}
                      >
                        <option value="floater">Family Floater (Shared Sum Insured)</option>
                        <option value="individual">Individual (Separate Sum Insured for each member)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                        Policy Tenure
                      </label>
                      <select
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          backgroundColor: '#ffffff',
                          outline: 'none'
                        }}
                      >
                        <option value={1}>1 Year Policy</option>
                        <option value={2}>2 Years (Tenure Discount applies)</option>
                        <option value={3}>3 Years (Maximum Long-Term Savings)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '6px' }}>
                        Pricing Zone
                      </label>
                      <select
                        value={zone}
                        onChange={(e) => setZone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.95rem',
                          backgroundColor: '#ffffff',
                          outline: 'none'
                        }}
                      >
                        <option value="zone-1">Zone 1 (Delhi NCR, Mumbai, Thane)</option>
                        <option value="zone-2">Zone 2 (Bengaluru, Kolkata, Pune, Hyderabad, Chennai, Ahmedabad)</option>
                        <option value="zone-3">Zone 3 (Rest of India - Lowest Base Rates)</option>
                      </select>
                    </div>
                  </div>

                  {/* Add-ons Checkboxes */}
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                      Recommended Add-on Riders
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                      {[
                        { id: 'room-rent', label: 'Room Rent Modification', desc: 'No sub-limits on hospital room category' },
                        { id: 'care-shield', label: 'Care Shield / Protect Plus', desc: 'Inflation protection & non-medical items cover' },
                        { id: 'opd', label: 'OPD Care Rider', desc: 'Outpatient consultation & pharmacy reimbursements' },
                        { id: 'health-checkup', label: 'Annual Health Check-up', desc: 'Comprehensive wellness check every year' }
                      ].map(addon => {
                        const isChecked = selectedAddons.includes(addon.id);
                        return (
                          <div
                            key={addon.id}
                            onClick={() => {
                              setSelectedAddons(prev => 
                                isChecked ? prev.filter(x => x !== addon.id) : [...prev, addon.id]
                              );
                            }}
                            style={{
                              padding: '0.85rem',
                              borderRadius: '8px',
                              border: '1px solid',
                              borderColor: isChecked ? 'var(--blue-600)' : '#e2e8f0',
                              backgroundColor: isChecked ? 'var(--blue-50)' : '#ffffff',
                              cursor: 'pointer'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                readOnly
                                style={{ pointerEvents: 'none' }}
                              />
                              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1e293b' }}>{addon.label}</span>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 0 24px' }}>{addon.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Mode Notice Box */}
                  <div style={{
                    backgroundColor: '#f1f5f9',
                    borderRadius: '8px',
                    padding: '1rem',
                    fontSize: '0.82rem',
                    color: '#475569',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <Info size={20} color="var(--blue-600)" style={{ flexShrink: 0 }} />
                    <span>
                      <strong>Mode A Real-time Routing:</strong> Submitting will record your quote parameters securely and launch the official Care Abacus quote engine in a new tab for instant underwriting valuation.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                  >
                    {submitting ? (
                      <span>Generating Verified Quote...</span>
                    ) : (
                      <>
                        <span>Get Official Premium Quote</span>
                        <ExternalLink size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: BMI CALCULATOR */}
        {activeTab === 'bmi' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Heart size={24} color="var(--blue-600)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--blue-950)', margin: 0 }}>
                Body Mass Index (BMI) Health Underwriting Tool
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
              Formula: <code>weight(kg) ÷ height(m)²</code>. Insurers evaluate BMI to determine baseline health categorization and underwriting parameters.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Height: <strong>{bmiHeight} cm</strong>
                </label>
                <input
                  type="range"
                  min={120}
                  max={220}
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Weight: <strong>{bmiWeight} kg</strong>
                </label>
                <input
                  type="range"
                  min={35}
                  max={150}
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCalcBMI}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '2rem' }}
            >
              Calculate BMI
            </button>

            {bmiResult && (
              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Your Body Mass Index</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--blue-950)', margin: '4px 0' }}>
                  {bmiResult.val}
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--blue-100)',
                  color: 'var(--blue-800)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  {bmiResult.category}
                </div>
                <p style={{ fontSize: '0.92rem', color: '#475569', margin: 0 }}>
                  <strong>Underwriting Note:</strong> {bmiResult.advice}
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUMULATIVE BONUS PROJECTOR */}
        {activeTab === 'bonus' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <Award size={24} color="var(--blue-600)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--blue-950)', margin: 0 }}>
                Care Supreme Cumulative Bonus Projector
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
              Under Care Supreme, your Sum Insured expands by <strong>50% per policy year</strong> up to <strong>100%</strong> of the original Sum Insured without being reduced even if claims are filed!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Base Sum Insured:
                </label>
                <select
                  value={bonusBaseSI}
                  onChange={(e) => setBonusBaseSI(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value={700000}>₹7,00,000 (₹7 Lakhs)</option>
                  <option value={1000000}>₹10,00,000 (₹10 Lakhs)</option>
                  <option value={1500000}>₹15,00,000 (₹15 Lakhs)</option>
                  <option value={2500000}>₹25,00,000 (₹25 Lakhs)</option>
                  <option value={5000000}>₹50,00,000 (₹50 Lakhs)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Claim-Free Policy Years:
                </label>
                <select
                  value={bonusYears}
                  onChange={(e) => setBonusYears(Number(e.target.value))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value={1}>Year 1 (+50% Bonus)</option>
                  <option value={2}>Year 2 & Beyond (+100% Max Bonus)</option>
                </select>
              </div>
            </div>

            {/* Projected Bonus Timeline Box */}
            <div style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e40af', marginBottom: '1rem' }}>
                Coverage Progression Table
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #dbeafe' }}>
                  <span style={{ color: '#1e3a8a', fontWeight: 600 }}>Initial Year 0:</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>₹{(bonusBaseSI / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #dbeafe' }}>
                  <span style={{ color: '#1e3a8a', fontWeight: 600 }}>After Year 1 (+50%):</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>₹{((bonusBaseSI * 1.5) / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>After Year 2 (+100% Max):</span>
                  <span style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem' }}>₹{((bonusBaseSI * 2) / 100000).toFixed(1)} Lakhs</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SUM INSURED RECOMMENDER */}
        {activeTab === 'recommender' && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: 'var(--shadow-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <TrendingUp size={24} color="var(--blue-600)" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--blue-950)', margin: 0 }}>
                Sum Insured Recommender
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
              Get an objective, medical-inflation adjusted recommendation based on city healthcare costs and family risk profile.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  City Category:
                </label>
                <select
                  value={recCity}
                  onChange={(e) => setRecCity(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value="metro">Metro (Delhi NCR, Mumbai)</option>
                  <option value="tier1">Tier 1 (Bengaluru, Pune, Hyderabad, etc.)</option>
                  <option value="tier2">Tier 2 / Tier 3</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Total Family Members:
                </label>
                <select
                  value={recFamilySize}
                  onChange={(e) => setRecFamilySize(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value="1">1 Member (Individual)</option>
                  <option value="2">2 Members (Couple)</option>
                  <option value="4">3–4 Members (Family)</option>
                  <option value="6">5+ Members (Large Family / Parents)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
                  Age of Eldest Member:
                </label>
                <select
                  value={recMaxAge}
                  onChange={(e) => setRecMaxAge(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value="35">Under 35</option>
                  <option value="45">35 to 49</option>
                  <option value="55">50 to 59</option>
                  <option value="65">60 or older</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={recHasPreExisting}
                  onChange={(e) => setRecHasPreExisting(e.target.checked)}
                />
                <span style={{ fontSize: '0.9rem', color: '#475569' }}>
                  Any member has existing hypertension, diabetes, or cardiac history?
                </span>
              </label>
            </div>

            <button
              type="button"
              onClick={handleRecommendSI}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '2rem' }}
            >
              Get Suggested Coverage
            </button>

            {recommendedSI && (
              <div style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#166534', textTransform: 'uppercase', fontWeight: 700 }}>Recommended Minimum Sum Insured</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#14532d', margin: '6px 0' }}>
                  {recommendedSI.label}
                </div>
                <p style={{ fontSize: '0.92rem', color: '#166534', margin: '0 auto', maxWidth: '520px' }}>
                  This tier provides adequate buffer against current medical inflation and corporate multi-specialty ICU expenses.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer Footer Box */}
        <div style={{
          marginTop: '2.5rem',
          padding: '1.25rem',
          borderRadius: '12px',
          backgroundColor: '#f1f5f9',
          border: '1px solid #e2e8f0',
          fontSize: '0.82rem',
          color: '#64748b',
          lineHeight: 1.6
        }}>
          <strong>Regulatory Notice:</strong> Premium calculations and recommendations are strictly indicative and subject to individual medical underwriting approval by <strong>{SITE_CONFIG.insurerName}</strong> (IRDAI Reg. No. {SITE_CONFIG.insurerIrdaiRegNo}). Final premium depends on age, health declaration, selected zone of residence, and applicable GST.
        </div>

      </section>
    </div>
  );
}
