const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetStr = `
    const isInnerPage = view && view.startsWith('inner_page_');
    if (!currentUser && !publicViews.includes(view) && !isInnerPage) {
      if (window.toast) window.toast.error("Bu sayfayı görüntülemek için giriş yapmalısınız.");
      setView('landing');
    } else if (currentUser && view === 'admin' && userRole !== 'admin') {
      if (window.toast) window.toast.error("Bu sayfaya erişim yetkiniz yok.");
      setView(userRole === 'academic' ? 'academic' : userRole === 'company' ? 'company' : userRole === 'alumni' ? 'alumni' : 'student');
    }
  }, [view, currentUser, userRole]);

  useEffect(() => {
    document.body.style.overflow = '';
    document.body.classList.remove('overflow-hidden');
  }, [view]);

  // 🛑🛑🛑 LIVE DATA FILTER: Remove demo_seed records from all live-facing views 🛑🛑🛑
  const liveStudents = useMemo(() => (students || []).filter(item => item.source !== 'demo_seed'), [students]);
  const liveAlumni = useMemo(() => (alumni || []).filter(item => item.source !== 'demo_seed'), [alumni]);
  const liveCompanies = useMemo(() => (companies || []).filter(item => item.source !== 'demo_seed'), [companies]);
  const liveAcademicStaff = useMemo(() => (academicStaff || []).filter(item => item.source !== 'demo_seed'), [academicStaff]);`;

content = content.replace(targetStr, "");

fs.writeFileSync('src/App.jsx', content);
