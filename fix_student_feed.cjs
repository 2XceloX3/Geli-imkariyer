const fs = require('fs');

const studentFeedPath = 'C:/Users/celil/.gemini/antigravity/scratch/Gelisim_Kariyer/src/components/StudentFeed.jsx';
const alumniFeedPath = 'C:/Users/celil/.gemini/antigravity/scratch/Gelisim_Kariyer/src/components/AlumniFeed.jsx';

const alumniCode = fs.readFileSync(alumniFeedPath, 'utf8');
const studentCode = fs.readFileSync(studentFeedPath, 'utf8');

// The Alumni right panel code from {/* SURVEYS TAB */} down to {activeTab === 'career_network'
// This will cover the missing CLUBS TAB and the missing right column wrappers.
const alumniMatch = alumniCode.match(/\{\/\* SURVEYS TAB \*\/\}.*?\{activeTab === 'career_network' && \(/s);

if (alumniMatch) {
  let extract = alumniMatch[0];
  // Since we also need the closing div for career_network:
  extract += `\n            <CareerNetwork companies={companies} events={events} academicStaff={academicStaff} setView={setView} setSelectedUserId={setSelectedUserId} />\n          )}\n\n        </div>`;
  
  // Now we find the corresponding block in StudentFeed to replace.
  // In StudentFeed, it currently starts at {/* SURVEYS TAB */} and ends at <CareerNetwork...
  const studentStartIdx = studentCode.indexOf('{/* SURVEYS TAB */}');
  const studentEndIdx = studentCode.indexOf('{/* Applications Interface Overlay */}');
  
  if (studentStartIdx !== -1 && studentEndIdx !== -1) {
    const newStudentCode = studentCode.substring(0, studentStartIdx) + extract + '\n\n        ' + studentCode.substring(studentEndIdx);
    fs.writeFileSync(studentFeedPath, newStudentCode, 'utf8');
    console.log("Successfully fixed StudentFeed.jsx!");
  } else {
    console.log("Could not find start/end indices in StudentFeed.jsx");
  }
} else {
  console.log("Could not extract from AlumniFeed.jsx");
}
