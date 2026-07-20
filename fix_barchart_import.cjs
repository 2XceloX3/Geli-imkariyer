const fs = require('fs');

const file = 'src/components/TopProfileMenu.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Add BarChart2 to the lucide-react import
  const importRegex = /import\s+\{([^}]+)\}\s+from\s+'lucide-react';/;
  const match = content.match(importRegex);
  
  if (match) {
    let importsStr = match[1];
    
    if (!importsStr.includes('BarChart2')) {
      content = content.replace(importRegex, `import { $1, BarChart2 } from 'lucide-react';`);
      fs.writeFileSync(file, content);
      console.log('Added BarChart2 import to TopProfileMenu.jsx');
    } else {
      console.log('BarChart2 already imported in TopProfileMenu.jsx');
    }
  }
}
