const fs = require('fs');

const appPath = 'src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Add import
const appImportTarget = "const LiveRoomsPanel = lazy(() => import('./components/LiveRoomsPanel'));";
const newAppImport = "const LiveRoomsPanel = lazy(() => import('./components/LiveRoomsPanel'));\nconst GelisimWallet = lazy(() => import('./components/GelisimWallet'));";
if (appContent.includes(appImportTarget) && !appContent.includes("GelisimWallet")) {
  appContent = appContent.replace(appImportTarget, newAppImport);
}

// Add view to valid views
const appViewTarget = "const validViews = ['landing', 'leaderboard', 'live_rooms', 'mentor_match', 'virtual_fair', 'alumni_card', 'career_test', 'career_roadmap', 'startup_incubator', 'global_map', 'digital_portfolio', 'metaverse_library', 'hackathon_market', 'alumni_dao', 'campus_map', 'anka_chat'";
if (appContent.includes(appViewTarget) && !appContent.includes("'wallet'")) {
  appContent = appContent.replace(appViewTarget, "const validViews = ['landing', 'leaderboard', 'live_rooms', 'mentor_match', 'virtual_fair', 'alumni_card', 'career_test', 'career_roadmap', 'startup_incubator', 'global_map', 'digital_portfolio', 'metaverse_library', 'hackathon_market', 'alumni_dao', 'campus_map', 'anka_chat', 'wallet'");
}

// Add Route component
const appRouteTarget = "{view === 'anka_chat' && <AnkaChat currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}";
const newAppRoute = `      {view === 'anka_chat' && <AnkaChat currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}
      {view === 'wallet' && <GelisimWallet currentUser={currentUser} userRole={userRole} setView={setView} setSelectedUserId={setSelectedUserId} />}`;
if (appContent.includes(appRouteTarget) && !appContent.includes("view === 'wallet'")) {
  appContent = appContent.replace(appRouteTarget, newAppRoute);
}

fs.writeFileSync(appPath, appContent);
console.log('App.jsx patched for GelisimWallet');

const menuPath = 'src/components/TopProfileMenu.jsx';
let menuContent = fs.readFileSync(menuPath, 'utf8');

let idx = menuContent.indexOf("setView?.('anka_chat')");
if (idx !== -1) {
  let closeBtn = menuContent.indexOf("</button>", idx);
  if (closeBtn !== -1) {
    const insertionPoint = closeBtn + "</button>".length;
    const injection = `
                    <button 
                      role="menuitem"
                      onClick={() => { setIsOpen(false); setView?.('wallet'); }}
                      className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-700 hover:text-amber-600 hover:bg-amber-50 transition-colors flex items-center gap-3"
                    >
                      <Wallet size={16} className="text-amber-500" /> Gelişim Cüzdanı
                    </button>`;
    
    if (!menuContent.includes("setView?.('wallet')")) {
      menuContent = menuContent.slice(0, insertionPoint) + injection + menuContent.slice(insertionPoint);
      fs.writeFileSync(menuPath, menuContent);
      console.log('TopProfileMenu.jsx patched for GelisimWallet');
    }
  }
}
