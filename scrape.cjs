const fs = require('fs');

const html = fs.readFileSync('kariyer_anasayfa_raw.html', 'utf8');

const data = {
  slider: [],
  news: [],
  announcements: [],
  events: [],
  stats: []
};

// Helper function to extract all matches
function extract(regex, htmlString) {
  const results = [];
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    results.push(match);
  }
  return results;
}

// Slider (Slick slider or similar usually has images and titles)
// Example Gelisim slider: <div class="item"> <img src="..." alt="..."> <div class="slider-content"> <h2>Title</h2> ...
const sliderImgRegex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]*)"[^>]*>/gi;
// We can just try to find large images in specific sections. We will extract all unique images ending in jpg/png
const imgRegex = /https:\/\/cdn\.gelisim\.edu\.tr\/[^"'>]+\.(jpg|jpeg|png)/gi;
let images = [...new Set(html.match(imgRegex) || [])];

// Haberler / Duyurular / Etkinlikler usually have specific class names like .news-box, .event-item, or inside sections.
// Let's just find anything resembling a news item: title, date, image
// We'll look for common patterns in Gelisim HTML.

// Another approach: since parsing raw HTML without Cheerio is hard, let's just use generic regex for links and their text inside specific blocks if possible, or just extract obvious links.
// Let's grab all <a href="...">...</a> tags and categorize them based on keywords.

const aRegex = /<a[^>]+href="([^">]+)"[^>]*>([\s\S]*?)<\/a>/gi;
const links = extract(aRegex, html);

links.forEach(l => {
  const href = l[1];
  const innerHtml = l[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  if (!innerHtml || innerHtml.length < 5) return;
  
  if (href.includes('/idari-haber-')) {
    data.news.push({ title: innerHtml, link: href.startsWith('http') ? href : 'https://kariyer.gelisim.edu.tr' + href });
  } else if (href.includes('/idari-duyuru-')) {
    data.announcements.push({ title: innerHtml, link: href.startsWith('http') ? href : 'https://kariyer.gelisim.edu.tr' + href });
  } else if (href.includes('/idari-etkinlik-')) {
    data.events.push({ title: innerHtml, link: href.startsWith('http') ? href : 'https://kariyer.gelisim.edu.tr' + href });
  }
});

// Remove duplicates
data.news = [...new Map(data.news.map(item => [item.link, item])).values()];
data.announcements = [...new Map(data.announcements.map(item => [item.link, item])).values()];
data.events = [...new Map(data.events.map(item => [item.link, item])).values()];

// For slider, we can just use the first few large images
data.slider = images.filter(img => img.includes('slider') || img.includes('banner') || img.includes('anasayfa')).map(img => ({
  image: img,
  title: 'Kariyer Geliştirme Merkezi'
}));

// If no specific slider images found, fallback to first 3 images that are not logos
if (data.slider.length === 0) {
  data.slider = images.filter(img => !img.includes('logo') && !img.includes('icon')).slice(0, 3).map(img => ({
    image: img,
    title: 'Kariyer Merkezi'
  }));
}

// Generate the output file
const fileContent = `export const liveData = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('src/components/liveData.js', fileContent, 'utf8');
console.log('Data successfully extracted to src/components/liveData.js');
console.log('News:', data.news.length);
console.log('Announcements:', data.announcements.length);
console.log('Events:', data.events.length);
console.log('Slider:', data.slider.length);
