import http from 'http';

const routes = [
  '/',
  '/index.html',
  '/landing/dist/index.html',
  '/portal/pages/public/services.html',
  '/portal/pages/public/privacy-policy.html',
  '/portal/pages/public/terms-and-conditions.html',
  '/portal/pages/public/track.html',
  '/portal/pages/public/verify-qr.html',
  '/portal/pages/auth/login.html',
  '/portal/pages/citizen/complaint.html',
  '/portal/pages/trader/dashboard.html',
  '/portal/pages/trader/register-instrument.html',
  '/portal/pages/trader/certificates.html',
  '/portal/pages/trader/applications.html',
  '/portal/pages/trader/profile.html',
  '/portal/pages/inspector/dashboard.html',
  '/portal/pages/inspector/inspect.html',
  '/portal/pages/inspector/schedule.html',
  '/portal/pages/inspector/history.html',
  '/portal/pages/admin/dashboard.html',
  '/portal/pages/admin/applications.html',
  '/portal/pages/admin/audit-log.html',
  '/portal/pages/admin/complaints.html',
  '/portal/pages/admin/inspectors.html'
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://127.0.0.1:8080${route}`, (res) => {
      const ok = res.statusCode === 200;
      console.log(`[${ok ? 'PASS' : 'FAIL'}] ${route} -> Status: ${res.statusCode} (${res.headers['content-type']})`);
      resolve(ok);
    }).on('error', (err) => {
      console.error(`[FAIL] ${route} -> ${err.message}`);
      resolve(false);
    });
  });
}

async function run() {
  console.log('--- Testing Legal Matrix Routes ---');
  let allPass = true;
  for (const r of routes) {
    const ok = await checkRoute(r);
    if (!ok) allPass = false;
  }
  console.log('-----------------------------------');
  console.log(`Overall Result: ${allPass ? 'ALL ROUTES VERIFIED 200 OK' : 'FAILURES DETECTED'}`);
  process.exit(allPass ? 0 : 1);
}

run();
