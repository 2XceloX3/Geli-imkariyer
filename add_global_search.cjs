const fs = require('fs');

const feeds = [
  'src/components/StudentFeed.jsx',
  'src/components/AlumniFeed.jsx',
  'src/components/CompanyFeed.jsx',
  'src/components/AcademicStaffFeed.jsx'
];

const searchBarHTML = `
          {/* GLOBAL SEARCH BAR (LinkedIn Style) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="Öğrenci, firma, mezun veya içerik ara..." 
                className="w-full bg-[#EEF3F8] text-gray-900 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none block pl-10 p-2 transition-all"
              />
            </div>
          </div>
`;

feeds.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // We will insert the search bar after the Logo div in the navbar.
    // Specifically looking for:
    // <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kariyer Portalı</p>
    // </div>
    // </div>
    
    const targetString = `<p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Kariyer Portalı</p>\n            </div>\n          </div>`;
    const targetStringFallback = `Kariyer Portalı</p>\n            </div>\n          </div>`;
    
    if (content.includes(targetStringFallback) && !content.includes('GLOBAL SEARCH BAR')) {
      content = content.replace(targetStringFallback, targetStringFallback + searchBarHTML);
      
      // Also make sure Search is imported from lucide-react if not present
      if (!content.includes('Search,')) {
        content = content.replace(/import\s+\{[^}]*\}\s+from\s+['"]lucide-react['"]/, (match) => match.replace('{', '{ Search,'));
      }

      fs.writeFileSync(file, content);
      console.log('Added Global Search to', file);
    }
  }
});
