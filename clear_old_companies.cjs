const fs = require('fs');
const path = require('path');

const mockFilePath = path.join(__dirname, 'src', 'utils', 'mockData.js');
let content = fs.readFileSync(mockFilePath, 'utf8');

// Replace initialInternships
const internshipsStart = content.indexOf('export const initialInternships = [');
const internshipsEnd = content.indexOf('];', internshipsStart) + 2;
content = content.substring(0, internshipsStart) + 'export const initialInternships = [];' + content.substring(internshipsEnd);

// Maybe also clear initialMentorships and initialVoluntaryInternships
const mentStart = content.indexOf('export const initialMentorships =');
if(mentStart !== -1) {
    const mentEnd = content.indexOf(';', mentStart) + 1;
    content = content.substring(0, mentStart) + 'export const initialMentorships = [];' + content.substring(mentEnd);
}

const volStart = content.indexOf('export const initialVoluntaryInternships =');
if(volStart !== -1) {
    const volEnd = content.indexOf(';', volStart) + 1;
    content = content.substring(0, volStart) + 'export const initialVoluntaryInternships = [];' + content.substring(volEnd);
}

fs.writeFileSync(mockFilePath, content, 'utf8');
console.log("Deleted old internships and mentorships data (which contained fake companies).");
