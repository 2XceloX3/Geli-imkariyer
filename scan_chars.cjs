const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
let found = false;

function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        if (fs.statSync(dirPath).isDirectory()) {
            walk(dirPath);
        } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
            let content = fs.readFileSync(dirPath, 'utf8');
            if (content.includes('')) {
                console.log("Found  in " + f);
                found = true;
            }
        }
    });
}

walk(dir);
if (!found) console.log("No  characters found in JS/JSX files.");
