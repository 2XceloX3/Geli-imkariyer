const fs = require('fs');
const path = require('path');

// Read the subagent's JSON output
const jsonFilePath = 'C:/Users/celil/.gemini/antigravity/brain/549c9185-1628-487c-b594-799d2224b4e6/.system_generated/steps/39/output.txt';
let rawText = fs.readFileSync(jsonFilePath, 'utf8');

// Strip markdown formatting to get valid JSON
const jsonStart = rawText.indexOf('```json\n') + 8;
const jsonEnd = rawText.lastIndexOf('\n```');
let jsonString = rawText;

if (jsonStart > 7 && jsonEnd !== -1) {
    jsonString = rawText.substring(jsonStart, jsonEnd);
}

const parsedData = JSON.parse(jsonString);

// We want the top 12 announcements
const topAnnouncements = parsedData.data.slice(0, 12);

// Map to mockData.js schema
const mappedAnnouncements = topAnnouncements.map((item, index) => {
    // Format date properly if needed, although it's scraped directly
    return `  {
    id: "ANN-00${index + 1}",
    title: ${JSON.stringify(item.title || "Duyuru")},
    description: ${JSON.stringify((item.description || "Duyuru detayları için tıklayınız.").substring(0, 200) + "...")},
    date: ${JSON.stringify(item.date || "Yakın Zaman")},
    category: "Öğrenci ve Mezun",
    priority: "Yüksek",
    imageUrl: ${JSON.stringify(item.image || "https://aday.gelisim.edu.tr/Areas/Aday/Contents/img/robot.png")}
  }`;
});

const arrayString = `export const initialAnnouncements = [\n${mappedAnnouncements.join(',\n')}\n];`;

// Inject into mockData.js
const mockFilePath = path.join(__dirname, 'src', 'utils', 'mockData.js');
let mockContent = fs.readFileSync(mockFilePath, 'utf8');

const startIndex = mockContent.indexOf('export const initialAnnouncements = [');
const endIndex = mockContent.indexOf('// =====================================================', startIndex + 10);

if (startIndex !== -1 && endIndex !== -1) {
    mockContent = mockContent.substring(0, startIndex) + arrayString + '\n\n' + mockContent.substring(endIndex);
    fs.writeFileSync(mockFilePath, mockContent, 'utf8');
    console.log("Successfully updated mockData.js with 12 real announcements!");
} else {
    console.log("Error: Could not find initialAnnouncements block in mockData.js");
}
