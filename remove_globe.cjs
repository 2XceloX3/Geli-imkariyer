const fs = require('fs');
const path = require('path');

const componentsDir = 'src/components';
const files = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('Feed.jsx') || f === 'AdminDashboard.jsx')
  .map(f => path.join(componentsDir, f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the Birlik Ağı button from bottom nav
  const regex = /\{\/\*\s*BİRLİK AĞI\s*\*\/\}\s*<button.*?birlik_agi.*?>[\s\S]*?<\/button>/g;
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content);
    console.log('Removed Globe icon from', file);
  } else {
    // Try a more generic regex if the comment is different
    const fallbackRegex = /<button[^>]*setView\('birlik_agi'\)[^>]*>[\s\S]*?<Globe[^>]*>[\s\S]*?<\/button>/g;
    if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, '');
      fs.writeFileSync(file, content);
      console.log('Removed Globe icon (fallback) from', file);
    }
  }
});
