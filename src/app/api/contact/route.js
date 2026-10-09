import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, category, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const ticketId = `TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toISOString();

    console.log(`[Support Ticket Created] ${ticketId}:`, {
      name,
      email,
      phone: phone || 'N/A',
      subject: subject || 'General Inquiry',
      category: category || 'General',
      message,
      timestamp
    });

    return NextResponse.json({
      success: true,
      ticketId,
      message: `Thank you, ${name}. Your message has been received! Our RK Associates insurance advisory team will respond to ${email} within 2 business hours.`,
      estimatedResponseTime: '2 Hours (Priority Support)',
      details: {
        ticketId,
        category: category || 'General',
        receivedAt: timestamp
      }
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error while submitting contact request.' },
      { status: 500 }
    );
  }
}
