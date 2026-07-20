const fs = require('fs');

const file = 'src/utils/mockData.js';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  const studentsData = `export const generateStudents = () => {
  return [
    { id: 'STU-001', studentId: '20240001', name: 'Alperen Yılmaz', department: 'Yazılım Mühendisliği', year: 3, gpa: 3.4, email: 'alperen@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Alperen+Yılmaz&background=0A2342&color=fff', pronouns: 'o/onun', internshipStatus: 'Arıyor' },
    { id: 'STU-002', studentId: '20240002', name: 'Zeynep Kaya', department: 'Bilgisayar Mühendisliği', year: 4, gpa: 3.8, email: 'zeynep@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=0A2342&color=fff', doubleMajor: 'Endüstri Mühendisliği', internshipStatus: 'Tamamlandı' },
    { id: 'STU-003', studentId: '20240003', name: 'Mert Can', department: 'İşletme', year: 2, gpa: 2.9, email: 'mert@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Mert+Can&background=0A2342&color=fff', internshipStatus: 'İlgilenmiyor' },
    { id: 'STU-004', studentId: '20240004', name: 'Elif Demir', department: 'Mimarlık', year: 3, gpa: 3.1, email: 'elif@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Elif+Demir&background=0A2342&color=fff', internshipStatus: 'Aktif Stajyer' },
    { id: 'STU-005', studentId: '20240005', name: 'Burak Şahin', department: 'Makine Mühendisliği', year: 4, gpa: 3.6, email: 'burak@ogr.gelisim.edu.tr', password: 'password', role: 'student', avatar: 'https://ui-avatars.com/api/?name=Burak+Şahin&background=0A2342&color=fff', internshipStatus: 'Arıyor' }
  ];
};`;

  const alumniData = `export const generateAlumni = () => {
  return [
    { id: 'ALU-001', studentId: '20190001', name: 'Caner Öztürk', department: 'Yazılım Mühendisliği', gradYear: 2023, email: 'caner@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Caner+Öztürk&background=EA580C&color=fff', company: 'Trendyol', title: 'Frontend Developer' },
    { id: 'ALU-002', studentId: '20180002', name: 'Seda Çelik', department: 'Endüstri Mühendisliği', gradYear: 2022, email: 'seda@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Seda+Çelik&background=EA580C&color=fff', company: 'Ford Otosan', title: 'Üretim Planlama Uzmanı' },
    { id: 'ALU-003', studentId: '20200003', name: 'Tolgahan Aslan', department: 'Uluslararası Ticaret', gradYear: 2024, email: 'tolga@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Tolgahan+Aslan&background=EA580C&color=fff', company: 'Getir', title: 'Operasyon Uzmanı' },
    { id: 'ALU-004', studentId: '20170004', name: 'Ayça Yurt', department: 'Psikoloji', gradYear: 2021, email: 'ayca@mezun.gelisim.edu.tr', password: 'password', role: 'alumni', avatar: 'https://ui-avatars.com/api/?name=Ayça+Yurt&background=EA580C&color=fff', company: 'Kendi Kliniği', title: 'Klinik Psikolog' }
  ];
};`;

  const companiesData = `export const generateCompanies = () => {
  return [
    { id: 'CMP-001', username: 'trendyol', name: 'Trendyol', sector: 'E-Ticaret', email: 'ik@trendyol.com', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Trendyol&background=F97316&color=fff', website: 'https://trendyol.com', location: 'İstanbul, TR' },
    { id: 'CMP-002', username: 'getir', name: 'Getir', sector: 'Hızlı Teslimat', email: 'ik@getir.com', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Getir&background=5B21B6&color=fff', website: 'https://getir.com', location: 'İstanbul, TR' },
    { id: 'CMP-003', username: 'aselsan', name: 'Aselsan', sector: 'Savunma Sanayii', email: 'ik@aselsan.com.tr', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Aselsan&background=0A2342&color=fff', website: 'https://aselsan.com.tr', location: 'Ankara, TR' },
    { id: 'CMP-004', username: 'ford', name: 'Ford Otosan', sector: 'Otomotiv', email: 'ik@ford.com.tr', password: 'password', role: 'employer', avatar: 'https://ui-avatars.com/api/?name=Ford+Otosan&background=0284C7&color=fff', website: 'https://ford.com.tr', location: 'Kocaeli, TR' }
  ];
};`;

  const academicData = `export const generateAcademicStaff = () => {
  return [
    { id: 'ACAD-001', name: 'Prof. Dr. Ahmet Yılmaz', email: 'ayilmaz@gelisim.edu.tr', department: 'Bilgisayar Mühendisliği', password: 'password', role: 'academic', avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=0EA5E9&color=fff', title: 'Dekan' },
    { id: 'ACAD-002', name: 'Doç. Dr. Zeynep Çelik', email: 'zcelik@gelisim.edu.tr', department: 'Yazılım Mühendisliği', password: 'password', role: 'academic', avatar: 'https://ui-avatars.com/api/?name=Zeynep+Çelik&background=0EA5E9&color=fff', title: 'Bölüm Başkanı' },
    { id: 'ACAD-003', name: 'Dr. Öğr. Üyesi Can Kaya', email: 'ckaya@gelisim.edu.tr', department: 'İşletme', password: 'password', role: 'academic', avatar: 'https://ui-avatars.com/api/?name=Can+Kaya&background=0EA5E9&color=fff', title: 'Kariyer Danışmanı' }
  ];
};`;

  // Replace existing empty generators
  content = content.replace(/export const generateStudents = \(\) => \{\s*return \[\];\s*\};/g, studentsData);
  content = content.replace(/export const generateAlumni = \(\) => \{\s*return \[\];\s*\};/g, alumniData);
  content = content.replace(/export const generateCompanies = \(\) => \{\s*return \[\];\s*\};/g, companiesData);

  // Check if generateAcademicStaff exists, if not, append it
  if (!content.includes('generateAcademicStaff')) {
    content = content.replace(/export const initialNews/g, academicData + '\n\nexport const initialNews');
  } else {
    content = content.replace(/export const generateAcademicStaff = \(\) => \{\s*return \[\];\s*\};/g, academicData);
  }

  // Inject realistic posts as well
  const realisticPosts = `export const initialPosts = [
    { id: 'POST-001', author: { id: 'CMP-001', name: 'Trendyol', avatar: 'https://ui-avatars.com/api/?name=Trendyol&background=F97316&color=fff', title: 'Teknoloji Ekibi', role: 'employer' }, content: 'Yazılım Mühendisliği stajyer alımlarımız başlamıştır! Tüm İGÜ öğrencilerini bekliyoruz. 🚀 #trendyol #staj', likes: 145, comments: 23, time: '2 saat önce' },
    { id: 'POST-002', author: { id: 'ALU-001', name: 'Caner Öztürk', avatar: 'https://ui-avatars.com/api/?name=Caner+Öztürk&background=EA580C&color=fff', title: 'Frontend Developer @ Trendyol', role: 'alumni' }, content: 'Mezun olduğum Gelişim Üniversitesi Kariyer Fuarında şirketimi temsil etmek gurur verici. Harika yeteneklerle tanıştık! 🎓', likes: 89, comments: 12, time: '5 saat önce' },
    { id: 'POST-003', author: { id: 'STU-002', name: 'Zeynep Kaya', avatar: 'https://ui-avatars.com/api/?name=Zeynep+Kaya&background=0A2342&color=fff', title: 'Bilgisayar Mühendisliği Öğrencisi', role: 'student' }, content: 'Bugün KGM tarafından düzenlenen Mülakat Teknikleri eğitimine katıldım. Eksiklerimi görmek için harika bir deneyimdi. Emeği geçenlere teşekkürler! 💼', likes: 45, comments: 5, time: '1 gün önce' },
    { id: 'POST-004', author: { id: 'ACAD-001', name: 'Prof. Dr. Ahmet Yılmaz', avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yılmaz&background=0EA5E9&color=fff', title: 'Dekan', role: 'academic' }, content: 'Fakültemiz öğrencilerinin bitirme projeleri sanayi odaklı olmaya devam ediyor. Bu yıl 15 projemiz TÜBİTAK desteği aldı.', likes: 210, comments: 18, time: '2 gün önce' }
  ];`;
  
  if (!content.includes('export const initialPosts')) {
    content += '\n\n' + realisticPosts;
  } else {
    // If it exists but might be empty
    content = content.replace(/export const initialPosts = \[\s*\];/g, realisticPosts);
  }

  // Inject initial Jobs
  const realisticJobs = `export const initialJobs = [
    { id: 'JOB-001', title: 'Frontend Developer Stajyeri', company: 'Trendyol', location: 'İstanbul', type: 'Staj', sector: 'E-Ticaret', description: 'React ve modern JS teknolojilerine hakim stajyer arıyoruz.', postedAt: 'Bugün', status: 'Yayında', applicants: 45 },
    { id: 'JOB-002', title: 'Junior Data Analyst', company: 'Getir', location: 'Hibrit', type: 'Tam Zamanlı', sector: 'Hızlı Teslimat', description: 'SQL ve Python bilen yeni mezun analist.', postedAt: 'Dün', status: 'Yayında', applicants: 112 },
    { id: 'JOB-003', title: 'Üretim Mühendisi', company: 'Ford Otosan', location: 'Kocaeli', type: 'Tam Zamanlı', sector: 'Otomotiv', description: 'Yetiştirilmek üzere Makine veya Endüstri Mühendisi mezunu.', postedAt: '3 gün önce', status: 'Yayında', applicants: 89 },
    { id: 'JOB-004', title: 'Savunma Sistemleri Stajyeri', company: 'Aselsan', location: 'Ankara', type: 'Uzun Dönem Staj', sector: 'Savunma', description: '3. veya 4. sınıf bilgisayar/elektrik mühendisliği öğrencileri.', postedAt: '1 hafta önce', status: 'Yayında', applicants: 250 }
  ];`;
  
  if (content.includes('export const initialJobs = [];')) {
    content = content.replace(/export const initialJobs = \[\];/g, realisticJobs);
  }

  fs.writeFileSync(file, content);
  console.log('Injected highly realistic mock data (Students, Alumni, Companies, Academics, Posts, Jobs) into mockData.js');
}
