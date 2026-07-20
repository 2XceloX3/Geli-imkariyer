const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Remove BirlikAgiPortal import
const importRegex = /import\s+BirlikAgiPortal\s+from\s+['"]\.\/components\/BirlikAgiPortal['"];?\s*/g;
content = content.replace(importRegex, '');

// Remove route
const routeRegex = /\{view === 'birlik_agi' && <BirlikAgiPortal[\s\S]*?\/>\}\s*/g;
content = content.replace(routeRegex, '');

fs.writeFileSync('src/App.jsx', content);
console.log('Removed BirlikAgiPortal from App.jsx');
