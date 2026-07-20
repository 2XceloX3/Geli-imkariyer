const fs = require('fs');

let c = fs.readFileSync('src/components/AdminDashboard.jsx', 'utf8');

const targetLine = "const featureAlumniCard = useAppStore(state => state.featureAlumniCard);";
if (c.includes(targetLine) && !c.includes("const setFeatureAlumniCard")) {
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
  const academicApprovals = useAppStore(state => state.academicApprovals);`;

    c = c.replace(targetLine, replacementStr);
    fs.writeFileSync('src/components/AdminDashboard.jsx', c);
    console.log("Patched missing hooks using robust search.");
} else {
    console.log("Hooks seem to already exist or target line not found.");
}
