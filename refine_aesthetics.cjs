const fs = require('fs');
const path = require('path');

const directoryPath = 'src/components';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      // 1. Remove childish bouncing animations, replace with pulse (except in specific cases like chat typing indicator where bounce is standard)
      if (content.includes('animate-bounce') && !filePath.includes('MessagingInterface.jsx')) {
        content = content.replace(/animate-bounce/g, 'animate-pulse');
        modified = true;
      }

      // 2. Tweak comment section in PostCard to look more like LinkedIn
      if (filePath.endsWith('PostCard.jsx')) {
        // Find comment render block and make it a clean gray box
        const commentBoxChildish = 'bg-gray-50 border border-gray-100 rounded-2xl p-4';
        const commentBoxProfessional = 'bg-[#F2F2F2] rounded-tr-xl rounded-br-xl rounded-bl-xl p-3 shadow-sm';
        if (content.includes(commentBoxChildish)) {
          content = content.replace(new RegExp(commentBoxChildish, 'g'), commentBoxProfessional);
          modified = true;
        }
      }

      // 3. Remove excess whitespace in buttons globally (tighten up)
      // Actually, standardizing buttons to be more rectangular.
      if (content.includes('rounded-full') && !filePath.includes('MessagingInterface.jsx') && !filePath.includes('TopProfileMenu.jsx') && !content.includes('avatar') && !content.includes('Logo')) {
        // Wait, rounded-full is often used for icons. Let's not blindly replace rounded-full.
      }
      
      // 4. Ensure we don't have text-4xl or massive headings unless necessary
      // Replace text-4xl with text-2xl or text-3xl for a more dense, professional look
      if (content.includes('text-4xl') || content.includes('text-5xl')) {
        content = content.replace(/text-5xl/g, 'text-3xl');
        content = content.replace(/text-4xl/g, 'text-2xl');
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log('Refined professional aesthetics in:', filePath);
      }
    }
  });
}

processDirectory(directoryPath);
