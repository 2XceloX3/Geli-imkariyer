const fs = require('fs');
const glob = require('glob'); // Not available, using readdirSync

const files = fs.readdirSync('src/components').filter(f => f.endsWith('.jsx')).map(f => 'src/components/' + f);
files.push('src/App.jsx');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('<TopProfileMenu')) {
    console.log('Found in', file);
  }
});
