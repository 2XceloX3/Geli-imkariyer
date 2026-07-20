const fs = require('fs');
const path = require('path');

const eventsData = [
  {
    "title": "İstanbul Gelişim Üniversitesi Öğrencilerine LinkedIn Eğitimi",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından öğrencilerimize yönelik LinkedIn Eğitimi düzenlendi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/resim1_5d42af931ec34b13bb9dd1ed4b14328f.jpg"
    ]
  },
  {
    "title": "İstanbul Gelişim Üniversitesi Öğrencilerine CV Hazırlama Eğitimi",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından öğrencilerimize yönelik CV Hazırlama Eğitimi gerçekleştirildi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/ngf_e13aae3e955d48f592ae5515e9f897d0.jpg"
    ]
  },
  {
    "title": "İŞKUR Tarafından Mülakat Teknikleri Eğitimi",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi iş birliğiyle, İŞKUR tarafından öğrencilerimize yönelik “Mülakat Teknikleri Eğitimi” düzenlendi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/bdf_d31b508601924d5eb9b3137e4bc6bf41.jpg"
    ]
  },
  {
    "title": "Sağlıkta Kariyer Fuarı",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından düzenlenen Sağlıkta Kariyer Fuarı, öğrencilerimizin yoğun katılımıyla gerçekleştirildi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/bfd_771029180d1b4337b418b2f88b1173c7.jpg"
    ]
  },
  {
    "title": "SYL Sigorta ile Sigorta Sektörü Üzerine Etkinlik",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından, Banka ve Sigortacılık Bölümü öğrencilerine yönelik SYL Sigorta iş birliğiyle bir etkinlik gerçekleştirildi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/cv_5727b98cad934249915b2f6a10f35b19.jpg"
    ]
  },
  {
    "title": "Esteworld Semineri",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından, Esteworld iş birliğiyle sağlık öğrencilerimize yönelik bir seminer düzenlendi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/dfv_8b47edce55f54ec89a92d6652a5102ba.jpg"
    ]
  },
  {
    "title": "İstanbul Gelişim Üniversitesi Kariyer Fuarı Gerçekleşti",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından düzenlenen Kariyer Fuarı, öğrencilerimiz ile sektör temsilcilerini bir araya getirdi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/g-h_c608d2d402f645cebd41ffa2f229ac23.jpg"
    ]
  },
  {
    "title": "Örtem Firması Öğrencilerimizle Buluştu",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından düzenlenen etkinlikte, Örtem firması yetkilileri öğrencilerimizle bir araya geldi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/bfd_781a97d0d36c44a5a57e3d1c69ed5b6b.jpg"
    ]
  },
  {
    "title": "NTG Lojistik ile Öğrencilerimize Ders Müfredatını Destekleyen Etkinlik",
    "description": "İstanbul Gelişim Üniversitesi Kariyer Gelişim Merkezi tarafından düzenlenen etkinlik kapsamında, NTG Lojistik yetkilileri öğrencilerimizle bir araya geldi.",
    "date": "Yakın Zaman",
    "location": "İGÜ Kampüs",
    "images": [
      "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/sdv_32228242ef544387b7d8b30188efe789.jpg"
    ]
  }
];

const mappedEvents = eventsData.map((item, index) => {
    return `  {
    id: "EVT-00${index + 1}",
    title: ${JSON.stringify(item.title)},
    description: ${JSON.stringify(item.description)},
    date: ${JSON.stringify(item.date)},
    time: "Belli Değil",
    location: ${JSON.stringify(item.location)},
    imageUrl: ${JSON.stringify(item.images[0])},
    status: "Aktif"
  }`;
});

const arrayString = `export const initialEvents = [\n${mappedEvents.join(',\n')}\n];`;

// Inject into mockData.js
const mockFilePath = path.join(__dirname, 'src', 'utils', 'mockData.js');
let mockContent = fs.readFileSync(mockFilePath, 'utf8');

const startIndex = mockContent.indexOf('export const initialEvents = [');
const endIndex = mockContent.indexOf('// =====================================================', startIndex + 10);

if (startIndex !== -1 && endIndex !== -1) {
    mockContent = mockContent.substring(0, startIndex) + arrayString + '\n\n' + mockContent.substring(endIndex);
    fs.writeFileSync(mockFilePath, mockContent, 'utf8');
    console.log("Successfully updated mockData.js with real events!");
} else {
    console.log("Error: Could not find initialEvents block in mockData.js");
}
