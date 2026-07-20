const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'MessagingInterface.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  // Line 196: Öğrenci
  [/�\x13�ÖğÖğÖğrenci/g, 'Öğrenci'],
  // Line 207: 📷 Fotoğraf, 🎬 Video
  [/\x1fx\x1c� Foto�xraf/g, '📷 Fotoğraf'],
  [/\x1fx�� Video/g, '🎬 Video'],
  // Line 360: erişimi sağlanamadı
  [/eri�ximi sa�xlanamadı/g, 'erişimi sağlanamadı'],
  // Line 389: başlatılamadı
  [/ba�xlatılamadı/g, 'başlatılamadı'],
  // Line 413: Fotoğraf çekilemedi (İşİş → various)
  [/Foto�xraf çekiİşİşlemedi/g, 'Fotoğraf çekilemedi'],
  // Line 420
  [/\x1fx\x1c� Foto�xrafınız ba�xarıyla Güncelİşİşlemeler \(Durum\) olarak payla�xıldı!/g, '📷 Fotoğrafınız başarıyla güncellendi!'],
  // Line 631-632
  [/Arama Ba�xlat/g, 'Arama Başlat'],
  [/ki�xilerle sesli veya görüntülü görü�xün/g, 'kişilerle sesli veya görüntülü görüşün'],
  // Line 638
  [/Geçmi�xi/g, 'Geçmişi'],
  // Line 679
  [/dahil oldu�xunuz ö�ÖğÖğÖğrenci/g, 'dahil olduğunuz öğrenci'],
  // Line 716
  [/toplulu�xa/g, 'topluluğa'],
  // Line 794
  [/�Sye/g, 'Üye'],
  // Line 797
  [/�!evrimiçi/g, 'Çevrimiçi'],
  // Line 811, 897, 1078, etc: İşlem Butonu
  [/İ�xİşİşlem Butonu/g, 'İşlem Butonu'],
  // Line 821
  [/Mesajla�xma ba�xlatıldı\. Güvenli �xekilde ileti�xim kurabilirsiniz\./g, 'Mesajlaşma başlatıldı. Güvenli şekilde iletişim kurabilirsiniz.'],
  // Line 867
  [/\x1fx\x1c� Foto/g, '📷 Foto'],
  // Line 875
  [/\x1fxa�/g, '🚫 Bu mesaj silindi'],
  // Line 993 - might have more
  // Line 1031
  [/\x1fx\x1c� Medya Mesajı/g, '📷 Medya Mesajı'],
  // Line 1110
  [/Konu�xma Ba�xlat/g, 'Konuşma Başlat'],
  // Line 1158
  [/Foto�xraf için dokun, Video için basılı tut/g, 'Fotoğraf için dokun, Video için basılı tut'],
  // Line 1283
  [/Ki�xileri Seçin/g, 'Kişileri Seçin'],
  // Line 1322
  [/Ki�xileriniz/g, 'Kişileriniz'],
  // Generic remaining patterns
  [/�x/g, 'ş'],
  [/ö�ÖğÖğÖğ/g, 'öğ'],
  [/�ÖğÖğÖğ/g, 'Öğ'],
  [/İşİş/g, ''],
];

let original = content;
for (const [pattern, replacement] of replacements) {
  content = content.replace(pattern, replacement);
}

// Clean up any remaining control characters that shouldn't be there
content = content.replace(/\x1f/g, '');
content = content.replace(/\x13/g, '');

fs.writeFileSync(filePath, content, 'utf8');

const remainingCount = (content.match(/\uFFFD/g) || []).length;
console.log(`MessagingInterface.jsx fixed!`);
console.log(`Remaining replacement chars: ${remainingCount}`);

if (remainingCount > 0) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('\uFFFD')) {
      console.log(`  Line ${i+1}: ${lines[i].trim().substring(0, 150)}`);
    }
  }
}
