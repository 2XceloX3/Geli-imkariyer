// İstanbul Gelişim Üniversitesi — Fakülte ve Bölüm Verileri

export const IGU_FACULTIES = [
  {
    name: 'İktisadi, İdari ve Sosyal Bilimler Fakültesi',
    departments: [
      'Havacılık Yönetimi',
      'İşletme',
      'Siyaset Bilimi ve Uluslararası İlişkiler',
      'Uluslararası Ticaret ve Finansman',
      'Yönetim Bilişim Sistemleri',
      'Lojistik Yönetimi',
      'Psikoloji',
      'Radyo, Televizyon ve Sinema',
      'Yeni Medya ve İletişim',
      'Türk Dili ve Edebiyatı'
    ]
  },
  {
    name: 'Mühendislik ve Mimarlık Fakültesi',
    departments: [
      'Bilgisayar Mühendisliği',
      'Elektrik-Elektronik Mühendisliği',
      'Endüstri Mühendisliği',
      'İnşaat Mühendisliği',
      'Makine Mühendisliği',
      'Mimarlık',
      'Yazılım Mühendisliği',
      'İç Mimarlık'
    ]
  },
  {
    name: 'Sağlık Bilimleri Fakültesi',
    departments: [
      'Beslenme ve Diyetetik',
      'Fizyoterapi ve Rehabilitasyon',
      'Hemşirelik',
      'Sağlık Yönetimi',
      'Sosyal Hizmet',
      'Çocuk Gelişimi'
    ]
  },
  {
    name: 'Uygulamalı Bilimler Fakültesi',
    departments: [
      'Gastronomi ve Mutfak Sanatları',
      'Finans ve Bankacılık',
      'Muhasebe ve Finans Yönetimi'
    ]
  }
];

export const IGU_YUKSEKOKUL = [
  {
    name: 'Yabancı Diller Yüksekokulu',
    departments: [
      'İngilizce Hazırlık Programı'
    ]
  }
];

export const IGU_MYO = [
  {
    name: 'İstanbul Gelişim Meslek Yüksekokulu',
    departments: [
      'Bilgisayar Programcılığı',
      'Bilişim Güvenliği Teknolojisi',
      'İnternet ve Ağ Teknolojileri',
      'Bankacılık ve Sigortacılık',
      'Büro Yönetimi ve Yönetici Asistanlığı',
      'Dış Ticaret',
      'Grafik Tasarımı',
      'İç Mekan Tasarımı',
      'İnsan Kaynakları Yönetimi',
      'Lojistik',
      'Sivil Havacılık Kabin Hizmetleri',
      'Turizm ve Otel İşletmeciliği',
      'Uçak Teknolojisi'
    ]
  },
  {
    name: 'Sağlık Hizmetleri Meslek Yüksekokulu',
    departments: [
      'Ağız ve Diş Sağlığı',
      'Ameliyathane Hizmetleri',
      'Anestezi',
      'Fizyoterapi',
      'İlk ve Acil Yardım',
      'Odyometri',
      'Optisyenlik',
      'Tıbbi Görüntüleme Teknikleri',
      'Tıbbi Laboratuvar Teknikleri',
      'Yaşlı Bakımı'
    ]
  }
];

export const IGU_ENSTITU = [
  {
    name: 'Lisansüstü Eğitim Enstitüsü',
    departments: [
      'İşletme (Yüksek Lisans)',
      'Siyaset Bilimi ve Uluslararası İlişkiler (Yüksek Lisans)',
      'İnşaat Mühendisliği (Yüksek Lisans)',
      'Elektrik-Elektronik Mühendisliği (Yüksek Lisans)',
      'Psikoloji (Yüksek Lisans)',
      'Mimarlık (Yüksek Lisans)'
    ]
  }
];

// Tüm bölümleri düz liste olarak döndürür
export function getAllDepartments() {
  const all = [];
  [...IGU_FACULTIES, ...IGU_MYO, ...IGU_YUKSEKOKUL, ...IGU_ENSTITU].forEach(unit => {
    unit.departments.forEach(dept => {
      all.push({ faculty: unit.name, department: dept });
    });
  });
  return all;
}

// Fakülte adlarını düz liste olarak döndürür
export function getAllFacultyNames() {
  return [
    ...IGU_FACULTIES.map(f => f.name),
    ...IGU_MYO.map(f => f.name),
    ...IGU_YUKSEKOKUL.map(f => f.name),
    ...IGU_ENSTITU.map(f => f.name)
  ];
}

// Bir fakültenin bölümlerini döndürür
export function getDepartmentsByFaculty(facultyName) {
  const unit = [...IGU_FACULTIES, ...IGU_MYO, ...IGU_YUKSEKOKUL, ...IGU_ENSTITU].find(f => f.name === facultyName);
  return unit ? unit.departments : [];
}
