const fs = require('fs');

let content = fs.readFileSync('src/components/TopProfileMenu.jsx', 'utf8');

const target = `                  </>
                    {currentUser?.name || 'Kullanıcı'}
                    {currentUser?.badge && <ShieldCheck size={14} className="text-blue-500 shrink-0" title={currentUser?.badge} />}`;

const replacement = `                  </>
                )}
                
                <button role="menuitem" onClick={() => { setIsOpen(false); setView?.('cvbuilder'); }} className="w-full text-left px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 group">
                  <Wand2 size={16} className="text-gray-500 group-hover:text-gray-700 transition-all duration-200" /> AI CV Oluşturucu <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto animate-pulse">YENİ</span>
                </button>
              </div>

              {/* LOGOUT */}
              <div className="border-t border-gray-50 mt-1 py-1">
                <button role="menuitem" onClick={handleLogout} className="w-full text-left px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-3 group">
                  <LogOut size={16} className="text-red-500 group-hover:text-red-600 transition-all duration-200" /> Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <>
              {/* NORMAL USER HEADER */}
              <div className="px-4 py-3 border-b border-gray-50">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-sm font-black text-gray-900 truncate flex items-center gap-1 transition-all duration-200">
                    {currentUser?.name || 'Kullanıcı'}
                    {currentUser?.badge && <ShieldCheck size={14} className="text-blue-500 shrink-0" title={currentUser?.badge} />}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/TopProfileMenu.jsx', content);
  console.log('Fixed TopProfileMenu.jsx correctly.');
} else {
  console.log('Could not find target strings.');
}
