const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

// 1. Remove the bad renderPanel from the TOP of the file (lines 1 to 41 roughly).
// Look for the first "export default function AdminDashboard"
const exportIdx = content.indexOf('export default function AdminDashboard');
// And look for the "import CMSEvents from './admin/CMSEvents';" which was originally at line 42.
const cmsEventsIdx = content.indexOf("import CMSEvents from './admin/CMSEvents';");

const topImports = `import React, { useState, useMemo } from 'react';
import useAppStore from '../store/useAppStore';
import TopProfileMenu from './TopProfileMenu';

import { Megaphone, Star, Trophy } from 'lucide-react';
`;

// Replace everything up to cmsEventsIdx with topImports
content = topImports + content.substring(cmsEventsIdx);

// 2. Fix the broken renderPanel inside AdminDashboard
const brokenRenderStart = content.indexOf("case 'akademik':    return <AkademikPanel {...p}/>;");
const brokenRenderEnd = content.indexOf("});", brokenRenderStart);

const replacement = `case 'akademik':    return <AkademikPanel {...p}/>;
      case 'cms_news':    return <CMSNews news={p.newsEvents || []} setNews={p.setNewsEvents} posts={posts} setPosts={setPosts} currentUser={currentUser} />;
      case 'companies':   return <CMSCompanies companies={companies || []} setCompanies={setCompanies} />;
      case 'students':    return <CMSStudents students={students || []} setStudents={setStudents} />;
      case 'academic_staff': return <CMSAcademicStaff academicStaff={academicStaff || []} setAcademicStaff={setAcademicStaff} />;
      case 'alumni':      return <CMSAlumni alumni={alumni || []} setAlumni={setAlumni} surveys={surveys} setSurveys={setSurveys} currentUser={currentUser} setPosts={setPosts} posts={posts} />;
      case 'mezun_dernek':return <CMSAlumniAssoc posts={posts} setPosts={setPosts} currentUser={currentUser} />;
      case 'kart':        return <CMSAlumniCard alumniCardApplications={alumniCardApplications} setAlumniCardApplications={setAlumniCardApplications} alumniCardForms={alumniCardForms} setAlumniCardForms={setAlumniCardForms} />;
      case 'ilan':        return <CMSJobs jobs={jobs || []} setJobs={setJobs} applications={applications || []} />;
      case 'etkinlik':    return <CMSEvents events={events || []} setEvents={setEvents} posts={posts} setPosts={setPosts} currentUser={currentUser} />;
      case 'mentorluk':   return <CMSMentorship mentorships={mentorships || []} setMentorships={setMentorships} />;
      case 'gonullu':     return <CMSVoluntaryInternships volunteerInterns={voluntaryInternships || []} setVolunteerInterns={setVoluntaryInternships} />;
      case 'sem':         return <CMSSEMCourses semCourses={semCourses || []} setSemCourses={setSemCourses} posts={posts} setPosts={setPosts} currentUser={currentUser} />;
      case 'mesajlar':    return <CMSMessages messages={messages || []} />;
      case 'entegrasyon': return <CMSIntegrations />;
      case 'anket':       return <CMSSurveys surveys={surveys || []} setSurveys={setSurveys} posts={posts} setPosts={setPosts} currentUser={currentUser} announcements={announcements} setAnnouncements={setAnnouncements} students={students || []} alumni={alumni || []} />;
      case 'analytics':   return <CMSAnalytics students={students || []} alumni={alumni || []} companies={companies || []} jobs={jobs || []} applications={applications || []} />;
      case 'content_import': return <OfficialContentImport news={news || []} setNews={setNews} announcements={announcements || []} setAnnouncements={setAnnouncements} events={events || []} setEvents={setEvents} />;
      case 'cleanup':     return <DataCleanup students={students || []} setStudents={setStudents} alumni={alumni || []} setAlumni={setAlumni} companies={companies || []} setCompanies={setCompanies} messages={messages || []} posts={posts || []} setPosts={setPosts} jobs={jobs || []} setJobs={setJobs} />;
      case 'kariyer_gunleri': return <CMSCareerFair />;
      case 'platform_ayarlari': return <PlatformSettings featureSurveys={featureSurveys} setFeatureSurveys={setFeatureSurveys} featureCareerCheckup={featureCareerCheckup} setFeatureCareerCheckup={setFeatureCareerCheckup} featureAlumniCard={featureAlumniCard} setFeatureAlumniCard={setFeatureAlumniCard} featureClubsShowcase={featureClubsShowcase} setFeatureClubsShowcase={setFeatureClubsShowcase} featureClubApplications={featureClubApplications} setFeatureClubApplications={setFeatureClubApplications} featureCareerFair={featureCareerFair} setFeatureCareerFair={setFeatureCareerFair} featureSSPLeaderboard={useAppStore(state => state.featureSSPLeaderboard)} setFeatureSSPLeaderboard={useAppStore(state => state.setFeatureSSPLeaderboard)} />;
      default:            return <OverviewPanel {...p}/>;
    }
  };

  const MAIN_TABS = [
    { id: 'overview', icon: <LayoutDashboard size={14}/>, label: 'Genel Bakış' },
    { id: 'operasyon', icon: <Activity size={14}/>, label: 'Operasyon' },
    { id: 'akademik', icon: <BookOpen size={14}/>, label: 'Akademik' },
    { id: 'students', icon: <GraduationCap size={14}/>, label: 'Öğrenci' },
    { id: 'alumni', icon: <Award size={14}/>, label: 'Mezun' },
    { id: 'companies', icon: <Building2 size={14}/>, label: 'İşveren' },
    { id: 'academic_staff', icon: <Library size={14}/>, label: 'Akademik Personel' },
    { id: 'mesajlar', icon: <MessageSquare size={14}/>, label: 'Mesajlar' },
  ];

  const MORE_TABS = [
    { id: 'ilan', icon: <Briefcase size={14}/>, label: 'İş & Staj İlanları' },
    { id: 'cms_feat', icon: <Star size={14}/>, label: 'Öne Çıkanlar' },
    { id: 'cms_jobs', icon: <TrendingUp size={14}/>, label: 'Kariyer Fırsatları' },
    { id: 'gonullu', icon: <Heart size={14}/>, label: 'Gönüllü Staj' },
    { id: 'mentorluk', icon: <Network size={14}/>, label: 'Mentorluk' },
    { id: 'etkinlik', icon: <Calendar size={14}/>, label: 'Kariyer Etkinlikleri' },
    { id: 'cms_events', icon: <Calendar size={14}/>, label: 'Genel Etkinlikler' },
    { id: 'kariyer_gunleri', icon: <Calendar size={14}/>, label: 'Geleneksel Kariyer Günleri' },
    { id: 'cms_news', icon: <Newspaper size={14}/>, label: 'Haberler' },
    { id: 'cms_ann', icon: <Megaphone size={14}/>, label: 'Duyurular' },
    { id: 'sem', icon: <BookOpen size={14}/>, label: 'SEM Eğitimleri' },
    { id: 'academic_catalog', icon: <BookOpen size={14}/>, label: 'Akademik Katalog' },
    { id: 'academic_approvals', icon: <CheckCircle size={14}/>, label: 'Akademik Onaylar' },
    { id: 'anket', icon: <ClipboardList size={14}/>, label: 'Anketler' },
    { id: 'analytics', icon: <BarChart3 size={14}/>, label: 'Analitik & Raporlar' },
    { id: 'content_import', icon: <FileText size={14}/>, label: 'İçerik İçe Aktarma' },
    { id: 'entegrasyon', icon: <Radio size={14}/>, label: 'Entegrasyonlar' },
    { id: 'mezun_dernek', icon: <Users size={14}/>, label: 'Mezunlar Derneği' },
    { id: 'kart', icon: <CreditCard size={14}/>, label: 'Mezun Kartı' },
    { id: 'cms_groups', icon: <Users size={14}/>, label: 'Gruplar' },
    { id: 'clubs_pool', icon: <Users size={14}/>, label: 'Öğrenci Kulüpleri' },
    { id: 'cms_ssp', icon: <Trophy size={14}/>, label: 'SSP Puanlama' },
    { id: 'cms_live_rooms', icon: <Radio size={14}/>, label: 'Canlı Yayın Odaları' },
    { id: 'cleanup', icon: <Trash2 size={14}/>, label: 'Veri Temizliği' },
    { id: 'platform_ayarlari', icon: <Settings size={14}/>, label: 'Platform Ayarları' },
  ];

  const ALL_TABS = [...MAIN_TABS, ...MORE_TABS].filter(tab => {
    if (tab.id === 'anket' && !featureSurveys) return false;
    if (tab.id === 'kart' && !featureAlumniCard) return false;
    return true;
  });
`;

content = content.substring(0, brokenRenderStart) + replacement + content.substring(brokenRenderEnd + 3);

fs.writeFileSync('src/components/AdminDashboard.jsx', content);
console.log('Fixed completely.');
