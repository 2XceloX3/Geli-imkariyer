const fs = require('fs');

let content = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

// Replace all neon drop-shadows
content = content.replace(/drop-shadow-\[0_0_[0-9]+px_rgba\([^)]+\)\]/g, 'shadow-sm');

// Replace bright pink/amber/purple with more serious tones like indigo, slate, teal
// Actually, let's just make the active categories look like a clean bottom border or solid bg instead of glowing text.
// We'll replace the glow logic in AdminDashboard
content = content.replace(/case 'genel': return 'text-blue-600 shadow-sm';/g, "case 'genel': return 'text-[#0A2342]';");
content = content.replace(/case 'kullanici': return 'text-purple-600 shadow-sm';/g, "case 'kullanici': return 'text-[#0A2342]';");
content = content.replace(/case 'icerik': return 'text-emerald-600 shadow-sm';/g, "case 'icerik': return 'text-[#0A2342]';");
content = content.replace(/case 'sistem': return 'text-amber-600 shadow-sm';/g, "case 'sistem': return 'text-[#0A2342]';");
content = content.replace(/case 'birlik': return 'text-pink-600 shadow-sm';/g, "case 'birlik': return 'text-[#0A2342]';");

// Clean up the active category button backgrounds to be professional (slate instead of pink/red)
content = content.replace(/bg-pink-50 text-pink-700 border border-pink-200/g, 'bg-slate-100 text-slate-800 border border-slate-300');
content = content.replace(/bg-amber-50 text-amber-700 border border-amber-200/g, 'bg-slate-100 text-slate-800 border border-slate-300');
content = content.replace(/bg-purple-50 text-purple-700 border border-purple-200/g, 'bg-slate-100 text-slate-800 border border-slate-300');
content = content.replace(/bg-emerald-50 text-emerald-700 border border-emerald-200/g, 'bg-slate-100 text-slate-800 border border-slate-300');
content = content.replace(/bg-blue-50 text-blue-700 border border-blue-200/g, 'bg-slate-100 text-slate-800 border border-slate-300');
content = content.replace(/bg-red-50 text-red-700 border border-red-200/g, 'bg-slate-100 text-slate-800 border border-slate-300');

// Clean up the tab themes to use #0A2342 (Navy) for active states instead of varied bright colors
const themeRegex = /const theme = \{[\s\S]*?\} ||/g;
// Actually just replace the specific color assignments for themes
content = content.replace(/bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-300/g, 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm');
content = content.replace(/bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-300/g, 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm');
content = content.replace(/bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-300/g, 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm');
content = content.replace(/bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-300/g, 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm');
content = content.replace(/bg-red-600 text-white border-red-600 shadow-md shadow-red-300/g, 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm');
content = content.replace(/bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-300/g, 'bg-[#0A2342] text-white border-[#0A2342] shadow-sm');

fs.writeFileSync('src/components/AdminDashboard.jsx', content);
console.log('Cleaned up neon colors and drop shadows in AdminDashboard');
