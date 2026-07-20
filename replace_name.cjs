const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      walk(p);
    } else if (p.endsWith('.jsx') || p.endsWith('.js') || p.endsWith('.md')) {
      let content = fs.readFileSync(p, 'utf8');
      let original = content;
      
      // Replace the longer one first
      content = content.replace(/Kariyer Geliştirme Ofisi Koordinatörlüğü/g, 'Kariyer Geliştirme Merkezi');
      content = content.replace(/Kariyer Geliştirme Ofisi/g, 'Kariyer Geliştirme Merkezi');
      // Fix potential double "Kariyer Geliştirme Merkezi Koordinatörlüğü" if any were partially replaced
      content = content.replace(/Kariyer Geliştirme Merkezi Koordinatörlüğü/g, 'Kariyer Geliştirme Merkezi');
      
      // Also fix 'Kariyer Ofisi' to 'Kariyer Merkezi' maybe? 
      content = content.replace(/Kariyer Ofisi/g, 'Kariyer Merkezi');

      if (content !== original) {
        fs.writeFileSync(p, content, 'utf8');
        console.log('Updated ' + p);
      }
    }
  });
}

walk('src');
console.log("Done.");
