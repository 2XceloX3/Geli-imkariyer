const fs = require('fs');

const feeds = [
  'src/components/StudentFeed.jsx',
  'src/components/AlumniFeed.jsx',
  'src/components/CompanyFeed.jsx'
];

const footerBlock = `
          {/* PROFESSIONAL RIGHT SIDEBAR FOOTER */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-6 text-[12px] text-gray-500 font-medium px-4 text-center">
            <a href="#" className="hover:text-blue-600 transition-colors">Hakkımızda</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Erişilebilirlik</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Yardım Merkezi</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Gizlilik ve Şartlar</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Reklam Seçenekleri</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Kariyer</a>
            <div className="w-full flex items-center justify-center gap-1 mt-2">
              <span className="font-bold text-[#0A2342]">İGÜ Kariyer Portalı</span>
              <span>© 2026</span>
            </div>
          </div>
`;

feeds.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We will insert the footer right before the closing div of the right sidebar.
    // In our structure, the right sidebar ends before {/* Applications Interface Overlay */} or {/* Overlay Modal */}
    // We can insert it at the end of the <div className="hidden xl:block w-[300px] shrink-0 space-y-6"> block.
    
    // A reliable way is to find `</div>\n\n        {/* Applications Interface Overlay */}`
    // or `</div>\n\n        {/* --- KARIYER AĞI`
    const insertTargets = [
      '        </div>\n\n        {/* Applications Interface Overlay */}',
      '        </div>\n\n        {/* --- KARIYER AĞI (MOBİL İÇİN VEYA SEKME) --- */}',
      '        </div>\n\n        {/* Uygulama / Staj Overlay Modalları */}'
    ];

    let modified = false;
    for (const target of insertTargets) {
      if (content.includes(target) && !content.includes('PROFESSIONAL RIGHT SIDEBAR FOOTER')) {
        content = content.replace(target, footerBlock + '\n' + target);
        modified = true;
        break;
      }
    }

    if (modified) {
      fs.writeFileSync(file, content);
      console.log('Added Professional Footer to', file);
    } else {
      console.log('Could not find insertion point for', file);
    }
  }
});
