const fs = require('fs');

const appPath = 'src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Add import
const appImportTarget = "const GelisimWallet = lazy(() => import('./components/GelisimWallet'));";
const newAppImport = "const GelisimWallet = lazy(() => import('./components/GelisimWallet'));\nconst MentorBooking = lazy(() => import('./components/MentorBooking'));";
if (appContent.includes(appImportTarget) && !appContent.includes("MentorBooking")) {
  appContent = appContent.replace(appImportTarget, newAppImport);
}

// Add view to valid views
const appViewTarget = "const validViews = ['landing', 'leaderboard', 'live_rooms', 'mentor_match', 'virtual_fair', 'alumni_card', 'career_test', 'career_roadmap', 'startup_incubator', 'global_map', 'digital_portfolio', 'metaverse_library', 'hackathon_market', 'alumni_dao', 'campus_map', 'anka_chat', 'wallet'";
if (appContent.includes(appViewTarget) && !appContent.includes("'mentor_booking'")) {
  appContent = appContent.replace(appViewTarget, "const validViews = ['landing', 'leaderboard', 'live_rooms', 'mentor_match', 'virtual_fair', 'alumni_card', 'career_test', 'career_roadmap', 'startup_incubator', 'global_map', 'digital_portfolio', 'metaverse_library', 'hackathon_market', 'alumni_dao', 'campus_map', 'anka_chat', 'wallet', 'mentor_booking'");
}

// Add Route component
const appRouteTarget = "{view === 'wallet' && <GelisimWallet currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}";
const newAppRoute = `      {view === 'wallet' && <GelisimWallet currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}
      {view === 'mentor_booking' && <MentorBooking currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}`;
if (appContent.includes(appRouteTarget) && !appContent.includes("view === 'mentor_booking'")) {
  appContent = appContent.replace(appRouteTarget, newAppRoute);
}

fs.writeFileSync(appPath, appContent);
console.log('App.jsx patched for MentorBooking');

const menuPath = 'src/components/TopProfileMenu.jsx';
let menuContent = fs.readFileSync(menuPath, 'utf8');

let idx = menuContent.indexOf("setView?.('wallet')");
if (idx !== -1) {
  let closeBtn = menuContent.indexOf("</button>", idx);
  if (closeBtn !== -1) {
    const insertionPoint = closeBtn + "</button>".length;
    const injection = `
                    <button 
                      role="menuitem"
                      onClick={() => { setIsOpen(false); setView?.('mentor_booking'); }}
                      className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-3"
                    >
                      <CalendarCheck size={16} className="text-indigo-500" /> Mentor Ajandası
                    </button>`;
    
    if (!menuContent.includes("setView?.('mentor_booking')")) {
      menuContent = menuContent.slice(0, insertionPoint) + injection + menuContent.slice(insertionPoint);
      fs.writeFileSync(menuPath, menuContent);
      console.log('TopProfileMenu.jsx patched for MentorBooking');
    }
  }
}
