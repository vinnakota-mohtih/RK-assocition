'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  HelpCircle, 
  ShieldAlert, 
  FileCheck2, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am RK Associates AI Concierge, your instant insurance advisor. How can I help you protect what matters today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    { label: 'How to file a claim?', reply: 'Filing a claim takes less than 2 minutes! Go to our Claims Center, enter your policy number, upload bills/photos, and our AI will pre-authorize cashless settlement in 15 minutes.' },
    { label: 'Find cashless hospital', reply: 'We have 14,500+ network cashless hospitals nationwide. Visit our Claims Center -> Network Locator to search by city!' },
    { label: 'How much health cover do I need?', reply: 'We recommend at least $150,000 / ₹15 Lakhs for comprehensive family health security to cover inflation, surgeries, and consumables.' },
    { label: 'What is cashless garage repair?', reply: 'Drive into any of our 7,800+ authorized workshops. We inspect the damage digitally and pay the workshop directly with zero-depreciation coverage.' }
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Automated intelligent bot response
    setTimeout(() => {
      let botResponse = "Thank you for asking! For tailored assistance, you can also use our Instant Quote Calculator or connect directly with our 24/7 underwriting team at 1800-425-9000.";

      const lower = text.toLowerCase();
      if (lower.includes('claim')) {
        botResponse = "To track or file a claim instantly, click on 'Claims Center' in the top menu or use quick tracking code 'CLM-89210' to preview how our live tracker works!";
      } else if (lower.includes('quote') || lower.includes('price') || lower.includes('cost')) {
        botResponse = "You can calculate your exact monthly and annual premium in real-time with zero commitment on our Instant Quote page!";
      } else if (lower.includes('hospital') || lower.includes('cashless')) {
        botResponse = "We cover 14,500+ top multi-specialty hospitals with zero out-of-pocket room rent limits in our Gold & Platinum plans.";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 600);
  };

  return (
    <aside aria-label="Support Assistant" style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            backgroundColor: 'var(--blue-600)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '14px 22px',
            boxShadow: '0 8px 25px rgba(37, 99, 235, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: 700,
            transition: 'all 0.25s ease'
          }}
          className="animate-float"
        >
          <div style={{ position: 'relative' }}>
            <Bot size={22} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              border: '2px solid #2563eb'
            }} />
          </div>
          <span>Instant Help</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '360px',
          maxWidth: 'calc(100vw - 32px)',
          height: '520px',
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          boxShadow: '0 15px 40px rgba(11, 37, 69, 0.25)',
          border: '1px solid var(--blue-200)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0b2545 0%, #0284c7 100%)',
            padding: '16px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={22} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>RK Associates AI Concierge</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#bae6fd' }}>
                  <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
                  <span>Online • Instant Response</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                opacity: 0.8
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            backgroundColor: 'var(--slate-50)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  backgroundColor: m.sender === 'user' ? 'var(--blue-600)' : '#ffffff',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--slate-800)',
                  fontSize: '0.88rem',
                  lineHeight: '1.45',
                  boxShadow: 'var(--shadow-sm)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--slate-200)'
                }}>
                  {m.text}
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--slate-400)', marginTop: '4px', padding: '0 4px' }}>
                  {m.time}
                </span>
              </div>
            ))}

            {/* Quick Suggestions */}
            <div style={{ marginTop: 'auto', paddingTop: '8px' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', marginBottom: '6px' }}>
                Quick Inquiries:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleSend(q.label);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '6px 10px',
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--blue-200)',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      color: 'var(--blue-700)',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    💬 {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '12px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid var(--slate-200)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Type your question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--slate-300)',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              style={{
                backgroundColor: inputText.trim() ? 'var(--blue-600)' : 'var(--slate-300)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 12px',
                cursor: inputText.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
