const fs = require('fs');

const filesToPatch = [
  'src/components/CareerRoadmap.jsx',
  'src/components/MetaverseLibrary.jsx',
  'src/components/StartupIncubator.jsx'
];

for (const file of filesToPatch) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix the broken comment regex issue
    content = content.replace(
      "let cleanJson = response.replace(/json/g, '').replace(//g, '').trim();",
      "let cleanJson = response.replace(/json/gi, '').replace(/[\\`]/g, '').trim();"
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Repaired ${file}`);
  }
}
