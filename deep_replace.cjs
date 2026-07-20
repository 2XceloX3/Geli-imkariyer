const fs = require('fs');
const path = require('path');

// =====================================================
// PHASE 1: Global text + color + localStorage key replacements
// =====================================================
const textReplacements = [
  // localStorage keys
  ['iesu_mock_user', 'igu_mock_user'],
  ['iesu_user_role_v1', 'igu_user_role_v1'],
  ['iesu_view_v1', 'igu_view_v1'],
  ['iesu_likes_reset_v4', 'igu_likes_reset_v4'],
  ['iesu_posts', 'igu_posts'],
  ['iesu-kariyer-store-v1', 'igu-kariyer-store-v1'],
  // Logo path
  ['/iesu-logo.svg', '/igu-logo.svg'],
  ['iesu-logo.svg', 'igu-logo.svg'],
  // Color variables (old ones that leaked back)
  ['var(--brand-rose-bg)', 'var(--brand-bg)'],
  ['var(--brand-soft-red)', 'var(--brand-soft-blue)'],
  ['var(--brand-pomegranate)', 'var(--brand-navy)'],
  ['var(--brand-red)', 'var(--brand-navy)'],
  ['--brand-rose-bg', '--brand-bg'],
  ['--brand-soft-red', '--brand-soft-blue'],
  ['--brand-pomegranate', '--brand-navy'],
  // Old colors in hex form
  ['#c81d3f', '#0A2342'],
  ['#B91C1C', '#0A2342'],
  ['#132A49', '#0A2342'],
  ['#D32F2F', '#0A2342'],
  ['#D72638', '#0A2342'],
  ['#B71C1C', '#163B65'],
  ['#E63946', '#163B65'],
  ['#FF6F61', '#3B82F6'],
  ['#FF5A5F', '#3B82F6'],
  ['#FF8A80', '#93C5FD'],
  ['#FFE8EA', '#EFF6FF'],
  ['#FFF4F5', '#F0F7FF'],
  ['#9F1D2C', '#0A2342'],
  // Tailwind color classes
  ['bg-gelisim-navy', 'bg-[#0A2342]'],
  ['text-gelisim-navy', 'text-[#0A2342]'],
  ['hover:bg-gelisim-navy', 'hover:bg-[#163B65]'],
  // Text replacements
  ['İstanbul Esenyurt Üniversitesi', 'İstanbul Gelişim Üniversitesi'],
  ['Esenyurt Üniversitesi', 'Gelişim Üniversitesi'],
  ['esenyurt.edu.tr', 'gelisim.edu.tr'],
  ['IESU Kariyer', 'Gelişim Kariyer'],
  ['İESÜ Kariyer', 'İGÜ Kariyer'],
  ['İESÜ BAHAR ŞENLİĞİ', 'İGÜ BAHAR ŞENLİĞİ'],
  ['İESÜ', 'İGÜ'],
  ['IESU', 'İGÜ'],
  ['Esenyurt', 'Gelişim'],
  ['esenyurt', 'gelisim'],
  ['@esenyurt.edu.tr', '@gelisim.edu.tr'],
  // Remaining iesu_user_role reference
  ["localStorage.getItem('iesu_user_role')", "localStorage.getItem('igu_user_role')"],
];

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip node_modules, dist, .git
      if (['node_modules', 'dist', '.git', '.github'].includes(entry.name)) continue;
      walk(fullPath, callback);
    } else {
      callback(fullPath);
    }
  }
}

const extensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json', '.md', '.svg']);
let changedFiles = 0;

walk(path.join(__dirname, 'src'), (filePath) => {
  const ext = path.extname(filePath);
  if (!extensions.has(ext)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const [from, to] of textReplacements) {
    while (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath.replace(__dirname, '.'));
    changedFiles++;
  }
});

// Also process root-level HTML and manifest
const rootFiles = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'public', 'manifest.webmanifest'),
];
for (const filePath of rootFiles) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  for (const [from, to] of textReplacements) {
    while (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath.replace(__dirname, '.'));
    changedFiles++;
  }
}

console.log(`\nDone! ${changedFiles} files updated.`);
