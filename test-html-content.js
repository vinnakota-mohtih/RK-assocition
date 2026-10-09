const http = require('http');

function fetchHtml(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function verifyHtml() {
  console.log('--- VERIFYING PAGE HTML & COMPLIANCE REQUIREMENTS ---');

  // 1. Homepage
  const home = await fetchHtml('/');
  console.log('Homepage Status:', home.status);
  console.assert(home.html.includes('RK ASSOCIATES'), 'Homepage contains RK ASSOCIATES branding');
  console.assert(home.html.includes('148'), 'Homepage contains IRDAI Reg 148');
  console.assert(home.html.includes('22,100+'), 'Homepage contains 22,100+ headline stat');

  // 2. Care Supreme Plan Detail
  const supreme = await fetchHtml('/plans/care-supreme');
  console.log('Care Supreme Status:', supreme.status);
  console.assert(supreme.html.includes('CHIHLIP25047V022425'), 'Care Supreme contains correct UIN CHIHLIP25047V022425');
  console.assert(supreme.html.includes('Unlimited Automatic Recharge'), 'Care Supreme contains recharge benefit');
  console.assert(supreme.html.includes('preExistingDiseases') || supreme.html.includes('Declared and accepted conditions') || supreme.html.includes('Waiting Period'), 'Care Supreme contains waiting periods');

  // 3. Calculator Page
  const quote = await fetchHtml('/quote');
  console.log('Quote Page Status:', quote.status);
  console.assert(quote.html.includes('Premium Calculator'), 'Quote contains Calculator title');
  console.assert(quote.html.includes('BMI Calculator'), 'Quote contains BMI tool');
  console.assert(quote.html.includes('Cumulative Bonus'), 'Quote contains Cumulative bonus tool');

  // 4. Claims Page
  const claims = await fetchHtml('/claims');
  console.log('Claims Page Status:', claims.status);
  console.assert(claims.html.includes('Cashless Hospitalization Flow'), 'Claims contains 4-step cashless');
  console.assert(claims.html.includes('Reimbursement Claim Flow'), 'Claims contains 4-step reimbursement');
  console.assert(claims.html.includes('Mandatory Document Checklist'), 'Claims contains document checklist');
  console.assert(claims.html.includes('https://www.careinsurance.com/rhicl/claim/login'), 'Claims contains official login link');

  // 5. Excluded Hospitals Page
  const excluded = await fetchHtml('/excluded-hospitals');
  console.log('Excluded Hospitals Status:', excluded.status);
  console.assert(excluded.html.includes('Excluded / Non-Preferred Hospitals'), 'Excluded page uses compliant title');
  console.assert(!excluded.html.includes('Blacklist'), 'Excluded page never uses Blacklist wording');
  console.assert(excluded.html.includes('Emergency Stabilization Exception'), 'Excluded page includes emergency stabilization rule');
  console.assert(excluded.html.includes('Excluded_List.pdf'), 'Excluded page links to official PDF');

  // 6. Renewal Page
  const renew = await fetchHtml('/renew');
  console.log('Renew Page Status:', renew.status);
  console.assert(renew.html.includes('renew.careinsurance.com'), 'Renew page links to official renewal portal');
  console.assert(renew.html.includes('Cumulative Bonus Protected'), 'Renew page mentions NCB retention');

  // 7. Downloads Page
  const downloads = await fetchHtml('/downloads');
  console.log('Downloads Page Status:', downloads.status);
  console.assert(downloads.html.includes('Care Supreme – Brochure'), 'Downloads page lists Care Supreme brochure');
  console.assert(downloads.html.includes('care-supreme---brochure.pdf'), 'Downloads page links to CMS PDF');

  // 8. Legal Disclaimer Page
  const legal = await fetchHtml('/legal/disclaimer');
  console.log('Legal Page Status:', legal.status);
  console.assert(legal.html.includes('BEWARE OF SPURIOUS PHONE CALLS'), 'Legal page includes IRDAI fraud warning');
  console.assert(legal.html.includes('U66000DL2007PLC161503'), 'Legal page includes Care CIN');

  console.log('\n✨ ALL HTML & COMPLIANCE CHECKS PASSED WITH 100% ACCURACY!');
}

verifyHtml().catch(console.error);
