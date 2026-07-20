const fs = require('fs');
const path = require('path');

// Phase 3: Targeted remaining fixes
const replacements = [
  // ui-avatars background colors (old brand reds → new brand navy)
  ['background=b91c1c', 'background=0A2342'],
  ['background=B91C1C', 'background=0A2342'],
  ['background=132A49', 'background=0A2342'],
  ['background=132a49', 'background=0A2342'],
  ['background=D32F2F', 'background=0A2342'],
  ['background=d32f2f', 'background=0A2342'],
  ['background=c81d3f', 'background=0A2342'],
  // Specific old university text in component JSX / hardcoded strings
  ['T.C. İSTANBUL ESENYURT ÜNİVERSİTESİ', 'T.C. İSTANBUL GELİŞİM ÜNİVERSİTESİ'],
  // Encoded Esenyurt (mojibake in files)
  ['ESENYURT', 'GELİŞİM'],
  ['Esenyurt', 'Gelişim'],
  ['esenyurt', 'gelisim'],
  ['İESÜ', 'İGÜ'],
  ['IESU', 'İGÜ'],
  ['iesu', 'igu'],
  // feedCombiner legacy color
  ['background=132A49', 'background=0A2342'],
];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
      walk(fullPath);
    } else if (/\.(js|jsx|ts|tsx|css|html|svg)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      for (const [from, to] of replacements) {
        while (content.includes(from)) content = content.split(from).join(to);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('P3 Updated:', fullPath.replace(__dirname, '.'));
      }
    }
  }
}

walk(path.join(__dirname, 'src'));
walk(path.join(__dirname, 'public'));

console.log('\nPhase 3 complete!');
