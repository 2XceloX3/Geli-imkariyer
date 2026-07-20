const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'components', 'LandingPage.jsx');
let content = fs.readFileSync(fp, 'utf8');

// Find the start and end of the footer
const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>') + 9;

if (footerStart !== -1 && footerEnd !== -1) {
  let footerContent = content.substring(footerStart, footerEnd);

  // Replace background gradient from red to navy blue
  footerContent = footerContent.replace(
    'bg-gradient-to-br from-[#bc1d2a] via-[#dc2626] to-[#ff4d4d]',
    'bg-gradient-to-br from-[#0A2342] via-[#0E3360] to-[#16498A]'
  );

  // Replace text-red-* with text-blue-* or text-slate-*
  footerContent = footerContent.replace(/text-red-50/g, 'text-blue-50');
  footerContent = footerContent.replace(/text-red-100/g, 'text-blue-100');
  footerContent = footerContent.replace(/text-red-200/g, 'text-blue-200');
  footerContent = footerContent.replace(/placeholder-red-200/g, 'placeholder-blue-200');
  footerContent = footerContent.replace(/bg-[#e60000]/g, 'bg-[#0A2342]');
  
  // Reconstruct file
  content = content.substring(0, footerStart) + footerContent + content.substring(footerEnd);
  fs.writeFileSync(fp, content, 'utf8');
  console.log("Footer theme successfully changed to Navy Blue.");
} else {
  console.log("Footer not found.");
}
