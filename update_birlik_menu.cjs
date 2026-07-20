const fs = require('fs');

let content = fs.readFileSync('src/components/TopProfileMenu.jsx', 'utf8');

// We need to inject the "Birlik Ağı" button into the Admin section as well.
// The admin section currently ends with:
// <Wand2 size={16} ... /> AI CV Oluşturucu ...
// </button>
// </div>
// {/* LOGOUT */}

const targetAdmin = `<button role="menuitem" onClick={() => { setIsOpen(false); setView?.('cvbuilder'); }} className="w-full text-left px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 group">
                  <Wand2 size={16} className="text-gray-500 group-hover:text-gray-700 transition-all duration-200" /> AI CV Oluşturucu <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto animate-pulse">YENİ</span>
                </button>
              </div>`;

const replacementAdmin = `<button role="menuitem" onClick={() => { setIsOpen(false); setView?.('cvbuilder'); }} className="w-full text-left px-4 py-2 text-[13px] font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 group">
                  <Wand2 size={16} className="text-gray-500 group-hover:text-gray-700 transition-all duration-200" /> AI CV Oluşturucu <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto animate-pulse">YENİ</span>
                </button>
                <button 
                  role="menuitem"
                  onClick={() => { 
                    setIsOpen(false); 
                    setView?.(userRole === 'admin' ? 'admin' : (userRole === 'company' ? 'company' : userRole || 'student'));
                    if(window.toast) window.toast.success('Birlik Ağı artık Ana Akışa (Feed) entegre edildi!');
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-200 flex items-center gap-3 group"
                >
                  <Globe size={16} className="text-indigo-500 group-hover:text-indigo-700 transition-all duration-200" /> Birlik Ağı (Ana Akış)
                </button>
              </div>`;

if (content.includes(targetAdmin)) {
  content = content.replace(targetAdmin, replacementAdmin);
  console.log('Injected Birlik Ağı into Admin menu');
}

// Now replace the normal user Birlik Ağı button to also do the same feed integration behavior
const targetNormal = `onClick={() => { setIsOpen(false); setView?.('birlik_agi'); }}`;
const replacementNormal = `onClick={() => { 
                    setIsOpen(false); 
                    setView?.(userRole === 'admin' ? 'admin' : (userRole === 'company' ? 'company' : userRole || 'student'));
                    if(window.toast) window.toast.success('Birlik Ağı artık Ana Akışa (Feed) entegre edildi!');
                  }}`;

if (content.includes(targetNormal)) {
  content = content.replace(targetNormal, replacementNormal);
  console.log('Updated Normal user Birlik Ağı button');
}

fs.writeFileSync('src/components/TopProfileMenu.jsx', content);
