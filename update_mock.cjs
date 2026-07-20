const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'src', 'utils', 'mockData.js');
let content = fs.readFileSync(fp, 'utf8');

const newsArrayStr = `export const initialNews = [
  {
    id: "NEWS-001",
    title: "İGÜ Kariyer Merkezi’nden İBB Deniz Hizmetleri Şube Müdürlüğü’ne Ziyaret",
    description: "Kariyer merkezimizin sektör ziyaretleri kapsamında İBB Deniz Hizmetleri Şube Müdürlüğü ile görüşmeler gerçekleştirildi.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/123e5d87cd934f49ad587f7f4bb01f5a_(768_432).jpg",
    status: "Aktif",
    date: "03.12.2025"
  },
  {
    id: "NEWS-002",
    title: "İGÜ Kariyer Yönlendirme Uygulama ve Araştırma Merkezi ile Karlife Sağlık Danışmanlığı Arasında İş Birliği Protokolü",
    description: "Öğrencilerimizin staj ve iş imkanlarını geliştirmek amacıyla Karlife Sağlık Danışmanlığı ile iş birliği protokolü imzalandı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/c5e98c9906414da897751aef53f7cdea_(768_432).jpg",
    status: "Aktif",
    date: "20.11.2025"
  },
  {
    id: "NEWS-003",
    title: "İGÜ Kariyer Merkezi’nden TRC Marine Electronics’e Kurumsal Ziyaret",
    description: "TRC Marine Electronics firmasıyla öğrenci projeleri ve iş imkanları değerlendirildi.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/49c1be8495d7408090bc9340ddd5a707_(768_432).jpg",
    status: "Aktif",
    date: "20.11.2025"
  },
  {
    id: "NEWS-004",
    title: "İŞKUR Destekli “Etkili CV Hazırlama ve Mülakat Simülasyonu” Eğitimi Gerçekleştirildi",
    description: "Öğrencilerimiz İŞKUR uzmanlarından profesyonel CV hazırlama ve mülakat teknikleri eğitimi aldı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/004d66b841a74e7c90705daaf7a332fd_(768_432).jpg",
    status: "Aktif",
    date: "05.11.2025"
  },
  {
    id: "NEWS-005",
    title: "MoodLab Style Firmasına Ziyaret Gerçekleştirildi",
    description: "Öğrencilerimizin sektördeki fırsatları için MoodLab Style yetkilileri ile toplantı yapıldı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/81ef9405e47647a19acf4f065f602379_(768_432).jpg",
    status: "Aktif",
    date: "31.10.2025"
  },
  {
    id: "NEWS-006",
    title: "KariyerFest’26 Festival Coşkusuyla Gerçekleştirildi",
    description: "Her yıl düzenlenen KariyerFest bu yıl da öğrencilerin yoğun katılımıyla coşkuyla tamamlandı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/22e312c3e67646ccb6aec889e6a800db_(768_432).jpg",
    status: "Aktif",
    date: "03.04.2026"
  },
  {
    id: "NEWS-007",
    title: "LinkedIn’de Kişisel Marka ve Networking Stratejileri Eğitimi Gerçekleştirildi",
    description: "Profesyonel ağ oluşturma becerilerini geliştirmek amacıyla özel bir eğitim düzenlendi.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/5f7639fdde4a4dcf9ea9ffea4b94cf1a_(768_432).jpg",
    status: "Aktif",
    date: "16.03.2026"
  },
  {
    id: "NEWS-008",
    title: "Karınca Lojistik ile Lojistik Sektörüne Bakış Etkinliği Gerçekleştirildi",
    description: "Lojistik sektörünün önde gelen temsilcileri öğrencilerimizle buluştu.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/62fc2009727742848b1f9a10bdab64a7_(768_432).jpg",
    status: "Aktif",
    date: "16.03.2026"
  },
  {
    id: "NEWS-009",
    title: "İGÜ Kariyer Merkezi’nde Dijital Odaklı Üniversite–Sektör İş Birliği Ziyareti",
    description: "Teknoloji firmalarıyla üniversite-sanayi iş birliği güçlendirilmeye devam ediyor.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/0860c6d437f4406396a88380637658da_(768_432).jpg",
    status: "Aktif",
    date: "17.02.2026"
  },
  {
    id: "NEWS-010",
    title: "Kariyer Merkezi ve Doğuş Oto İş Birliğiyle “Otomotiv Sektöründe Kariyer Yolculuğu: Doğuş Oto Deneyimi” Semineri Gerçekleştirildi",
    description: "Otomotiv sektöründe kariyer planlayan öğrencilerimiz Doğuş Oto yetkilileri ile buluştu.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/e28b2c223688466ab769769a8d12ca9f_(768_432).jpg",
    status: "Aktif",
    date: "25.12.2025"
  }
];`;

const startIndex = content.indexOf('export const initialNews = [');
const endIndex = content.indexOf('// =====================================================', startIndex + 10);

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newsArrayStr + '\n\n' + content.substring(endIndex);
  fs.writeFileSync(fp, content, 'utf8');
  console.log("mockData.js updated successfully.");
} else {
  console.log("Could not find block boundaries in mockData.js");
}
