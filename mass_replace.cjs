const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(dirPath);
  });
}

walk(path.join(__dirname, 'src'), (filePath) => {
  if (filePath.match(/\.(js|jsx)$/)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Data variables
    content = content.replace(/IESU_FACULTIES/g, 'IGU_FACULTIES');
    content = content.replace(/IESU_MYO/g, 'IGU_MYO');
    content = content.replace(/IESU_YUKSEKOKUL/g, 'IGU_YUKSEKOKUL');
    content = content.replace(/IESU_ENSTITU/g, 'IGU_ENSTITU');
    
    // Tailwind classes
    content = content.replace(/iesu-red/g, 'gelisim-navy');
    content = content.replace(/iesu-darkRed/g, 'gelisim-navy');
    content = content.replace(/iesu-coral/g, 'gelisim-blue');
    content = content.replace(/text-iesu/g, 'text-gelisim-navy');
    content = content.replace(/bg-iesu/g, 'bg-gelisim-navy');
    
    // Text replacements
    content = content.replace(/İstanbul Esenyurt Üniversitesi/g, 'İstanbul Gelişim Üniversitesi');
    content = content.replace(/Esenyurt Üniversitesi/g, 'Gelişim Üniversitesi');
    content = content.replace(/esenyurt\.edu\.tr/g, 'gelisim.edu.tr');
    content = content.replace(/IESU Kariyer/g, 'Gelişim Kariyer');
    content = content.replace(/İESÜ Kariyer/g, 'Gelişim Kariyer');
    content = content.replace(/IESU/g, 'İGÜ');
    content = content.replace(/İESÜ/g, 'İGÜ');
    content = content.replace(/Esenyurt/g, 'Gelişim');
    content = content.replace(/esenyurt/g, 'gelisim');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
