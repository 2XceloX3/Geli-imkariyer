import { IGU_FACULTIES, IGU_MYO, IGU_YUKSEKOKUL, IGU_ENSTITU } from './universityData';

export const generateStudents = () => {
  return [
    { id: 'STU-001', studentId: '20240001', name: 'Alperen Yılmaz', department: 'Yazılım Mühendisliği', year: 3, gpa: 3.4, email: 'alperen@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Alperen+Yılmaz&background=0A2342&color=fff', pronouns: 'o/onun', internshipStatus: 'Arıyor' },
    { id: 'STU-002', studentId: '20240002', name: 'Zeynep Kaya', department: 'Bilgisayar Mühendisliği', year: 4, gpa: 3.8, email: 'zeynep@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=0A2342&color=fff', doubleMajor: 'Endüstri Mühendisliği', internshipStatus: 'Tamamlandı' },
    { id: 'STU-003', studentId: '20240003', name: 'Mert Can', department: 'İşletme', year: 2, gpa: 2.9, email: 'mert@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Mert+Can&background=0A2342&color=fff', internshipStatus: 'İlgilenmiyor' },
    { id: 'STU-004', studentId: '20240004', name: 'Elif Demir', department: 'Mimarlık', year: 3, gpa: 3.1, email: 'elif@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Elif+Demir&background=0A2342&color=fff', internshipStatus: 'Aktif Stajyer' },
    { id: 'STU-005', studentId: '20240005', name: 'Burak Şahin', department: 'Makine Mühendisliği', year: 4, gpa: 3.6, email: 'burak@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Burak+Şahin&background=0A2342&color=fff', internshipStatus: 'Arıyor' }
  ];
};

export const generateAlumni = () => {
  return [
    { id: 'ALU-001', studentId: '20190001', name: 'Caner Öztürk', department: 'Yazılım Mühendisliği', gradYear: 2023, email: 'caner@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Caner+Öztürk&background=EA580C&color=fff', company: 'Trendyol', title: 'Frontend Developer' },
    { id: 'ALU-002', studentId: '20180002', name: 'Seda Çelik', department: 'Endüstri Mühendisliği', gradYear: 2022, email: 'seda@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Seda+Çelik&background=EA580C&color=fff', company: 'Ford Otosan', title: 'Üretim Planlama Uzmanı' },
    { id: 'ALU-003', studentId: '20200003', name: 'Tolgahan Aslan', department: 'Uluslararası Ticaret', gradYear: 2024, email: 'tolga@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Tolgahan+Aslan&background=EA580C&color=fff', company: 'Getir', title: 'Operasyon Uzmanı' },
    { id: 'ALU-004', studentId: '20170004', name: 'Ayça Yurt', department: 'Psikoloji', gradYear: 2021, email: 'ayca@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Ayça+Yurt&background=EA580C&color=fff', company: 'Kendi Kliniği', title: 'Klinik Psikolog' }
  ];
};

