const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

const start = content.indexOf('const renderPanelContent');
const end = content.indexOf('// ALL_TABS', start);

const replacement = `  const renderPanelContent = () => {
    switch (activeTab) {
      case 'academic_catalog': return <CMSAcademicCatalog catalogItems={academicCatalog || []} setCatalogItems={setAcademicCatalog} />;
      case 'academic_approvals': return <CMSAcademicApprovals academicApprovals={academicApprovals || []} setAcademicApprovals={setAcademicApprovals} students={students || []} setStudents={setStudents} alumni={alumni || []} setAlumni={setAlumni} />;
      case 'cms_events':  return <CMSEvents events={events || []} setEvents={setEvents} posts={posts} setPosts={setPosts} currentUser={currentUser} />;
      case 'cms_ann':     return <CMSAnnouncements announcements={announcements || []} setAnnouncements={setAnnouncements} posts={posts} setPosts={setPosts} currentUser={currentUser} />;
      case 'cms_jobs':    return <CMSJobs jobs={jobs || []} setJobs={setJobs} applications={applications || []} />;
      case 'cms_feat':    return <CMSFeatured featuredOpportunities={featuredOpportunities || []} setFeaturedOpportunities={setFeaturedOpportunities} />;
      case 'cms_ment':    return <CMSMentorship mentorships={mentorships || []} setMentorships={setMentorships} />;
      case 'cms_groups':  return <CMSGroups groups={groups || []} setGroups={setGroups} currentUser={currentUser} />;
      case 'clubs_pool':  return <CMSClubs clubs={clubs} setClubs={setClubs} clubApplications={clubApplications} setClubApplications={setClubApplications} currentUser={currentUser} />;
      case 'cms_ssp':     return <CMSSSP sspEnabled={sspEnabled} setSspEnabled={setSspEnabled} sspUsers={sspUsers} setSspUsers={setSspUsers} />;
      case 'cms_live_rooms': return <CMSLiveRooms currentUser={currentUser} userRole={userRole} liveRooms={liveRooms} />;
      case 'overview':    return <OverviewPanel {...p}/>;
      case 'operasyon':   return <OperasyonPanel {...p}/>;
      case 'akademik':    return <AkademikPanel {...p}/>;
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
      case 'platform_ayarlari': return <PlatformSettings featureSurveys={featureSurveys} setFeatureSurveys={setFeatureSurveys} featureCareerCheckup={featureCareerCheckup} setFeatureCareerCheckup={setFeatureCareerCheckup} featureAlumniCard={featureAlumniCard} setFeatureAlumniCard={setFeatureAlumniCard} featureClubsShowcase={featureClubsShowcase} setFeatureClubsShowcase={setFeatureClubsShowcase} featureClubApplications={featureClubApplications} setFeatureClubApplications={setFeatureClubApplications} featureCareerFair={featureCareerFair} setFeatureCareerFair={setFeatureCareerFair} featureSSPLeaderboard={featureSSPLeaderboard} setFeatureSSPLeaderboard={setFeatureSSPLeaderboard} />;
      default:            return <OverviewPanel {...p}/>;
    }
  };

  `;

content = content.substring(0, start) + replacement + content.substring(end);
fs.writeFileSync('src/components/AdminDashboard.jsx', content);
console.log('Fixed');
