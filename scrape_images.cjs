const https = require('https');

const url = 'https://aday.gelisim.edu.tr/aday-ogrenci';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png))["']/gi);
    if (matches) {
      const urls = matches.map(m => {
        const urlMatch = m.match(/src=["']([^"']+)["']/i);
        let src = urlMatch ? urlMatch[1] : null;
        if (src && !src.startsWith('http')) {
          src = 'https://aday.gelisim.edu.tr' + (src.startsWith('/') ? '' : '/') + src;
        }
        return src;
      }).filter(Boolean);
      console.log(JSON.stringify([...new Set(urls)], null, 2));
    } else {
      console.log("No images found");
    }
  });
}).on('error', err => console.log('Error:', err.message));
