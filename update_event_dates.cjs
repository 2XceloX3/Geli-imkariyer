const fs = require('fs');
const path = require('path');

const mockFilePath = path.join(__dirname, 'src', 'utils', 'mockData.js');
let mockContent = fs.readFileSync(mockFilePath, 'utf8');

// Replace "Yakın Zaman" with "Tarih Belirtilmemiş" and "Belli Değil" with "Konum Belirtilmemiş"
mockContent = mockContent.replace(/"Yakın Zaman"/g, '"Tarih Belirtilmemiş"');
mockContent = mockContent.replace(/"Belli Değil"/g, '"Konum Belirtilmemiş"');
mockContent = mockContent.replace(/"İGÜ Kampüs"/g, '"Konum Belirtilmemiş"');

fs.writeFileSync(mockFilePath, mockContent, 'utf8');
console.log("mockData.js updated to reflect exact empty date fields from official site.");
