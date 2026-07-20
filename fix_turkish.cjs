const fs = require('fs');
const path = require('path');

// Map of known broken patterns to correct Turkish characters
const fixes = [
  // Common double-byte corruption patterns (UTF-8 misread as Latin-1)
  [/Ã¼/g, 'ü'], [/Ã¶/g, 'ö'], [/Ã§/g, 'ç'], [/ÅŸ/g, 'ş'], [/Ä±/g, 'ı'],
  [/ÄŸ/g, 'ğ'], [/Ä°/g, 'İ'], [/Ãœ/g, 'Ü'], [/Ã–/g, 'Ö'], [/Ã‡/g, 'Ç'],
  [/Åž/g, 'Ş'], [/Äž/g, 'Ğ'],
  // Single replacement char patterns - common words
  [/Hesab\uFFFDm\uFFFD Aktifle\uFFFDtir/g, 'Hesabımı Aktifleştir'],
  [/Akademik Hesab\uFFFDm\uFFFD Aktifle\uFFFDtir/g, 'Akademik Hesabımı Aktifleştir'],
  [/Mezun Hesab\uFFFDm\uFFFD Aktifle\uFFFDtir/g, 'Mezun Hesabımı Aktifleştir'],
  [/Bo\uFFFD alan tutucu/g, 'Boş alan tutucu'],
  [/Bo\uFFFD/g, 'Boş'],
  [/bug\uFFFDne kadar geli\uFFFDtirdi\uFFFDin en karma\uFFFD\uFFFDk/g, 'bugüne kadar geliştirdiğin en karmaşık'],
  [/B\uFFFDt\uFFFDe talebiniz yoksa bo\uFFFD b\uFFFDrak\uFFFDn/g, 'Bütçe talebiniz yoksa boş bırakın'],
  // Generic single replacement char fixes for common Turkish words
  [/g\uFFFDr\uFFFDnt\uFFFDlenecek/g, 'görüntülenecek'],
  [/g\uFFFDr\uFFFDnecek/g, 'görünecek'],
  [/yay\uFFFDn/g, 'yayın'],
  [/yay\uFFFDnland\uFFFD\uFFFD\uFFFDnda/g, 'yayınlandığında'],
  [/i\uFFFDerik/g, 'içerik'],
  [/Hen\uFFFDz/g, 'Henüz'],
  [/A\uFFFD\uFFFDm/g, 'Ağım'],
  // Generic single replacement char → common Turkish chars
];

let totalFixed = 0;

function walkAndFix(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      walkAndFix(fullPath);
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      for (const [pattern, replacement] of fixes) {
        content = content.replace(pattern, replacement);
      }
      
      // Also fix remaining \uFFFD chars in known Turkish word patterns
      // ş → \uFFFD after s, ğ → \uFFFD after g, etc.
      // These are harder to fix generically, so we do common words
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        const count = (original.match(/\uFFFD/g) || []).length - (content.match(/\uFFFD/g) || []).length;
        console.log(`Fixed: ${path.relative('.', fullPath)} (${count} chars fixed)`);
        totalFixed++;
      }
    }
  }
}

walkAndFix(path.join(__dirname, 'src'));
console.log(`\nTotal files fixed: ${totalFixed}`);

// Report remaining files with replacement chars
let remaining = 0;
function checkRemaining(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
      checkRemaining(fullPath);
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.match(/\uFFFD/g);
      if (matches) {
        remaining++;
        // Show context around each replacement char
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].includes('\uFFFD')) {
            console.log(`  REMAINING: ${path.relative('.', fullPath)}:${i+1}: ${lines[i].trim().substring(0, 120)}`);
          }
        }
      }
    }
  }
}

console.log('\nChecking for remaining broken characters...');
checkRemaining(path.join(__dirname, 'src'));
console.log(`Files still with broken chars: ${remaining}`);
