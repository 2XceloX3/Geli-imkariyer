const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let fixCount = 0;

walkDir(path.join(__dirname, 'src', 'components'), function(filePath) {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    // Replace \${ with ${
    content = content.replace(/\\\${/g, '${');
    
    if (original !== content) {
      fs.writeFileSync(filePath, content);
      console.log(`Fixed escaping in ${filePath}`);
      fixCount++;
    }
  }
});

console.log(`Finished. Fixed ${fixCount} files.`);
