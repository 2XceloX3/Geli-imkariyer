const fs = require('fs');
const path = require('path');

const validImages = [
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/805b38f79e3f400da6b3a502cdb1f2d0_dab10b61aece470aaa6ed19b0576c3dd.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/47faaa5f4ff84979af577b438fc229c1_8912d81b728f4d918e993e5b790b48ab.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/1ac055e2310844e384e7bf9e7abe3d34_cc2ffd98bf444ceb81181e048a18b0dd.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/38300c615d084e76ad1c599d7348ed91_b7be633ea1964047a18f2d9c5249839c.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/fbbb6373704b482eb73b8956301a06f6_cae86cbcd5a54dd985e6e8ec2b899645.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/be71ba02764646fc8f14a9bb97c5b9a8_(375_300).jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/519cc07174684619b555d5bb4eecac4f_b54816bd1b5941a595a60eb469b5b4c7.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/2bc4c0e60e3b47caa79942047cfbfa2c_(375_300).jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/hitm/e7a58ae4556c4fc7b8e8ece79e7dab4e_c55aa2c1fdb748f88ed58923c177ad35.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/8722de546e4b4b5094898382e568ac94_e5a6d2495aab41beacc7391bf5d903ae.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/62874c3cf50e414a8630cf9be5f17172_aa25bf7819ce46e4b5208f35658a624f.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/98a001cf03524bf49bd45bd3e4810c71_295b798c355c46abb92d8d4e0b02683a.jpg",
  "https://panel.gelisim.edu.tr/assets/2025/resimler/hitdb/cd8eee1b7fa146fd8e952b0c7d012305_fcf735c1ca7f470c8fe6bd98923cf369.jpg",
  "https://panel.gelisim.edu.tr/assets/2025/resimler/hitdb/ae12081c459a4b449837540bf15f0ead_b594d3cc30e546d4aeef407e1e23689f.jpg",
  "https://panel.gelisim.edu.tr/assets/2025/resimler/hitdb/4bbc1facc9e44fcdb6b9826232f87bd6_f9dcbf737dd84d7daec6c630922addfe.jpg",
  "https://panel.gelisim.edu.tr/assets/2025/resimler/hitdb/ed2d7b639dff43d6a5bbc017114e617d_c846ec39eaa948698ec35b83bca6e7f8.jpg",
  "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/052e3e6bcd6d4c418e302fe9cd19e554_1e7ff969fc204f649fd2bf9978424080.jpg",
  "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/e9f5a6bec7f14fed87904caea4bfad2b_b85247df85cc4171b01853d9719f4829.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/e1a446939c3849c89ab73171c761397e_6a5c70c2a2004820a5e928e0bd10c675.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/e7994ca99aa64b529d5813b9da79df14_f0bda55be87d42ac9be480584e59c324.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/teknojik-gelisim-tto_afb70e30c0894183839bac7794974da0.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/akademik-gelisim-1_540b8ad9e4064ac698f8e8bdeff0dc48.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/sanatsal-gelisim-1_acec1a328ee44310ae17ec8896f9cc7c.jpg",
  "https://panel.gelisim.edu.tr/assets/2026/resimler/kurumsaliletisim/sportif-gelisim-1_434d4377a753422693d7b99636405c3d.jpg"
];

const filesToFix = [
  'src/components/LandingPage.jsx',
  'src/components/Login.jsx',
  'src/components/NewsEvents.jsx',
  'src/components/OrganizationChart.jsx',
  'src/components/Register.jsx',
  'src/components/SemPanel.jsx',
  'src/components/StajPanel.jsx',
  'src/components/UserProfile.jsx',
  'src/store/useAppStore.js',
  'src/utils/mockData.js'
];

let imgIndex = 0;

function getNextImage() {
  const img = validImages[imgIndex];
  imgIndex = (imgIndex + 1) % validImages.length;
  return img;
}

filesToFix.forEach(relPath => {
  const fp = path.join(__dirname, relPath);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Replace all hallucinated images starting with https://www.gelisim.edu.tr/uploads
  content = content.replace(/https:\/\/www\.gelisim\.edu\.tr\/uploads\/[^"'\s\)]+/g, (match) => {
    return getNextImage();
  });

  if (content !== original) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('Fixed broken images in:', relPath);
  }
});

console.log('Broken images replaced with valid URLs from aday.gelisim.edu.tr!');
