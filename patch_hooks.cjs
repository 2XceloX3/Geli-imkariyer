const fs = require('fs');

let c = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

const targetStr = `const featureAlumniCard = useAppStore(state => state.featureAlumniCard);
  const setAcademicApprovals = useAppStore(state => state.setAcademicApprovals);`;

const replacementStr = `const featureAlumniCard = useAppStore(state => state.featureAlumniCard);
  const setFeatureAlumniCard = useAppStore(state => state.setFeatureAlumniCard);
  const featureClubsShowcase = useAppStore(state => state.featureClubsShowcase);
  const setFeatureClubsShowcase = useAppStore(state => state.setFeatureClubsShowcase);
  const featureClubApplications = useAppStore(state => state.featureClubApplications);
  const setFeatureClubApplications = useAppStore(state => state.setFeatureClubApplications);
  const featureCareerFair = useAppStore(state => state.featureCareerFair);
  const setFeatureCareerFair = useAppStore(state => state.setFeatureCareerFair);
  const featureSSPLeaderboard = useAppStore(state => state.featureSSPLeaderboard);
  const setFeatureSSPLeaderboard = useAppStore(state => state.setFeatureSSPLeaderboard);
  const clubs = useAppStore(state => state.clubs);
  const setClubs = useAppStore(state => state.setClubs);
  const clubApplications = useAppStore(state => state.clubApplications);
  const setClubApplications = useAppStore(state => state.setClubApplications);
  const academicApprovals = useAppStore(state => state.academicApprovals);
  const setAcademicApprovals = useAppStore(state => state.setAcademicApprovals);`;

if (c.includes(targetStr)) {
    c = c.replace(targetStr, replacementStr);
    fs.writeFileSync('src/components/AdminDashboard.jsx', c);
    console.log("Patched missing hooks.");
} else {
    console.log("Target string not found.");
}
