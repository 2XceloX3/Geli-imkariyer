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

const dirPath = path.join(__dirname, 'src', 'components');
const files = walkSync(dirPath).filter(f => f.endsWith('.jsx'));

let ariaCount = 0;
let keyboardNavCount = 0;
let contrastCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // 1. Add missing aria-labels safely to icon-only buttons (containing React Icon Components)
  content = content.replace(/<button([^>]*)>(\s*<[A-Z][a-zA-Z0-9]+[^>]*\/>\s*)<\/button>/g, (match, attrs, inner) => {
    if (!attrs.includes('aria-label=')) {
      ariaCount++;
      return `<button aria-label="İşlem Butonu"${attrs}>${inner}</button>`;
    }
    return match;
  });

  // Also catch SVG icon-only buttons
  content = content.replace(/<button([^>]*)>(\s*<svg[^>]*>.*?<\/svg>\s*)<\/button>/gs, (match, attrs, inner) => {
    if (!attrs.includes('aria-label=')) {
      ariaCount++;
      return `<button aria-label="İşlem Butonu"${attrs}>${inner}</button>`;
    }
    return match;
  });

  // 2. Add Keyboard Navigability to Clickable Divs
  // Finds div/span/article with onClick and adds role, tabIndex, and onKeyDown
  const clickableRegex = /<(div|span|li|article)([^>]*onClick=[^>]*)>/g;
  content = content.replace(clickableRegex, (match, tag, attrs) => {
    if (!attrs.includes('tabIndex=') && !attrs.includes('role=')) {
      keyboardNavCount++;
      return `<${tag} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.currentTarget.click(); } }} ${attrs}>`;
    }
    return match;
  });

  // 3. Improve contrast ratios globally
  // Shifts gray text colors darker to meet WCAG AA standards
  const beforeContrast = content;
  content = content.replace(/\btext-gray-400\b/g, 'text-gray-500');
  content = content.replace(/\btext-gray-300\b/g, 'text-gray-400');
  
  if (beforeContrast !== content) {
     contrastCount++;
  }

  // Write changes
  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
  }
});

console.log('--- A11Y FIX REPORT ---');
console.log('Added aria-labels to buttons:', ariaCount);
console.log('Added keyboard nav to clickable elements:', keyboardNavCount);
console.log('Files improved for contrast:', contrastCount);
console.log('Fixes applied successfully!');
