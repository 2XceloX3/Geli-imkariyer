const fs = require('fs');

let content = fs.readFileSync('src/components/TopProfileMenu.jsx', 'utf8');

const targetBirlikAdmin = `<button 
                  role="menuitem"
                  onClick={() => { 
                    setIsOpen(false); 
                    setView?.(userRole === 'admin' ? 'admin' : (userRole === 'company' ? 'company' : userRole || 'student'));
                    if(window.toast) window.toast.success('Birlik Ağı artık Ana Akışa (Feed) entegre edildi!');
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-800 transition-all duration-200 flex items-center gap-3 group"
                >
                  <Globe size={16} className="text-indigo-500 group-hover:text-indigo-700 transition-all duration-200" /> Birlik Ağı (Ana Akış)
                </button>`;

const replacementBirlikAdmin = `<button 
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
                <button 
                  role="menuitem"
                  onClick={() => { 
                    setIsOpen(false); 
                    setView?.(userRole === 'admin' ? 'admin' : (userRole === 'company' ? 'company' : userRole || 'student'));
                    if(window.toast) window.toast.success('TeamUp & Mentor özellikleri artık Ana Akışa entegre edildi!');
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800 transition-all duration-200 flex items-center gap-3 group"
                >
                  <Target size={16} className="text-purple-500 group-hover:text-purple-700 transition-all duration-200" /> TeamUp & Mentor Match
                </button>`;

// Replace all occurrences of targetBirlikAdmin with replacementBirlikAdmin. We injected it twice (once for admin, once for normal users... wait, for normal users we replaced onClick, not the whole button).
// Let's just use regex to insert it after the Birlik Ağı button in both places.

content = content.replace(/<button[^>]*>[\s\S]*?<Globe[^>]*>[\s\S]*?Birlik Ağı \(.*?\)[\s\S]*?<\/button>/g, match => {
  return match + `\n                <button 
                  role="menuitem"
                  onClick={() => { 
                    setIsOpen(false); 
                    setView?.(userRole === 'admin' ? 'admin' : (userRole === 'company' ? 'company' : userRole || 'student'));
                    if(window.toast) window.toast.success('TeamUp & Mentor özellikleri artık Ana Akışa entegre edildi!');
                  }}
                  className="w-full text-left px-4 py-2 text-[13px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 hover:text-purple-800 transition-all duration-200 flex items-center gap-3 group"
                >
                  <Target size={16} className="text-purple-500 group-hover:text-purple-700 transition-all duration-200" /> TeamUp & Mentor Match
                </button>`;
});

fs.writeFileSync('src/components/TopProfileMenu.jsx', content);
console.log('Injected TeamUp button into TopProfileMenu');
