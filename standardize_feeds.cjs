const fs = require('fs');

const files = [
  'src/components/AlumniFeed.jsx',
  'src/components/CompanyFeed.jsx',
  'src/components/AcademicStaffFeed.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');

  // 1. Add feedFilter state
  if (!content.includes('const [feedFilter, setFeedFilter]')) {
    content = content.replace(
      /const \[activeTab, setActiveTab\] = useState\((?:'feed'|'overview')\);/,
      `$& \n  const [feedFilter, setFeedFilter] = useState('for_you'); // for_you, following`
    );
  }

  // 2. Add Feed Tabs right before {/* FEED POSTS */}
  const lines = content.split(/\r?\n/);
  const feedPostsIndex = lines.findIndex(l => l.includes('{/* FEED POSTS */}'));
  
  if (feedPostsIndex !== -1 && !content.includes('feedFilter === \'for_you\'')) {
    const tabs = `          {/* FEED TABS (LINKEDIN STYLE) */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2">
            <button 
              onClick={() => setFeedFilter('for_you')} 
              className={\`pb-3 font-semibold text-[15px] transition-colors relative \${feedFilter === 'for_you' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}\`}
            >
              Senin İçin
              {feedFilter === 'for_you' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0A2342] rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setFeedFilter('following')} 
              className={\`pb-3 font-semibold text-[15px] transition-colors relative \${feedFilter === 'following' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}\`}
            >
              Ağım
              {feedFilter === 'following' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#0A2342] rounded-t-full"></div>}
            </button>
          </div>
`;
    lines.splice(feedPostsIndex, 0, tabs);
    content = lines.join('\n');
    console.log(`Added feed tabs to ${file}`);
  }

  // 3. De-childishification: Replace `rounded-3xl` with `rounded-xl` globally in this file
  content = content.replace(/rounded-3xl/g, 'rounded-xl');
  content = content.replace(/rounded-\[2rem\]/g, 'rounded-xl');
  content = content.replace(/rounded-\[3rem\]/g, 'rounded-2xl');

  fs.writeFileSync(file, content);
});
