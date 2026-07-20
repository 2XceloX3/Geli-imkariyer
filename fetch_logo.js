fetch('https://www.gelisim.edu.tr/')
  .then(r => r.text())
  .then(html => {
    const m = html.match(/<img[^>]+src=[\"']([^\"']+logo[^\"']+)[\"']/i);
    console.log('Logo URL:', m ? m[1] : 'Not found');
  })
  .catch(err => console.error(err));
