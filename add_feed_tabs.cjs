const fs = require('fs');

let content = fs.readFileSync('src/components/StudentFeed.jsx', 'utf8');

if (!content.includes('const [feedFilter, setFeedFilter]')) {
  content = content.replace(
    /const \[activeTab, setActiveTab\] = useState\('feed'\);/,
    `const [activeTab, setActiveTab] = useState('feed');\n  const [feedFilter, setFeedFilter] = useState('for_you'); // for_you, following`
  );
}

// Find the line with {/* FEED POSTS */}
const lines = content.split(/\r?\n/);
const index = lines.findIndex(l => l.includes('{/* FEED POSTS */}'));

if (index !== -1 && !content.includes('feedFilter === \'for_you\'')) {
  const tabs = `          {/* FEED TABS (LINKEDIN STYLE) */}
          <div className="flex items-center gap-6 border-b border-gray-200 mb-4 px-2">
            <button 
              onClick={() => setFeedFilter('for_you')} 
              className={\`pb-3 font-semibold text-[15px] transition-colors relative \${feedFilter === 'for_you' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}\`}
            >
              Senin İçin
              {feedFilter === 'for_you' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setFeedFilter('following')} 
              className={\`pb-3 font-semibold text-[15px] transition-colors relative \${feedFilter === 'following' ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}\`}
            >
              Ağım
              {feedFilter === 'following' && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full"></div>}
            </button>
          </div>
`;
  lines.splice(index, 0, tabs);
  content = lines.join('\n');
  fs.writeFileSync('src/components/StudentFeed.jsx', content);
  console.log('Added feed tabs successfully using array splice');
} else {
  console.log('Tabs already present or index not found');
}
