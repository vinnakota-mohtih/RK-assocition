'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck, 
  Headphones,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Claims Assistance',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedData(data);
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'Claims Assistance',
          subject: '',
          message: ''
        });
      } else {
        setErrorMessage(data.error || 'Failed to submit request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An unexpected error occurred. Please call 1800-425-9000 for emergency assistance.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--slate-50)', minHeight: '85vh', paddingBottom: '4rem' }}>
      {/* Page Hero */}
      <div style={{
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)',
        borderBottom: '1px solid var(--slate-200)',
        padding: '3.5rem 0 2.5rem 0'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <span className="badge badge-blue">Always Available</span>
          <h1 className="section-title" style={{ marginTop: '0.5rem' }}>
            24/7 Dedicated Support & <span className="text-gradient">Claims Desk</span>
          </h1>
          <p className="section-subtitle" style={{ margin: '0.5rem auto 0 auto' }}>
            Whether you need emergency hospital cashless guidance, policy renewal help, or grievance redressal, our specialized underwriting team is here for you.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '3rem' }}>
        {/* Contact Info Cards */}
        <div className="grid-3" style={{ marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--blue-50)',
              color: 'var(--blue-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Phone size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--blue-950)' }}>
              24/7 Claims & Emergency
            </h3>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Instant pre-authorization & roadside assistance dispatch.
            </p>
            <div style={{ fontWeight: 700, color: 'var(--blue-700)', fontSize: '1.1rem' }}>
              1800-425-9000 (Toll-Free)
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Alternate: +91 22 6900 1200
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--blue-50)',
              color: 'var(--blue-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <Mail size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--blue-950)' }}>
              Underwriting & Queries
            </h3>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              Email our senior underwriters with policy documents.
            </p>
            <div style={{ fontWeight: 700, color: 'var(--blue-700)', fontSize: '1.05rem' }}>
              support@rkassociates.com
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              claims@rkassociates.com
            </div>
          </div>

          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              backgroundColor: 'var(--blue-50)',
              color: 'var(--blue-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              <MapPin size={24} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--blue-950)' }}>
              Headquarters
            </h3>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', marginTop: '0.25rem', marginBottom: '0.75rem' }}>
              RK Associates Tower, 14th Floor, FinTech Boulevard, Bandra Kurla Complex (BKC), Mumbai 400051.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--emerald-500)', fontWeight: 700 }}>
              Operating Hours: Mon - Sat, 9 AM - 7 PM IST
            </div>
          </div>
        </div>

        {/* Main Interactive Form Area */}
        <div className="grid-2" style={{ alignItems: 'flex-start' }}>
          {/* Contact Form */}
          <div className="card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.5rem' }}>
              Send Us a Message
            </h2>
            <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
              Have questions about a policy, rider, or porting? Submit below and receive a response within 2 business hours.
            </p>

            {submittedData && (
              <div style={{
                backgroundColor: 'var(--emerald-100)',
                border: '1px solid #a7f3d0',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                gap: '0.75rem',
                color: '#065f46'
              }}>
                <CheckCircle2 size={24} style={{ flexShrink: 0 }} />
                <div>
                  <strong>Ticket Created: {submittedData.ticketId}</strong>
                  <p style={{ fontSize: '0.88rem', marginTop: '0.25rem' }}>{submittedData.message}</p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div style={{
                backgroundColor: 'var(--rose-100)',
                border: '1px solid #fecdd3',
                padding: '1rem',
                borderRadius: '10px',
                color: '#9f1239',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={20} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="form-control"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Inquiry Category *</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="Claims Assistance">Claims Assistance & TPA Pre-Auth</option>
                    <option value="New Policy Inquiry">New Policy & Premium Quotation</option>
                    <option value="Policy Renewal">Policy Renewal & NCB Preservation</option>
                    <option value="Portability">Policy Portability from Other Insurer</option>
                    <option value="Grievance Redressal">Grievance & Customer Escalation</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Query regarding family floater cashless hospital list"
                  className="form-control"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide details about your query or policy number..."
                  className="form-control"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <Send size={18} />
                <span>{loading ? 'Submitting Support Ticket...' : 'Send Message to Underwriting Team'}</span>
              </button>
            </form>
          </div>

          {/* Right Side Info & FAQ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ backgroundColor: 'var(--blue-50)', border: '1px solid var(--blue-200)', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '0.75rem' }}>
                Instant Escalation Matrix
              </h3>
              <p style={{ color: 'var(--slate-600)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Under IRDAI Protection of Policyholders&apos; Regulations, we adhere to strict resolution timelines:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--blue-200)', paddingBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--blue-900)' }}>Level 1: Customer Care</strong>
                  <span style={{ color: 'var(--slate-600)' }}>Within 2 Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--blue-200)', paddingBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--blue-900)' }}>Level 2: Principal Underwriter</strong>
                  <span style={{ color: 'var(--slate-600)' }}>Within 24 Hours</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ color: 'var(--blue-900)' }}>Level 3: Grievance Redressal Officer</strong>
                  <span style={{ color: 'var(--slate-600)' }}>Within 3 Business Days</span>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--blue-950)', marginBottom: '1rem' }}>
                Need Immediate Self-Service?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link href="/claims" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                  <FileCheck2 size={18} color="var(--blue-600)" />
                  <span>Track Live Hospital Cashless Pre-Auth</span>
                </Link>

                <Link href="/dashboard" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                  <ShieldCheck size={18} color="var(--blue-600)" />
                  <span>Download Signed 80D Tax Certificate</span>
                </Link>

                <Link href="/quote" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                  <Clock size={18} color="var(--blue-600)" />
                  <span>Calculate Custom Premium Quote</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
