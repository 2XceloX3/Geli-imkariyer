const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'utils', 'mockData.js');
let c = fs.readFileSync(file, 'utf8');

// Fix unescaped quotes in strings - replace inner double quotes with curly quotes
// These are specific known patterns from the scraped data
const fixes = [
  ['"Etkili CV Hazırlama ve Mülakat Simülasyonu"', '\u201CEtkili CV Hazırlama ve Mülakat Simülasyonu\u201D'],
  ['"Otomotiv Sektöründe Kariyer Yolculuğu: Doğuş Oto Deneyimi"', '\u201COtomotiv Sektöründe Kariyer Yolculuğu: Doğuş Oto Deneyimi\u201D'],
  ['"Mülakat Teknikleri Eğitimi"', '\u201CMülakat Teknikleri Eğitimi\u201D'],
  ['"Karınca Lojistik ile Lojistik Sektörüne Bakış: Lojistiğin Bugünü, Yarının Stratejileri"', '\u201CKarınca Lojistik ile Lojistik Sektörüne Bakış: Lojistiğin Bugünü, Yarının Stratejileri\u201D'],
  ['"Karınca Lojistik ile Lojistik Sektörüne Bakış"', '\u201CKarınca Lojistik ile Lojistik Sektörüne Bakış\u201D'],
];

let count = 0;
for (const [from, to] of fixes) {
  const before = c.length;
  c = c.split(from).join(to);
  if (c.length !== before) count++;
}

fs.writeFileSync(file, c, 'utf8');
console.log(`Fixed ${count} unescaped quote patterns in mockData.js`);
