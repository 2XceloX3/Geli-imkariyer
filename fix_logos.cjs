const fs = require('fs');
const path = require('path');

const files = [
  'src/components/AcademicStaffFeed.jsx',
  'src/components/AlumniFeed.jsx',
  'src/components/CompanyFeed.jsx',
  'src/components/Login.jsx',
  'src/components/PostCard.jsx',
  'src/components/PostComposer.jsx',
  'src/components/StoriesBar.jsx',
  'src/components/StoryViewer.jsx',
  'src/components/UserProfile.jsx',
  'src/store/useAppStore.js',
  'src/components/LandingPage.jsx' // just in case
];

let updatedCount = 0;

files.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    
    // Replace references
    content = content.split('"/igu-logo.svg"').join('"https://cdn.gelisim.edu.tr/logo/logo.png"');
    content = content.split("'/igu-logo.svg'").join("'https://cdn.gelisim.edu.tr/logo/logo.png'");
    
    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log('Updated ' + f);
      updatedCount++;
    }
  }
});

console.log('Total files updated: ' + updatedCount);
