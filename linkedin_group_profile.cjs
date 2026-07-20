const fs = require('fs');

const file = 'src/components/GroupProfile.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Remove Gen-Z/Playful elements
  const tiktokRegex = /\{\/\* Gen Z UX[\s\S]*?(?=<div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3)/;
  if (content.match(tiktokRegex)) {
    content = content.replace(tiktokRegex, '');
  }

  // 2. Make Banner and Avatar look like LinkedIn Company Page
  content = content.replace(/bg-white rounded-xl border border-gray-100 shadow-\[0_8px_30px_rgb\(0,0,0,0\.04\)\] overflow-hidden/g, 'bg-white rounded-lg border border-gray-200 overflow-hidden');
  
  // LinkedIn company pages have a square or slightly rounded logo, not a circle. 
  // Change rounded-full to rounded-md for the logo
  content = content.replace(/w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-lg absolute -top-12 sm:-top-16 left-6 sm:left-8/g, 'w-32 h-32 sm:w-[152px] sm:h-[152px] rounded-lg border-4 border-white bg-white shadow-sm absolute -top-16 sm:-top-24 left-6 sm:left-8');
  
  // Update padding for larger logo
  content = content.replace(/pt-14 sm:pt-4 sm:ml-40/g, 'pt-20 sm:pt-24');

  // Solid corporate banner instead of bright gradient
  content = content.replace(/bg-gradient-to-r from-purple-600 to-blue-600/g, 'bg-[#0A2342]');

  // Make Follow/Join buttons look like LinkedIn (Blue solid button, outline white button)
  content = content.replace(/bg-\[#0A2342\] border-gelisim-navy hover:bg-red-700/g, 'bg-[#0A66C2] hover:bg-[#004182] border-[#0A66C2]');
  content = content.replace(/bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl/g, 'bg-white border border-gray-500 hover:border-gray-700 text-gray-700 hover:bg-gray-100 rounded-full');
  content = content.replace(/rounded-xl font-bold text-sm transition shadow-sm border-2/g, 'rounded-full font-bold text-sm transition border');

  // Change all grid cards (About, Experience) to have a simpler white border box
  content = content.replace(/bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8/g, 'bg-white rounded-lg border border-gray-200 p-6 sm:p-8');

  fs.writeFileSync(file, content);
  console.log('Professionalized GroupProfile.jsx to match LinkedIn Company Page exactly');
}
