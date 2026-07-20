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

let fixesCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Fix Career Center naming globally
  content = content.replace(/Kariyer Geliştirme Merkezi/g, 'Kariyer Yönlendirme Uygulama ve Araştırma Merkezi');
  content = content.replace(/Kariyer Yönlendirme Araştırma Merkezi/g, 'Kariyer Yönlendirme Uygulama ve Araştırma Merkezi');
  content = content.replace(/Kariyer Gelişim Merkezi/g, 'Kariyer Yönlendirme Uygulama ve Araştırma Merkezi');
  content = content.replace(/Kariyer Geliştirme Koordinatörlüğü/g, 'Kariyer Yönlendirme Uygulama ve Araştırma Merkezi');
  content = content.replace(/Kariyer Yönlendirme Merkezi/g, 'Kariyer Yönlendirme Uygulama ve Araştırma Merkezi');
  content = content.replace(/Kariyer Yönlendirme ve Uygulama Araştırma Merkezi/g, 'Kariyer Yönlendirme Uygulama ve Araştırma Merkezi');
  
  // Fix Distance Learning name
  content = content.replace(/Esuzemi \(Uzaktan Eğitim\)/g, 'İGÜZEM (Uzaktan Eğitim)');
  content = content.replace(/Esuzemi/g, 'İGÜZEM');

  // Fix Typos
  content = content.replace(/Gürol Bingöl'un/g, "Gürol Bingöl'ün");
  content = content.replace(/Canada Digital Market Inc. Digital Market/g, 'Canada Digital Market Inc.');

  // Write changes
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    fixesCount++;
  }
});

console.log('--- CONTENT FIX REPORT ---');
console.log('Files fixed for terminology:', fixesCount);
