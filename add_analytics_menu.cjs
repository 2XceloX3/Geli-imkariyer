const fs = require('fs');

const file = 'src/components/TopProfileMenu.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Insert the link right above the AI CV Builder
  const cvBuilderRegex = /<button role="menuitem" onClick=\{\(\) => \{\s*setIsOpen\(false\);\s*setView\?\.\('cvbuilder'\);\s*\}\} className="w-full text-left px-4 py-2 text-\[13px\] font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center gap-3 group">/;
  
  const analyticsLink = `
                {/* Kariyer Analitiği Merkezi */}
                <button 
                  role="menuitem" 
                  onClick={() => { setIsOpen(false); setView?.('student_analytics'); }} 
                  className="w-full text-left px-4 py-2 text-[13px] font-bold text-[#0A66C2] bg-blue-50 hover:bg-blue-100 transition-all duration-200 flex items-center gap-3 group"
                >
                  <BarChart2 size={16} className="text-[#0A66C2] group-hover:text-blue-800 transition-all duration-200" /> Kariyer Analitiği <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[9px] px-1.5 py-0.5 rounded-full ml-auto shadow-sm">PREMIUM</span>
                </button>
                `;

  if (!content.includes('student_analytics')) {
    content = content.replace(cvBuilderRegex, analyticsLink + '\n                ' + match_string(content, cvBuilderRegex));
    fs.writeFileSync(file, content);
    console.log('Added Kariyer Analitiği link to TopProfileMenu.jsx');
  }
}

function match_string(content, regex) {
    const match = content.match(regex);
    return match ? match[0] : '';
}
