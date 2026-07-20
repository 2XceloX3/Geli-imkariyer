const fs = require('fs');
const path = require('path');

// Phase 2: Remaining color & context replacements AFTER deep_replace.cjs
const replacements = [
  // Any leftover Tailwind class combos
  ['bg-[#0A2342]', 'bg-[#0A2342]'], // already correct - skip
  // Inline style colors
  ['background: #D32F2F', 'background: #0A2342'],
  ['background: #B91C1C', 'background: #0A2342'],
  ['background: #132A49', 'background: #0A2342'],
  ['background:#132A49', 'background:#0A2342'],
  ['#132A49', '#0A2342'],
  // bg-slate-900 used as brand in some components — leave (it's neutral)
  // Remaining label text
  ['İESÜ', 'İGÜ'],
  ['IESU', 'İGÜ'],
  ['İstanbul Esenyurt Üniversitesi', 'İstanbul Gelişim Üniversitesi'],
  ['Esenyurt Üniversitesi', 'Gelişim Üniversitesi'],
  ['esenyurt.edu.tr', 'gelisim.edu.tr'],
  ['@esenyurt.edu.tr', '@gelisim.edu.tr'],
  ['Esenyurt', 'Gelişim'],
  ['esenyurt', 'gelisim'],
  // localStorage
  ['iesu_', 'igu_'],
  ['iesu-kariyer', 'igu-kariyer'],
  // Logo refs
  ['/iesu-logo.svg', '/igu-logo.svg'],
  ['iesu-logo.svg', 'igu-logo.svg'],
  // CSS vars that may have leaked
  ['var(--brand-rose-bg)', 'var(--brand-bg)'],
  ['var(--brand-soft-red)', 'var(--brand-soft-blue)'],
  ['var(--brand-pomegranate)', 'var(--brand-navy)'],
  ['var(--brand-red)', 'var(--brand-navy)'],
  ['--brand-rose-bg', '--brand-bg'],
  // Accessibility labels
  ['İstanbul Esenyurt', 'İstanbul Gelişim'],
];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git', '.github'].includes(entry.name)) continue;
      walk(fullPath);
    } else if (/\.(js|jsx|ts|tsx|css|html|json|svg|md)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const [from, to] of replacements) {
        if (from === to) continue;
        while (content.includes(from)) {
          content = content.split(from).join(to);
        }
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Phase2 Updated:', fullPath.replace(__dirname, '.'));
      }
    }
  }
}

walk(path.join(__dirname, 'src'));
walk(path.join(__dirname, 'public'));

// Root files
const rootFiles = [path.join(__dirname, 'index.html')];
for (const fp of rootFiles) {
  if (!fs.existsSync(fp)) continue;
  let c = fs.readFileSync(fp, 'utf8');
  const orig = c;
  for (const [from, to] of replacements) {
    if (from === to) continue;
    while (c.includes(from)) c = c.split(from).join(to);
  }
  if (c !== orig) { fs.writeFileSync(fp, c, 'utf8'); console.log('Phase2 Updated:', fp); }
}

console.log('\nPhase 2 complete!');
