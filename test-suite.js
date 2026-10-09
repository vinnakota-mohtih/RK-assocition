const http = require('http');

async function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

const tests = [];
function addTest(name, fn) {
  tests.push({ name, fn });
}

// 1. PAGE TESTS
const pages = [
  { path: '/', title: 'Home Page' },
  { path: '/plans', title: 'Plans Page' },
  { path: '/quote', title: 'Quote Calculator Page' },
  { path: '/claims', title: 'Claims Center Page' },
  { path: '/dashboard', title: 'Policyholder Dashboard Page' },
  { path: '/about', title: 'About Us Page' },
  { path: '/contact', title: 'Contact & Support Page' }
];

pages.forEach(({ path, title }) => {
  addTest(`Page Load: ${title} (${path})`, async () => {
    const res = await request({ host: 'localhost', port: 3000, path, method: 'GET' });
    if (res.statusCode !== 200) throw new Error(`Expected HTTP 200 but got ${res.statusCode}`);
    if (res.body.includes('Server Error') || res.body.includes('Cannot find module')) {
      throw new Error(`Found Server Error or missing module in ${path}`);
    }
    if (!res.body.includes('RK ASSOCIATES') && !res.body.includes('rk-logo')) {
      throw new Error(`RK Associates branding not found in ${path}`);
    }
    return `HTTP 200 OK - HTML payload size: ${res.body.length} bytes`;
  });
});

// 2. ASSET TESTS
addTest('Asset: Logo without BG (/images/rk-logo.png)', async () => {
  const res = await request({ host: 'localhost', port: 3000, path: '/images/rk-logo.png', method: 'GET' });
  if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
  const len = parseInt(res.headers['content-length'] || '0', 10);
  if (len < 1000) throw new Error(`File too small: ${len} bytes`);
  return `HTTP 200 OK - Content Length: ${len} bytes`;
});

addTest('Asset: Textured Logo Card (/images/rk-logo-card.png)', async () => {
  const res = await request({ host: 'localhost', port: 3000, path: '/images/rk-logo-card.png', method: 'GET' });
  if (res.statusCode !== 200) throw new Error(`Expected 200, got ${res.statusCode}`);
  const len = parseInt(res.headers['content-length'] || '0', 10);
  if (len < 1000) throw new Error(`File too small: ${len} bytes`);
  return `HTTP 200 OK - Content Length: ${len} bytes`;
});

// 3. API TESTS
addTest('API: GET /api/policies', async () => {
  const res = await request({ host: 'localhost', port: 3000, path: '/api/policies', method: 'GET' });
  if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
  const json = JSON.parse(res.body);
  if (!json.plans || json.plans.length === 0) throw new Error('No plans returned');
  return `HTTP 200 OK - Returned ${json.plans.length} insurance plans, ${json.categories.length} categories`;
});

addTest('API: POST /api/quote (Health Insurance Calculation)', async () => {
  const payload = {
    category: 'health',
    coverageAmount: 150000,
    age: 32,
    membersCount: 2,
    tenure: 2,
    isSmoker: false,
    hasPreExisting: false,
    riders: ['criticalIllness', 'hospitalCash']
  };
  const res = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/quote',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, payload);

  if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
  const json = JSON.parse(res.body);
  if (!json.success || !json.quoteId) throw new Error('Invalid quote response');
  if (typeof json.summary.monthlyPremium !== 'number' || json.summary.monthlyPremium <= 0) {
    throw new Error('Invalid computed monthly premium');
  }
  return `HTTP 200 OK - Generated Quote ${json.quoteId}: $${json.summary.monthlyPremium}/mo ($${json.summary.annualPremium}/yr)`;
});

addTest('API: POST /api/contact (Support Ticket Submission)', async () => {
  const payload = {
    name: 'Mohith Test Customer',
    email: 'mohith.test@example.com',
    phone: '+91 9876543210',
    category: 'Claims Assistance',
    subject: 'Pre-auth verification question',
    message: 'Testing cashless pre-authorization integration for Apollo hospital.'
  };
  const res = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/contact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, payload);

  if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
  const json = JSON.parse(res.body);
  if (!json.success || !json.ticketId) throw new Error('Failed to create ticket');
  return `HTTP 200 OK - Created Ticket ${json.ticketId} with confirmation: "${json.message}"`;
});

let testGeneratedClaimId = null;

addTest('API: POST /api/claims (New Claim Filing Intake)', async () => {
  const payload = {
    policyNumber: 'POL-HLTH-2024-918',
    policyHolder: 'Rahul Sharma',
    category: 'health',
    incidentDate: '2026-10-08',
    claimedAmount: 64000,
    hospitalOrGarage: 'Apollo Multispecialty Hospital',
    description: 'Automated test claim intake'
  };
  const res = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/claims',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, payload);

  if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
  const json = JSON.parse(res.body);
  if (!json.success || !json.claimId) throw new Error('Failed to file claim');
  testGeneratedClaimId = json.claimId;
  return `HTTP 200 OK - Registered Claim ${json.claimId} with status "${json.claim.status}"`;
});

addTest('API: GET /api/claims (Query Newly Filed Claim)', async () => {
  if (!testGeneratedClaimId) throw new Error('No claim ID from previous test');
  const res = await request({
    host: 'localhost',
    port: 3000,
    path: `/api/claims?q=${testGeneratedClaimId}`,
    method: 'GET'
  });
  if (res.statusCode !== 200) throw new Error(`Status ${res.statusCode}`);
  const json = JSON.parse(res.body);
  if (!json.results || json.results.length === 0) throw new Error(`Could not find claim ${testGeneratedClaimId}`);
  const claim = json.results[0];
  if (claim.claimId !== testGeneratedClaimId) throw new Error('Mismatched claim ID');
  return `HTTP 200 OK - Successfully retrieved claim ${claim.claimId} (Claimant: ${claim.policyHolder}, Amount: $${claim.claimedAmount})`;
});

// RUN ALL TESTS
async function run() {
  console.log('================================================================');
  console.log('       RK ASSOCIATES PVT. LTD. - AUTOMATED TEST SUITE           ');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;
  const results = [];

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    process.stdout.write(`[Test ${i + 1}/${tests.length}] ${t.name} ... `);
    try {
      const details = await t.fn();
      console.log('PASSED');
      console.log(`       -> ${details}`);
      passed++;
      results.push({ name: t.name, status: 'PASSED', details });
    } catch (err) {
      console.log('FAILED');
      console.log(`       -> Error: ${err.message}`);
      failed++;
      results.push({ name: t.name, status: 'FAILED', error: err.message });
    }
  }

  console.log('\n================================================================');
  console.log(`Test Execution Summary: ${passed} Passed, ${failed} Failed out of ${tests.length} tests`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

run();
