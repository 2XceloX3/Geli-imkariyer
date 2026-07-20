const fs = require('fs');

const appPath = 'src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Add import
const appImportTarget = "const MentorBooking = lazy(() => import('./components/MentorBooking'));";
const newAppImport = "const MentorBooking = lazy(() => import('./components/MentorBooking'));\nconst SmartCertificates = lazy(() => import('./components/SmartCertificates'));";
if (appContent.includes(appImportTarget) && !appContent.includes("SmartCertificates")) {
  appContent = appContent.replace(appImportTarget, newAppImport);
}

// Add view to valid views
const appViewTarget = "const validViews = ['landing', 'leaderboard', 'live_rooms', 'mentor_match', 'virtual_fair', 'alumni_card', 'career_test', 'career_roadmap', 'startup_incubator', 'global_map', 'digital_portfolio', 'metaverse_library', 'hackathon_market', 'alumni_dao', 'campus_map', 'anka_chat', 'wallet', 'mentor_booking'";
if (appContent.includes(appViewTarget) && !appContent.includes("'smart_certs'")) {
  appContent = appContent.replace(appViewTarget, "const validViews = ['landing', 'leaderboard', 'live_rooms', 'mentor_match', 'virtual_fair', 'alumni_card', 'career_test', 'career_roadmap', 'startup_incubator', 'global_map', 'digital_portfolio', 'metaverse_library', 'hackathon_market', 'alumni_dao', 'campus_map', 'anka_chat', 'wallet', 'mentor_booking', 'smart_certs'");
}

// Add Route component
const appRouteTarget = "{view === 'mentor_booking' && <MentorBooking currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}";
const newAppRoute = `      {view === 'mentor_booking' && <MentorBooking currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}
      {view === 'smart_certs' && <SmartCertificates currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}`;
if (appContent.includes(appRouteTarget) && !appContent.includes("view === 'smart_certs'")) {
  appContent = appContent.replace(appRouteTarget, newAppRoute);
}

fs.writeFileSync(appPath, appContent);
console.log('App.jsx patched for SmartCertificates');

const menuPath = 'src/components/TopProfileMenu.jsx';
let menuContent = fs.readFileSync(menuPath, 'utf8');

let idx = menuContent.indexOf("setView?.('mentor_booking')");
if (idx !== -1) {
  let closeBtn = menuContent.indexOf("</button>", idx);
  if (closeBtn !== -1) {
    const insertionPoint = closeBtn + "</button>".length;
    const injection = `
                    <button 
                      role="menuitem"
                      onClick={() => { setIsOpen(false); setView?.('smart_certs'); }}
                      className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center gap-3"
                    >
                      <ShieldCheck size={16} className="text-emerald-500" /> Akıllı Sertifikalar
                    </button>`;
    
    if (!menuContent.includes("setView?.('smart_certs')")) {
      menuContent = menuContent.slice(0, insertionPoint) + injection + menuContent.slice(insertionPoint);
      fs.writeFileSync(menuPath, menuContent);
      console.log('TopProfileMenu.jsx patched for SmartCertificates');
    }
  }
}
