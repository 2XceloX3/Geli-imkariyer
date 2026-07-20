const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'components', 'LandingPage.jsx');
let content = fs.readFileSync(fp, 'utf8');

// Update Phone
content = content.replace(/444 9 123 \(Dahili: 1102\)/g, '0212 422 70 00');
content = content.replace(/tel:\+904449123/g, 'tel:+902124227000');

// Update Address
content = content.replace(/Zafer Mah\. Adile Naşit Bulvarı No:1 Gelişim \/ İstanbul/g, 'Cihangir Mah. Şehit Jandarma Komando Er Hakan Öner Sk.No:1 Avcılar / İSTANBUL');
content = content.replace(/https:\/\/maps\.app\.goo\.gl\/gelisim/g, 'https://maps.app.goo.gl/9QZJ2jXvP');

// Update Footer text (Misyon)
content = content.replace(
  /Öğrencilerimizin kariyer planlamalarına destek olmak ve iş dünyası ile aralarında güçlü köprüler kurmak amacıyla hizmet veriyoruz\. Geleceğinize giden yolda daima yanınızdayız\./g,
  'Öğrencilerimizi ve mezunlarımızı; kişisel farkındalığı yüksek, gelişmeleri yakından takip eden, kurumsal ve toplumsal gelişime katma değer yaratan bireyler olmaları yönünde desteklemektir.'
);

// Update Social Links
content = content.replace(/https:\/\/twitter\.com\/iguniversitesi/g, 'https://x.com/gelisimedu?lang=en');
content = content.replace(/https:\/\/www\.facebook\.com\/iguniversitesi/g, 'https://www.facebook.com/gelisimedu/?locale=tr_TR');
content = content.replace(/https:\/\/www\.instagram\.com\/iguniversitesi\//g, 'https://www.instagram.com/igukariyer/');
content = content.replace(/https:\/\/tr\.linkedin\.com\/school\/i%CC%87stanbulgelisim%C3%BCniversitesi\//g, 'https://www.linkedin.com/school/gelisimedu/mycompany/');

fs.writeFileSync(fp, content, 'utf8');
console.log("LandingPage footer and contacts updated!");
