const http = require('http');

const BASE_URL = 'http://localhost:3000';

function fetchUrl(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

async function runTests() {
  console.log('==================================================');
  console.log('🚀 RUNNING AUTOMATED FULL TEST SUITE FOR CARE INSURANCE');
  console.log('==================================================\n');

  const routes = [
    { name: 'Homepage', path: '/' },
    { name: 'Plans Listing', path: '/plans' },
    { name: 'Plan Detail (Care Supreme)', path: '/plans/care-supreme' },
    { name: 'Plan Detail (Care Advantage)', path: '/plans/care-advantage' },
    { name: 'Compare Plans', path: '/compare' },
    { name: 'Premium Calculator & Tools', path: '/quote' },
    { name: 'Claims Center & Checklist', path: '/claims' },
    { name: 'Cashless Hospital Locator', path: '/hospital-locator' },
    { name: 'Excluded Hospitals Advisory', path: '/excluded-hospitals' },
    { name: 'Direct Online Renewal', path: '/renew' },
    { name: 'Downloads & Literature', path: '/downloads' },
    { name: 'Regulatory Disclaimers', path: '/legal/disclaimer' },
    { name: 'About Page', path: '/about' },
    { name: 'Contact Page', path: '/contact' },
    { name: 'Sitemap XML', path: '/sitemap.xml' },
    { name: 'Robots TXT', path: '/robots.txt' }
  ];

  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetchUrl(r.path);
      if (res.status === 200) {
        console.log(`✅ [PASS] ${r.name.padEnd(32)} -> HTTP ${res.status}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${r.name.padEnd(32)} -> HTTP ${res.status}`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${r.name.padEnd(31)} -> ${err.message}`);
      failed++;
    }
  }

  console.log('\n--- TESTING API ENDPOINTS ---');

  // Test 1: POST /api/leads
  try {
    const leadPayload = JSON.stringify({
      fullName: 'Vikram Mehta',
      mobileNumber: '9876543210',
      members: [{ relation: 'self', age: 34 }, { relation: 'spouse', age: 31 }],
      planInterest: 'care-supreme',
      sumInsured: 1000000,
      coverType: 'floater',
      tenure: 1,
      zone: 'zone-3',
      hasConsent: true
    });

    const leadRes = await fetchUrl('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: leadPayload
    });

    if (leadRes.status === 200 || leadRes.status === 201) {
      console.log(`✅ [PASS] POST /api/leads               -> HTTP ${leadRes.status}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] POST /api/leads               -> HTTP ${leadRes.status}: ${leadRes.body}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [ERROR] POST /api/leads              -> ${err.message}`);
    failed++;
  }

  // Test 2: GET /api/leads/export
  try {
    const exportRes = await fetchUrl('/api/leads/export');
    if (exportRes.status === 200 && exportRes.headers['content-type']?.includes('text/csv')) {
      console.log(`✅ [PASS] GET /api/leads/export          -> HTTP 200 (CSV generated)`);
      passed++;
    } else {
      console.error(`❌ [FAIL] GET /api/leads/export          -> HTTP ${exportRes.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [ERROR] GET /api/leads/export         -> ${err.message}`);
    failed++;
  }

  // Test 3: GET /api/claims?q=CLM-89210
  try {
    const claimsRes = await fetchUrl('/api/claims?q=CLM-89210');
    if (claimsRes.status === 200) {
      console.log(`✅ [PASS] GET /api/claims?q=CLM-89210   -> HTTP 200`);
      passed++;
    } else {
      console.error(`❌ [FAIL] GET /api/claims                -> HTTP ${claimsRes.status}`);
      failed++;
    }
  } catch (err) {
    console.error(`❌ [ERROR] GET /api/claims               -> ${err.message}`);
    failed++;
  }

  console.log('\n==================================================');
  console.log(`📊 SUMMARY: ${passed} PASSED / ${failed} FAILED`);
  console.log('==================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
