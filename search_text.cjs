const fs = require('fs');
const path = require('path');

function search(dir, str) {
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) search(p, str);
    else if (p.endsWith('.jsx') || p.endsWith('.js')) {
      let content = fs.readFileSync(p, 'utf8');
      if (content.includes(str)) {
        console.log(p);
      }
    }
  });
}

search('./src', 'Sonsuz Öğrenme Modu');
