const fs = require('fs');

let content = fs.readFileSync('src/components/TopProfileMenu.jsx', 'utf8');

const target = `                    </button>
                  </>
                  <LogOut size={16} className="text-red-500 group-hover:text-red-600 transition-all duration-200" /> Çıkış Yap
                </button>
              </div>
            </>
          ) : (`;

const replacement = `                    </button>
                  </>
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
          ) : (`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/TopProfileMenu.jsx', content);
  console.log('Fixed TopProfileMenu.jsx syntax error');
} else {
  console.log('Target not found!');
  
  // Try fallback split and slice
  const lines = content.split('\\n');
  const startIdx = lines.findIndex(l => l.includes('<ShieldCheck size={16} className="text-emerald-500" /> Akıllı Sertifikalar'));
  if (startIdx !== -1) {
    const endIdx = lines.findIndex((l, i) => i > startIdx && l.includes(') : ('));
    if (endIdx !== -1) {
      const newLines = lines.slice(0, startIdx + 3);
      newLines.push('                  </>');
      newLines.push('                )}');
      newLines.push('                <button role="menuitem" onClick={() => { setIsOpen(false); setView?.("cvbuilder"); }} className="w-full text-left px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 group">');
      newLines.push('                  <Wand2 size={16} className="text-gray-500 group-hover:text-gray-700 transition-all duration-200" /> AI CV Oluşturucu <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto animate-pulse">YENİ</span>');
      newLines.push('                </button>');
      newLines.push('              </div>');
      newLines.push('');
      newLines.push('              {/* LOGOUT */}');
      newLines.push('              <div className="border-t border-gray-50 mt-1 py-1">');
      newLines.push('                <button role="menuitem" onClick={handleLogout} className="w-full text-left px-4 py-2 text-[13px] font-bold text-red-600 hover:bg-red-50 transition-all duration-200 flex items-center gap-3 group">');
      newLines.push('                  <LogOut size={16} className="text-red-500 group-hover:text-red-600 transition-all duration-200" /> Çıkış Yap');
      newLines.push('                </button>');
      newLines.push('              </div>');
      newLines.push('            </>');
      
      const rest = lines.slice(endIdx);
      fs.writeFileSync('src/components/TopProfileMenu.jsx', [...newLines, ...rest].join('\\n'));
      console.log('Fixed using fallback slice');
    }
  }
}
