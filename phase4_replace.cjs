const fs = require('fs');
const path = require('path');

// Phase 4: Fix CSS variable references still using old 'red-dark' and 'coral' names
// We add aliases in the CSS and fix actual usage to navy secondary color
const replacements = [
  // CSS variable references in JSX - map old vars to new navy palette
  ['var(--brand-red-dark)', 'var(--brand-secondary)'],
  ['var(--brand-coral)', 'var(--brand-blue)'],
  ['var(--brand-red)', 'var(--brand-navy)'],
];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'dist', '.git'].includes(entry.name)) continue;
      walk(fp);
    } else if (/\.(js|jsx|ts|tsx|css)$/.test(entry.name)) {
      let content = fs.readFileSync(fp, 'utf8');
      const orig = content;
      for (const [from, to] of replacements) {
        while (content.includes(from)) content = content.split(from).join(to);
      }
      if (content !== orig) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log('P4 Updated:', fp.replace(__dirname, '.'));
      }
    }
  }
}

walk(path.join(__dirname, 'src'));
console.log('\nPhase 4 complete!');
