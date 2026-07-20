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
      
      // Replace bubbly radius with professional radius
      if (content.includes('rounded-3xl')) {
        content = content.replace(/rounded-3xl/g, 'rounded-xl');
        modified = true;
      }
      if (content.includes('rounded-[2rem]')) {
        content = content.replace(/rounded-\[2rem\]/g, 'rounded-xl');
        modified = true;
      }
      if (content.includes('rounded-[3rem]')) {
        content = content.replace(/rounded-\[3rem\]/g, 'rounded-2xl');
        modified = true;
      }
      
      // Standardize overly bright gradients to professional/academic ones if present.
      // E.g. we might leave specific gradients alone if they are used correctly (like Instagram ring),
      // but let's replace `from-yellow-400 to-orange-500` maybe? 
      // Actually, colors are mostly okay if we fix the border radius. Border radius does 90% of the childish look.
      
      if (modified) {
        fs.writeFileSync(filePath, content);
        console.log('Normalized border radius in:', filePath);
      }
    }
  });
}

processDirectory(directoryPath);
