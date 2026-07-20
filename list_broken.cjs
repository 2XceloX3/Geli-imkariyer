const fs = require('fs');
const files = ['src/components/Login.jsx', 'src/components/LandingPage.jsx'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let words = content.match(/[a-zA-Z]*\uFFFD[a-zA-Z]*/g);
    if (words) {
        console.log(`\nBroken words in ${file}:`);
        let uniqueWords = [...new Set(words)];
        console.log(uniqueWords.join(', '));
    }
});
