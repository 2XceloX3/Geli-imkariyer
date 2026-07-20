const fs = require('fs');

const panels = [
  'src/components/VirtualCareerFair.jsx',
  'src/components/CareerRoadmap.jsx',
  'src/components/StartupIncubator.jsx'
];

panels.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace bubbly radius
    content = content.replace(/rounded-3xl/g, 'rounded-xl');
    content = content.replace(/rounded-\[3rem\]/g, 'rounded-2xl');
    
    // De-neon the gradients (replace pink/fuchsia/purple with blue/slate/emerald)
    content = content.replace(/from-pink-500/g, 'from-blue-700');
    content = content.replace(/to-rose-500/g, 'to-blue-900');
    content = content.replace(/from-purple-600/g, 'from-[#0A2342]');
    content = content.replace(/to-pink-600/g, 'to-blue-900');
    content = content.replace(/from-fuchsia-600/g, 'from-slate-800');
    content = content.replace(/to-purple-600/g, 'to-slate-900');
    content = content.replace(/from-orange-500/g, 'from-amber-600');
    content = content.replace(/to-red-500/g, 'to-amber-700');
    
    // Remove extreme shadows
    content = content.replace(/shadow-\[0_0_.*\]/g, 'shadow-sm');

    fs.writeFileSync(file, content);
    console.log('Professionalized:', file);
  }
});
