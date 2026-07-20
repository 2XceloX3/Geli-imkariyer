const fs = require('fs');

const content = fs.readFileSync('src/components/MessagingInterface.jsx', 'utf8');
const lines = content.split('\n');

lines.forEach((line, i) => {
  if (line.includes('msg.content') || line.includes('isMe ?')) {
    console.log(i + 1, line.trim());
  }
});
