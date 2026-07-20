const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/CareerTest.jsx',
  'src/components/CareerRoadmap.jsx',
  'src/components/StartupIncubator.jsx'
];

for (const file of filesToFix) {
  try {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    // Replace \${ with ${
    content = content.replace(/\\\${/g, '${');
    
    fs.writeFileSync(filePath, content);
    console.log(`Fixed escaping in ${file}`);
  } catch (e) {
    console.error(`Error fixing ${file}: ${e.message}`);
  }
}
