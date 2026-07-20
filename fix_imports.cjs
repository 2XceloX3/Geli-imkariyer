const fs = require('fs');

const feeds = [
  'src/components/StudentFeed.jsx',
  'src/components/AlumniFeed.jsx',
  'src/components/CompanyFeed.jsx'
];

feeds.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if ChevronDown is in the import from 'lucide-react'
    const lucideImportMatch = content.match(/import\s+\{[^}]*\}\s+from\s+['"]lucide-react['"]/);
    if (lucideImportMatch && !lucideImportMatch[0].includes('ChevronDown')) {
      const newImport = lucideImportMatch[0].replace('}', ', ChevronDown }');
      content = content.replace(lucideImportMatch[0], newImport);
      fs.writeFileSync(file, content);
      console.log('Added ChevronDown to', file);
    }
  }
});
