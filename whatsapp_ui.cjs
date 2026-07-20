const fs = require('fs');

const file = 'src/components/MessagingInterface.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the chat area background with WhatsApp doodle color (#efeae2)
  // The current background might be bg-gray-50 or bg-white. 
  // Let's replace the common background class for the main chat area
  content = content.replace(/className="flex-1 bg-gray-50 overflow-y-auto p-4 sm:p-6 space-y-4/g, 'className="flex-1 bg-[#efeae2] overflow-y-auto p-4 sm:p-6 space-y-4');
  content = content.replace(/className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4/g, 'className="flex-1 bg-[#efeae2] overflow-y-auto p-4 sm:p-6 space-y-4');

  // Replace sent message bubbles with WhatsApp green (#dcf8c6)
  // Let's find: bg-emerald-600 text-white or bg-[#0A2342] text-white or similar
  content = content.replace(/bg-teal-600 text-white/g, 'bg-[#dcf8c6] text-gray-900 border border-transparent shadow-sm');
  content = content.replace(/bg-blue-600 text-white/g, 'bg-[#dcf8c6] text-gray-900 border border-transparent shadow-sm');
  content = content.replace(/bg-emerald-600 text-white/g, 'bg-[#dcf8c6] text-gray-900 border border-transparent shadow-sm');
  content = content.replace(/bg-indigo-600 text-white/g, 'bg-[#dcf8c6] text-gray-900 border border-transparent shadow-sm');
  
  // Also fix the text colors inside sent messages (they shouldn't be white if bg is light green)
  content = content.replace(/text-teal-100/g, 'text-gray-500');
  content = content.replace(/text-blue-100/g, 'text-gray-500');
  content = content.replace(/text-white\/70/g, 'text-gray-500');
  content = content.replace(/text-white\/80/g, 'text-gray-500');
  content = content.replace(/text-white\/90/g, 'text-gray-600');
  
  // Remove rounded-3xl from messaging (make them tight like whatsapp: rounded-xl)
  content = content.replace(/rounded-3xl/g, 'rounded-xl');
  content = content.replace(/rounded-\[2rem\]/g, 'rounded-xl');
  
  // Sent message shape: rounded-l-2xl rounded-br-sm rounded-tr-2xl -> more whatsapp like
  content = content.replace(/rounded-l-2xl rounded-br-sm rounded-tr-2xl/g, 'rounded-xl rounded-tr-none');
  content = content.replace(/rounded-l-2xl rounded-tr-2xl rounded-br-sm/g, 'rounded-xl rounded-tr-none');

  // Received message shape
  content = content.replace(/rounded-r-2xl rounded-bl-sm rounded-tl-2xl/g, 'rounded-xl rounded-tl-none shadow-sm border border-gray-100');
  content = content.replace(/rounded-r-2xl rounded-tl-2xl rounded-bl-sm/g, 'rounded-xl rounded-tl-none shadow-sm border border-gray-100');

  fs.writeFileSync(file, content);
  console.log('Upgraded MessagingInterface.jsx to flawless WhatsApp aesthetic');
}