export const generateCompanies = () => {
  return [
    { id: 'CMP-001', username: 'trendyol', name: 'Trendyol', sector: 'E-Ticaret', email: 'ik@trendyol.com', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Trendyol&background=F97316&color=fff', website: 'https://trendyol.com', location: 'İstanbul, TR' },
    { id: 'CMP-002', username: 'getir', name: 'Getir', sector: 'Hızlı Teslimat', email: 'ik@getir.com', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Getir&background=5B21B6&color=fff', website: 'https://getir.com', location: 'İstanbul, TR' },
    { id: 'CMP-003', username: 'aselsan', name: 'Aselsan', sector: 'Savunma Sanayii', email: 'ik@aselsan.com.tr', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Aselsan&background=0A2342&color=fff', website: 'https://aselsan.com.tr', location: 'Ankara, TR' },
    { id: 'CMP-004', username: 'ford', name: 'Ford Otosan', sector: 'Otomotiv', email: 'ik@ford.com.tr', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Ford+Otosan&background=0284C7&color=fff', website: 'https://ford.com.tr', location: 'Kocaeli, TR' }
  ];
};

// =====================================================
// Haberler — kariyer.gelisim.edu.tr'den birebir çekildi
// =====================================================
export const generateAcademicStaff = () => {
  return [
    { id: 'ACAD-001', name: 'Prof. Dr. Ahmet Yılmaz', email: 'ayilmaz@gelisim.edu.tr', department: 'Bilgisayar Mühendisliği', password: 'password', role: 'academic', avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=0EA5E9&color=fff', title: 'Dekan' },
    { id: 'ACAD-002', name: 'Doç. Dr. Zeynep Çelik', email: 'zcelik@gelisim.edu.tr', department: 'Yazılım Mühendisliği', password: 'password', role: 'academic', avatar: 'https://ui-avatars.com/api/?name=Zeynep+Çelik&background=0EA5E9&color=fff', title: 'Bölüm Başkanı' },
    { id: 'ACAD-003', name: 'Dr. Öğr. Üyesi Can Kaya', email: 'ckaya@gelisim.edu.tr', department: 'İşletme', password: 'password', role: 'academic', avatar: 'https://ui-avatars.com/api/?name=Can+Kaya&background=0EA5E9&color=fff', title: 'Kariyer Danışmanı' }
  ];
};

export const initialNews = [
  {
    id: "NEWS-001",
    title: "İGÜ Kariyer Merkezi'nden İBB Deniz Hizmetleri Şube Müdürlüğü'ne Ziyaret",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi Müdürü Dr. Öğr. Üyesi Mustafa Özan, İstanbul Büyükşehir Belediyesi Deniz Hizmetleri Şube Müdürü İlker Aslan'ı ziyaret ederek İstanbul deniz alanlarında yürütülebilecek ortak projeler üzerine görüş alışverişinde bulundu.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/123e5d87cd934f49ad587f7f4bb01f5a_(768_432).jpg",
    status: "Aktif",
    date: "03 Aralık 2025 Çarşamba"
  },
  {
    id: "NEWS-002",
    title: "İGÜ Kariyer Geliştirme Merkezi ile Karlife Sağlık Danışmanlığı Arasında İş Birliği Protokolü",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi, Karlife Sağlık Danışmanlığı ile öğrencilerin kariyer gelişimini desteklemeye yönelik bir iş birliği gerçekleştirmiştir. İş birliği; kariyer rehberliği, staj, eğitim ve istihdam alanlarında ortak çalışmalar yürütülmesini kapsamaktadır.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/c5e98c9906414da897751aef53f7cdea_(768_432).jpg",
    status: "Aktif",
    date: "20 Kasım 2025 Perşembe"
  },
  {
    id: "NEWS-003",
    title: "İGÜ Kariyer Merkezi'nden TRC Marine Electronics'e Kurumsal Ziyaret",
    description: "İstanbul Gelişim Üniversitesi Kariyer Merkezi Mezunlar ve Mensuplar Koordinatörlüğü, üniversite–sektör etkileşimini güçlendirmek amacıyla TRC Marine Electronics'e kurumsal bir ziyaret gerçekleştirdi.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/49c1be8495d7408090bc9340ddd5a707_(768_432).jpg",
    status: "Aktif",
    date: "20 Kasım 2025 Perşembe"
  },
  {
    id: "NEWS-004",
    title: "İŞKUR Destekli “Etkili CV Hazırlama ve Mülakat Simülasyonu” Eğitimi Gerçekleştirildi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından, İŞKUR iş birliğiyle düzenlenen “Etkili CV Hazırlama ve Mülakat Simülasyonu” eğitimi, Gürol Bingöl'ün katılımıyla gerçekleştirildi. Eğitimde öğrencilere iş alım süreçleri, yeni nesil CV hazırlama teknikleri ve mülakatlarda dikkat edilmesi gereken noktalar aktarıldı. Katılımcılar ayrıca birebir mülakat simülasyonlarıyla gerçek görüşme deneyimi yaşadı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/004d66b841a74e7c90705daaf7a332fd_(768_432).jpg",
    status: "Aktif",
    date: "05 Kasım 2025 Çarşamba"
  },
  {
    id: "NEWS-005",
    title: "MoodLab Style Firmasına Ziyaret Gerçekleştirildi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Merkezi, Mezunlar ve Mensuplar Koordinatörlüğü ile Moda Tasarımı Programı olarak MoodLab Style firmasına ziyaret gerçekleştirildi.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/81ef9405e47647a19acf4f065f602379_(768_432).jpg",
    status: "Aktif",
    date: "31 Ekim 2025 Cuma"
  },
  {
    id: "NEWS-006",
    title: "KariyerFest'26 Festival Coşkusuyla Gerçekleştirildi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen KariyerFest'26, 31 Mart 2026 tarihinde yoğun öğrenci katılımıyla festival havasında gerçekleştirildi.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/22e312c3e67646ccb6aec889e6a800db_(768_432).jpg",
    status: "Aktif",
    date: "03 Nisan 2026 Cuma"
  },
  {
    id: "NEWS-007",
    title: "LinkedIn'de Kişisel Marka ve Networking Stratejileri Eğitimi Gerçekleştirildi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen eğitimde Dijital Stratejist Duygu Taşdan, öğrencilerle LinkedIn'de kişisel marka oluşturma ve etkili networking stratejileri üzerine bilgi ve deneyimlerini paylaştı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/5f7639fdde4a4dcf9ea9ffea4b94cf1a_(768_432).jpg",
    status: "Aktif",
    date: "16 Mart 2026 Pazartesi"
  },
  {
    id: "NEWS-008",
    title: "Karınca Lojistik ile Lojistik Sektörüne Bakış Etkinliği Gerçekleştirildi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen “Karınca Lojistik ile Lojistik Sektörüne Bakış: Lojistiğin Bugünü, Yarının Stratejileri” başlıklı etkinlikte öğrenciler sektör profesyonelleriyle bir araya gelerek lojistik sektörünün güncel dinamikleri ve kariyer fırsatları hakkında bilgi edinme fırsatı buldu.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/62fc2009727742848b1f9a10bdab64a7_(768_432).jpg",
    status: "Aktif",
    date: "16 Mart 2026 Pazartesi"
  },
  {
    id: "NEWS-009",
    title: "İGÜ Kariyer Merkezi'nde Dijital Odaklı Üniversite–Sektör İş Birliği Ziyareti",
    description: "İstanbul Gelişim Üniversitesi İGÜ Kariyer Geliştirme Merkezi, öğrencilerin dijital yetkinliklerini ve sektör deneyimini güçlendirmeye yönelik üniversite–sektör iş birlikleri kapsamında, Canada Digital Market Inc. şirketinden Duygu Taşdan'ı ağırladı. Gerçekleştirilen görüşmede, uygulama odaklı çalışmalar ve öğrencilerin kariyer gelişimine katkı sağlayacak iş birliği alanları ele alındı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/0860c6d437f4406396a88380637658da_(768_432).jpg",
    status: "Aktif",
    date: "17 Şubat 2026 Salı"
  },
  {
    id: "NEWS-010",
    title: "Kariyer Merkezi ve Doğuş Oto İş Birliğiyle “Otomotiv Sektöründe Kariyer Yolculuğu: Doğuş Oto Deneyimi” Semineri Gerçekleştirildi",
    description: "Kariyer Merkezi tarafından Doğuş Oto iş birliğiyle düzenlenen “Otomotiv Sektöründe Kariyer Yolculuğu: Doğuş Oto Deneyimi” semineri, MYO Otomotiv ve Makine programı öğrencilerinin katılımıyla gerçekleştirildi. Etkinlik, soru-cevap formatında ve interaktif bir şekilde tamamlandı.",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/e28b2c223688466ab769769a8d12ca9f_(768_432).jpg",
    status: "Aktif",
    date: "25 Aralık 2025 Perşembe"
  }
];

// =====================================================
// Etkinlikler — kariyer.gelisim.edu.tr/tr/idari-icerik-etkinliklerimiz'den birebir
// NOT: Resmi sitede etkinliklere tarih ve konum eklenmemiş.
// =====================================================
export const initialEvents = [
  {
    id: "EVT-001",
    title: "İstanbul Gelişim Üniversitesi Öğrencilerine LinkedIn Eğitimi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından öğrencilerimize yönelik LinkedIn Eğitimi düzenlendi. Eğitimde, öğrencilerimizin profesyonel iş ağı olan LinkedIn'i etkin kullanarak kariyer fırsatlarını daha yakından takip etmeleri, güçlü bir profil oluşturmaları ve iş/staj başvurularında öne çıkmaları için gerekli bilgiler paylaşıldı. Etkinlik sonunda katılımcılar, LinkedIn'i kariyer gelişimlerinde nasıl daha verimli kullanabileceklerini öğrenme fırsatı buldular.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/resim1_5d42af931ec34b13bb9dd1ed4b14328f.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-002",
    title: "İstanbul Gelişim Üniversitesi Öğrencilerine CV Hazırlama Eğitimi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından öğrencilerimize yönelik CV Hazırlama Eğitimi gerçekleştirildi. Eğitimde, öğrencilerimizin iş ve staj başvurularında öne çıkabilmeleri için dikkat etmeleri gereken noktalar, profesyonel CV hazırlama teknikleri ve sık yapılan hatalar üzerine bilgiler paylaşıldı. Katılımcılar, kendi özgeçmişlerini daha etkili ve kurumsal bir şekilde düzenleme konusunda önemli kazanımlar elde ettiler.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/ngf_e13aae3e955d48f592ae5515e9f897d0.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-003",
    title: "İŞKUR Tarafından Mülakat Teknikleri Eğitimi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi iş birliğiyle, İŞKUR tarafından öğrencilerimize yönelik \"Mülakat Teknikleri Eğitimi\" düzenlendi. Eğitim kapsamında, öğrencilerimizin iş görüşmelerinde başarılı olabilmeleri için dikkat etmeleri gereken noktalar, mülakatlarda sıkça sorulan sorular ve etkili iletişim yöntemleri aktarıldı. Katılımcılar, iş/staj başvurularında mülakat süreçlerine daha bilinçli ve hazırlıklı bir şekilde katılabilmeleri adına önemli kazanımlar elde ettiler.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/bdf_d31b508601924d5eb9b3137e4bc6bf41.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-004",
    title: "Sağlıkta Kariyer Fuarı",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen Sağlıkta Kariyer Fuarı, öğrencilerimizin yoğun katılımıyla gerçekleştirildi. Fuarda, sağlık sektöründe faaliyet gösteren birçok kurum ve kuruluş temsilcisi yer aldı. Öğrencilerimiz, firma yetkilileriyle birebir görüşme fırsatı bulurken, sektördeki güncel gelişmeleri, iş ve staj olanaklarını yakından tanıma imkânı elde ettiler.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/bfd_771029180d1b4337b418b2f88b1173c7.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-005",
    title: "SYL Sigorta ile Sigorta Sektörü Üzerine Etkinlik",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından, Banka ve Sigortacılık Bölümü öğrencilerine yönelik SYL Sigorta iş birliğiyle bir etkinlik gerçekleştirildi. Etkinlikte, sigorta sektörünün güncel durumu, sektördeki kariyer olanakları ve öğrencilerin mezuniyet sonrası iş hayatına hazırlık süreçlerinde dikkat etmeleri gereken noktalar ele alındı.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/cv_5727b98cad934249915b2f6a10f35b19.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-006",
    title: "Esteworld Semineri",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından, Esteworld iş birliğiyle sağlık öğrencilerimize yönelik bir seminer düzenlendi. Seminerde, öğrencilerimize sağlık sektörüne ilişkin bilgiler aktarıldı.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/dfv_8b47edce55f54ec89a92d6652a5102ba.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-007",
    title: "İstanbul Gelişim Üniversitesi Kariyer Fuarı Gerçekleşti",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen Kariyer Fuarı, öğrencilerimiz ile sektör temsilcilerini bir araya getirdi. Fuarda birçok firma ve kurum, öğrencilerimizle iş ve staj olanaklarını paylaşarak kariyer planlamalarına katkı sundu. Katılımcılar, firma yetkilileriyle birebir görüşme fırsatı bulurken, sektör hakkında güncel bilgiler edindiler.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/g-h_c608d2d402f645cebd41ffa2f229ac23.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-008",
    title: "Örtem Firması Öğrencilerimizle Buluştu",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen etkinlikte, Örtem firması yetkilileri öğrencilerimizle bir araya geldi. Etkinlikte, sektörün güncel durumu ve kariyer olanakları hakkında bilgiler paylaşıldı. Öğrencilerimiz, iş dünyasına dair önemli kazanımlar elde etme fırsatı buldu.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/bfd_781a97d0d36c44a5a57e3d1c69ed5b6b.jpg",
    status: "Aktif"
  },
  {
    id: "EVT-009",
    title: "NTG Lojistik ile Öğrencilerimize Ders Müfredatını Destekleyen Etkinlik",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen etkinlik kapsamında, NTG Lojistik yetkilileri öğrencilerimizle bir araya geldi. Etkinlikte, ders müfredatımızı destekleyen konular üzerinde durularak sektöre dair bilgiler paylaşıldı. Öğrencilerimiz, alanlarında teorik bilgilerini uygulama örnekleriyle pekiştirme fırsatı buldu.",
    date: "Tarih belirtilmemiş",
    time: "",
    location: "İGÜ Kampüsü",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/sdv_32228242ef544387b7d8b30188efe789.jpg",
    status: "Aktif"
  }
];

// =====================================================
// Duyurular — kariyer.gelisim.edu.tr'den birebir çekildi
// =====================================================
export const initialAnnouncements = [
  {
    id: "ANN-001",
    title: "Next Gen Kariyer Fuarı'26 Başarıyla Gerçekleştirildi",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen Next Gen Kariyer Fuarı'26, 5 Mayıs tarihinde 60'tan fazla firmanın katılımıyla gerçekleştirildi. Öğrenci ve mezunlar iş, staj ve istihdam fırsatlarıyla buluşurken çeşitli etkinliklerle keyifli bir fuar deneyimi yaşadı.",
    date: "11.05.2026 13:13:20",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/dsc05314-1_c672f5dcea50415bbc466152a188fa14.jpg"
  },
  {
    id: "ANN-002",
    title: "Aspera Hotel – Stajyer Alımı",
    description: "Aspera Hotel Stajyer Alımı Gerçekleştiriyor.",
    date: "8.05.2026 13:05:06",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/chatgpt-image-7-may-2026-11-54-40_8682d21abb05456983f084cab0513446.png"
  },
  {
    id: "ANN-003",
    title: "Takipsan Üniversite Stajyeri Alımı Başladı",
    description: "Bilişim ve RFID teknolojileri alanında faaliyet gösteren Takipsan, çeşitli bölümlerde öğrenim gören üniversite öğrencileri için staj fırsatı sunuyor.",
    date: "8.05.2026 12:25:37",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/stajyer-ilan-1_8a47352a3df64e83957f7828e6149123.png"
  },
  {
    id: "ANN-004",
    title: "NEXT GEN KARİYER FUARI'26 BAŞLIYOR!",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen Next Gen Kariyer Fuarı'26, öğrencileri ve mezunları sektörün önde gelen kurum ve kuruluşlarıyla bir araya getiriyor.",
    date: "29.04.2026 10:47:13",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/dsc05314-1_c672f5dcea50415bbc466152a188fa14.jpg"
  },
  {
    id: "ANN-005",
    title: "Savunma Kariyer Platformuna Yeni Modül: Kariyer Gelişim Yayında",
    description: "Milli Yetkinlik Hamlesi kapsamında geliştirilen Savunma Kariyer platformunun yeni modülü Kariyer Gelişim yayında.",
    date: "27.03.2026 11:19:07",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/dsc05314-1_c672f5dcea50415bbc466152a188fa14.jpg"
  },
  {
    id: "ANN-006",
    title: "ULUSAL STAJ BAŞVURULARI UZATILDI",
    description: "Cumhurbaşkanlığı himayesinde yürütülen Ulusal Staj Programı'na başvurular 31 Mart 2026, saat 23:59'a kadar uzatıldı.",
    date: "16.03.2026 13:43:00",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/ulusal-staj-programi-ek-usp-uni-pay2_7a018351522340f9883fe36d578505ed.jpg"
  },
  {
    id: "ANN-007",
    title: "Karınca Lojistik ile Lojistik Sektörüne Bakış Semineri",
    description: "İstanbul Gelişim Üniversitesi Kariyer Geliştirme Merkezi tarafından düzenlenen \"Karınca Lojistik ile Lojistik Sektörüne Bakış\" etkinliği, sektör temsilcilerini öğrencilerle bir araya getiriyor.",
    date: "9.03.2026 09:08:19",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/11-mart-karinca-lojistik-post_8247dddb369d44359b3dc91e20c0fdee.jpg"
  },
  {
    id: "ANN-008",
    title: "Kariyer ve Yetkinlik Buluşmaları-3 BAŞLIYOR!",
    description: "Milli Yetkinlik Hamlesi kapsamında üniversite öğrencilerimize yönelik çevrim içi olarak düzenlenen Kariyer ve Yetkinlik Buluşmaları'nın üçüncüsü, 11 Mart 2026 Çarşamba günü gerçekleştirilecektir.",
    date: "9.03.2026 09:01:24",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/kyb3-bizi-neler-bekliyor-jpg_2ee1d709cb9e4c459bb371a50806274b.jpeg"
  },
  {
    id: "ANN-009",
    title: "Öğrenciler için LinkedIn'de Kişisel Marka Oluşturma Stratejisi Eğitimi",
    description: "İstanbul Gelişim Üniversitesi İGÜ KARİYER YÖNLENDİRME UYGULAMA VE ARAŞTIRMA MERKEZİ olarak, öğrencilerimizin kariyer yolculuğuna katkı sağlayacak özel bir eğitimle karşınızdayız.",
    date: "9.03.2026 08:59:03",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/14-mart-ogrenciler-icin-linkedin-post-1-fddd-1_68325c7f56a145cbb9e666a125b0b040.jpg"
  },
  {
    id: "ANN-010",
    title: "FORD OTOSAN KARİYER VE GELİŞİM HAFTASI BAŞLIYOR",
    description: "Ford Otosan Kariyer ve Gelişim Haftası Başlıyor! Ford Otosan dünyasını yakından tanıyacağın, alanında uzman liderlerle teknik ve gelişim odaklı konuları dinleme fırsatı yakalayacağın Kariyer ve Gelişim Haftası başlıyor.",
    date: "25.02.2026 11:15:37",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/fordotosan-kgh_e785ea33819e48cbbee612d15a51eb1e.png"
  },
  {
    id: "ANN-011",
    title: "Ulusal Staj Programı 2026 Yılı Başvuruları Başladı!",
    description: "Cumhurbaşkanlığı himayesinde yürütülen Ulusal Staj Programı 2026 yılı başvuruları başladı.",
    date: "12.01.2026 15:11:16",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/ulusal-staj-programi-ek-usp-uni-pay2_7a018351522340f9883fe36d578505ed.jpg"
  },
  {
    id: "ANN-012",
    title: "KİDZANİA STAJ PROGRAMI",
    description: "Eğlenceli bir ortamda staj yapmak isteyenler buraya! Ocak, Şubat ve Mart dönemleri için staj başvuruları açıldı. Hem deneyim kazan, hem çocuklarla dolu enerjik bir dünyada çalışmanın keyfini yaşa.",
    date: "2.12.2025 12:34:51",
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/kidzania-kis-staj-programi-1_22fa014b3d284e5a95a3e1dab60613e9.jpg"
  }
];

// =====================================================
// SEM Kursları
// =====================================================
export const initialSemCourses = [
  { id: "SEM-001", title: "Dijital Pazarlama Sertifika Programı", description: "devamını oku", imageUrl: "https://w3-s3-bucket.s3.us-east-1.amazonaws.com/SaaS/semonline/uploaded-files/1863174303737663.jpeg", status: "Aktif" },
  { id: "SEM-002", title: "Sertifikalarınız Artık E-Devlet Sisteminde", description: "devamını oku", imageUrl: "https://w3-s3-bucket.s3.us-east-1.amazonaws.com/SaaS/semonline/uploaded-files/1863169639302748.jpeg", status: "Aktif" },
  { id: "SEM-003", title: "Temel ve Orta Seviye Excel Eğitimi", description: "devamını oku", imageUrl: "https://w3-s3-bucket.s3.us-east-1.amazonaws.com/SaaS/semonline/uploaded-files/1863175713016420.jpeg", status: "Aktif" },
  { id: "SEM-004", title: "Proje Yönetimi (PMP Hazırlık)", description: "devamını oku", imageUrl: "https://w3-s3-bucket.s3.us-east-1.amazonaws.com/SaaS/semonline/uploaded-files/1863354459156114.jpeg", status: "Aktif" },
  { id: "SEM-005", title: "İnsan Kaynakları Yönetimi Sertifika Programı", description: "devamını oku", imageUrl: "https://w3-s3-bucket.s3.us-east-1.amazonaws.com/SaaS/semonline/uploaded-files/1862800825295090.jpeg", status: "Aktif" },
];

// =====================================================
// İş İlanları — Gerçek sitedeki hizmetler temel alındı
// =====================================================
export const initialJobs = [
  { id: "JOB-001", title: "Ulusal Staj Programı", company: "İGÜ Kariyer Geliştirme Merkezi", location: "Türkiye Geneli", description: "Cumhurbaşkanlığı himayesinde yürütülen Ulusal Staj Programı kapsamında çeşitli kurumlarda staj imkânı.", imageUrl: "https://panel.gelisim.edu.tr/assets/2026/resimler/mmk/ulusal-staj-programi-ek-usp-uni-pay2_7a018351522340f9883fe36d578505ed.jpg", status: "Aktif" },
  { id: "JOB-002", title: "Araştırma Faaliyetleri", company: "İGÜ Kariyer Geliştirme Merkezi", location: "İstanbul Gelişim Üniversitesi", description: "Kariyer Geliştirme Merkezi bünyesinde yürütülen araştırma faaliyetleri ve projeler.", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/123e5d87cd934f49ad587f7f4bb01f5a_(768_432).jpg", status: "Aktif" },
  { id: "JOB-003", title: "Akran Mentor Programı", company: "İGÜ Kariyer Geliştirme Merkezi", location: "İstanbul Gelişim Üniversitesi", description: "Deneyimli öğrencilerin yeni öğrencilere rehberlik ettiği Akran Mentor programı.", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/c5e98c9906414da897751aef53f7cdea_(768_432).jpg", status: "Aktif" },
  { id: "JOB-004", title: "İş Arama Platformları Rehberi", company: "İGÜ Kariyer Geliştirme Merkezi", location: "Online", description: "Öğrencilere ve mezunlara yönelik iş arama platformları ve kariyer kaynakları rehberi.", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/49c1be8495d7408090bc9340ddd5a707_(768_432).jpg", status: "Aktif" },
  { id: "JOB-005", title: "İşbirliklerimiz — Sektör Ortaklıkları", company: "İGÜ Kariyer Geliştirme Merkezi", location: "İstanbul Gelişim Üniversitesi", description: "Kariyer Merkezi'nin sektör liderleriyle kurduğu iş birliği protokolleri ve ortak projeler.", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/mmk/81ef9405e47647a19acf4f065f602379_(768_432).jpg", status: "Aktif" },
];

// =====================================================
// Öne Çıkan Fırsatlar — Sitedeki ana sayfadaki slider görselleri
// =====================================================
export const initialFeatured = [
  { id: "FTR-001", title: "Ulusal Staj Programı", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/c22f7ef2fdc8492ea26e4508c7a48adc_015b9396b49f4bbfb8454c98cc1ebeaa.jpg" },
  { id: "FTR-002", title: "Araştırma Faaliyetleri", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/09a23c212bca4b988af33523dc56b0dc_dd6cc4f202854efbb56f5f58b6494a2e.jpg" },
  { id: "FTR-003", title: "Akran Mentor Programı", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/1d091a0ef16d416db4ab9232c2f9120b_97d77ce97bbe412b80857b53c64b7cf6.jpg" },
  { id: "FTR-004", title: "İş Arama Platformları", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/b9ec20f282ca455e8b55f1eab8b00c57_7c50bd63d1b34feab07bbd8eed7ba269.jpg" },
  { id: "FTR-005", title: "İşbirliklerimiz", imageUrl: "https://panel.gelisim.edu.tr/assets/2025/resimler/kurumsaliletisim/8c4f08ebeb2c4fd8b10b76a73388eb07_ce7747ca00fc4b659e0af2bacbe93742.jpg" },
];

export const initialMentorships = [];
export const initialVoluntaryInternships = [];

// =====================================================
// Akademik Katalog
// =====================================================
const generateCatalog = () => {
  let facId = 1;
  let depId = 1;
  let prgId = 1;

  const allUnits = [
    ...IGU_FACULTIES.map(u => ({...u, type: 'Fakülte'})),
    ...IGU_MYO.map(u => ({...u, type: 'Meslek Yüksekokulu'})),
    ...IGU_YUKSEKOKUL.map(u => ({...u, type: 'Yüksekokul'})),
    ...IGU_ENSTITU.map(u => ({...u, type: 'Enstitü'}))
  ];

  return allUnits.map(unit => {
    return {
      id: `FAC-${String(facId++).padStart(3, '0')}`,
      name: unit.name,
      type: unit.type,
      status: "Aktif",
      departments: unit.departments.map(dep => {
        return {
          id: `DEP-${String(depId++).padStart(3, '0')}`,
          name: dep,
          status: "Aktif",
          programs: [
            {
              id: `PRG-${String(prgId++).padStart(3, '0')}`,
              name: `${dep} (${unit.type === 'Meslek Yüksekokulu' ? 'Önlisans' : unit.type === 'Enstitü' ? 'Lisansüstü' : 'Lisans'})`,
              level: unit.type === 'Meslek Yüksekokulu' ? 'Önlisans' : unit.type === 'Enstitü' ? 'Lisansüstü' : 'Lisans',
              doubleMajorEligible: true,
              status: "Aktif"
            }
          ]
        }
      })
    };
  });
};

export const initialAcademicCatalog = generateCatalog();
export const academicStaff = [];

// =====================================================
// Stajlar — Eski sahte şirketler temizlendi
// =====================================================
export const initialInternships = [];

// =====================================================
// Akademik Onaylar
// =====================================================
export const initialAcademicApprovals = [];

// =====================================================
// Gruplar
// =====================================================
export const initialGroups = [
  {
    id: "GRP-001",
    name: "Yazılım Geliştiricileri Kulübü",
    description: "İstanbul Gelişim Üniversitesi öğrencileri, mezunları ve akademisyenlerinin yer aldığı, teknoloji ve yazılım geliştirme üzerine etkinlikler düzenleyen resmi topluluk.",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    logo: "https://ui-avatars.com/api/?name=YG&background=0D9488&color=fff&size=200",
    type: "Öğrenci Kulübü",
    memberCount: 142,
    verified: true,
    createdBy: "admin_igu",
    status: "Aktif",
    events: [],
    boardMembers: [
      { role: "Kulüp Başkanı", name: "Ali Yılmaz", department: "Bilgisayar Mühendisliği" },
      { role: "Başkan Yardımcısı", name: "Ayşe Kaya", department: "Yazılım Mühendisliği" },
      { role: "Genel Sekreter", name: "Mehmet Demir", department: "Bilişim Sistemleri" },
      { role: "Sayman", name: "Zeynep Çelik", department: "İşletme" },
      { role: "Danışman Akademisyen", name: "Dr. Öğr. Üyesi Ahmet Kılıç", department: "Bilgisayar Mühendisliği" }
    ]
  },
  {
    id: "GRP-002",
    name: "Girişimcilik ve İnovasyon Topluluğu",
    description: "Kendi işini kurmak isteyenlerin, melek yatırımcıların ve girişimcilik ekosistemine ilgi duyan tüm İGÜ'lülerin buluşma noktası.",
    cover: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2032&q=80",
    logo: "https://ui-avatars.com/api/?name=GI&background=0A2342&color=fff&size=200",
    type: "Mezun Ağı",
    memberCount: 89,
    verified: false,
    createdBy: 1,
    status: "Aktif",
    events: [],
    boardMembers: [
      { role: "Kulüp Başkanı", name: "Kerem Tunç", department: "İşletme" },
      { role: "Başkan Yardımcısı", name: "Selin Yılmaz", department: "Uluslararası Ticaret" },
      { role: "Danışman Akademisyen", name: "Prof. Dr. Ayşe Yılmaz", department: "İşletme" }
    ]
  }
];

// =====================================================
// Anketler
// =====================================================
export const initialSurveys = [
  {
    id: 'SRV-101',
    title: '2024 Mezun İstihdam ve Memnuniyet Anketi',
    description: 'İGÜ\'nün kalitesini artırmak için mezuniyet sonrası iş hayatınızla ilgili deneyimlerinizi öğrenmek istiyoruz.',
    date: '2026-07-15',
    status: 'Aktif',
    type: 'Genel Anket',
    targetAudience: 'Mezunlar',
    responses: 24,
    questions: [
      { id: 'q1', text: 'İGÜ\'de aldığınız eğitimin mevcut işinize katkısı nedir?', type: 'likert' },
      { id: 'q2', text: 'Şu anki işinizden genel olarak memnun musunuz?', type: 'likert' }
    ]
  },
  {
    id: 'SRV-102',
    title: 'Kariyer Merkezi Hizmetleri Değerlendirmesi',
    description: 'İGÜ Kariyer Merkezi\'nin sunduğu hizmetlerden ne kadar faydalandınız?',
    date: '2026-07-10',
    status: 'Aktif',
    type: 'Etkinlik Değerlendirme',
    targetAudience: 'Tümü',
    responses: 112,
    questions: [
      { id: 'q1', text: 'Kariyer merkezimizin ilanlarını ne sıklıkla takip ediyorsunuz?', type: 'likert' }
    ]
  }
];


export const initialPosts = [
    { id: 'POST-001', author: { id: 'CMP-001', name: 'Trendyol', avatar: 'https://ui-avatars.com/api/?name=Trendyol&background=F97316&color=fff', title: 'Teknoloji Ekibi', role: 'employer' }, content: 'Yazılım Mühendisliği stajyer alımlarımız başlamıştır! Tüm İGÜ öğrencilerini bekliyoruz. 🚀 #trendyol #staj', likes: 145, comments: 23, time: '2 saat önce' },
    { id: 'POST-002', author: { id: 'ALU-001', name: 'Caner Öztürk', avatar: 'https://ui-avatars.com/api/?name=Caner+Öztürk&background=EA580C&color=fff', title: 'Frontend Developer @ Trendyol', role: 'alumni' }, content: 'Mezun olduğum Gelişim Üniversitesi Kariyer Fuarında şirketimi temsil etmek gurur verici. Harika yeteneklerle tanıştık! 🎓', likes: 89, comments: 12, time: '5 saat önce' },
    { id: 'POST-003', author: { id: 'STU-002', name: 'Zeynep Kaya', avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=0A2342&color=fff', title: 'Bilgisayar Mühendisliği Öğrencisi', role: 'student' }, content: 'Bugün KGM tarafından düzenlenen Mülakat Teknikleri eğitimine katıldım. Eksiklerimi görmek için harika bir deneyimdi. Emeği geçenlere teşekkürler! 💼', likes: 45, comments: 5, time: '1 gün önce' },
    { id: 'POST-004', author: { id: 'ACAD-001', name: 'Prof. Dr. Ahmet Yılmaz', avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=0EA5E9&color=fff', title: 'Dekan', role: 'academic' }, content: 'Fakültemiz öğrencilerinin bitirme projeleri sanayi odaklı olmaya devam ediyor. Bu yıl 15 projemiz TÜBİTAK desteği aldı.', likes: 210, comments: 18, time: '2 gün önce' }
  ];