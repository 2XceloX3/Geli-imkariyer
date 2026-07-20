import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacements = [
    [/Okunmamışışşıx/g, 'Okunmamış'],
    [/Okunmamıx/g, 'Okunmamış'],
    [/Okunmamış/g, 'Okunmamış'],
    [/Arxivlenmix/g, 'Arşivlenmiş'],
    [/İxİşİşlem/g, 'İşlem'],
    [/İxlem/g, 'İşlem'],
    [/ ÖğÖğÖğrenci/g, ' Öğrenci'],
    [/ xrenci/g, ' Öğrenci'],
    [/Fotoxraf/g, 'Fotoğraf'],
    [/Fotoraf/g, 'Fotoğraf'],
    [/saxlanamadı/g, 'sağlanamadı'],
    [/baxarıyla/g, 'başarıyla'],
    [/Topluluxu/g, 'Topluluğu'],
    [/Topluluğxu/g, 'Topluluğu'],
    [/kixi/g, 'kişi'],
    [/Axınızı/g, 'Ağınızı'],
    [/Genixletin/g, 'Genişletin'],
    [/Konuxma/g, 'Konuşma'],
    [/Baxlat/g, 'Başlat'],
    [/\xEF\xBF\xBD/g, ''] // safely remove replacement chars
];

let changedCount = 0;

walk(dir, function(filePath) {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        
        for (let r of replacements) {
            newContent = newContent.replace(r[0], r[1]);
        }
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Fixed ${filePath}`);
            changedCount++;
        }
    }
});

console.log(`Total files fixed: ${changedCount}`);
