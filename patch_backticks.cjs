const fs = require('fs');

const filesToPatch = [
  'src/components/CareerRoadmap.jsx',
  'src/components/MetaverseLibrary.jsx',
  'src/components/StartupIncubator.jsx'
];

for (const file of filesToPatch) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // We want to remove ``` from inside the template literals in these files
    content = content.replace(/\(```\)/g, '()');
    content = content.replace(/```/g, ''); // Be careful, this removes all triple backticks. 
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Patched ${file}`);
  }
}
