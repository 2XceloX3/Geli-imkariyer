const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        filelist = walkSync(path.join(dir, file), filelist);
      }
    } else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const dirPath = path.join(__dirname, 'src');
const files = walkSync(dirPath).filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Revert back to what the user explicitly requested: "Kariyer Geliştirme Merkezi"
  content = content.replace(/Kariyer Yönlendirme Uygulama ve Araştırma Merkezi/g, 'Kariyer Geliştirme Merkezi');
  content = content.replace(/Kariyer Yönlendirme ve Uygulama Araştırma Merkezi/g, 'Kariyer Geliştirme Merkezi');

  // Write changes
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
  }
});
console.log('Reverted official name to Kariyer Geliştirme Merkezi');
