const fs = require('fs');

const file = 'src/App.jsx';

if (fs.existsSync(file)) {
  let content = fs.readFileSync(file, 'utf8');

  // Add import
  if (!content.includes('StudentAnalytics')) {
    content = content.replace(/const UserProfile = lazy\(\(\) => import\('\.\/components\/UserProfile'\)\);/, "const UserProfile = lazy(() => import('./components/UserProfile'));\nconst StudentAnalytics = lazy(() => import('./components/StudentAnalytics'));");
  }

  // Add to validViews
  if (!content.includes("'student_analytics'")) {
    content = content.replace(/const validViews = \[/, "const validViews = ['student_analytics', ");
  }

  // Add route rendering
  if (!content.includes("view === 'student_analytics'")) {
    const routeCode = "{view === 'student_analytics' && <StudentAnalytics setView={setView} currentUser={currentUser} userRole={userRole} previousView={previousView} />}";
    content = content.replace(/\{view === 'user_profile' && <UserProfile[\s\S]*?\/>\}/, match => match + '\n      ' + routeCode);
  }

  fs.writeFileSync(file, content);
  console.log('Added StudentAnalytics route to App.jsx');
}
