const fs = require('fs');
let content = fs.readFileSync('src/components/TopProfileMenu.jsx', 'utf8');

// The file currently has:
// 230:                   </>
// 231:                   <LogOut size={16} className="text-red-500 group-hover:text-red-600 transition-all duration-200" /> Çıkış Yap
// 232:                 </button>
// 233:               </div>

let fixed = content.replace(
`                  </>
                  <LogOut size={16} className="text-red-500 group-hover:text-red-600 transition-all duration-200" /> Çıkış Yap
                </button>
              </div>`,
`                  </>
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
              </div>`
);

fs.writeFileSync('src/components/TopProfileMenu.jsx', fixed);
console.log('Fixed TopProfileMenu');
