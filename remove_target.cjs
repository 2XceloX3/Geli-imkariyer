const fs = require('fs');
const path = require('path');

const componentsDir = 'src/components';
const files = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('Feed.jsx') || f === 'AdminDashboard.jsx')
  .map(f => path.join(componentsDir, f));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove the TeamUp & Mentor button from bottom nav
  const regex = /\{\/\*\s*TEAM & MENTOR\s*\*\/\}\s*<button.*?team_mentor.*?>[\s\S]*?<\/button>/g;
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(file, content);
    console.log('Removed Target icon from', file);
  } else {
    const fallbackRegex = /<button[^>]*setActiveTab\('team_mentor'\)[^>]*>[\s\S]*?<Target[^>]*>[\s\S]*?<\/button>/g;
    if (fallbackRegex.test(content)) {
      content = content.replace(fallbackRegex, '');
      fs.writeFileSync(file, content);
      console.log('Removed Target icon (fallback) from', file);
    }
  }
});
